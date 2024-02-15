import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import "./products.css";
import { useAddProductMutation } from "../../store/API/apiSlices/productsSlice";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ProductInfo from "../../components/AddProductSteps/ProductInfo";
import ProductPrice from "../../components/AddProductSteps/ProductPrice";
import Others from "../../components/AddProductSteps/Others";
import Loading from "../../components/loading/Loading";
import { useUpdateProductMutation } from "../../store/API/apiSlices/productsSlice";
import { useFormik } from "formik";
import addProductSchema from "./addProduct";
import useSetSpecifications from "./setSpecifications";
export default function ProductsForm({ show, setShow, product }) {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    isValid,
    touched,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      title: "",
      price: {
        new: 0,
        old: 0,
        discount: 0,
        shipping: 0,
      },
      quantity: 0,
      description: "",
      subCategory: "",
      imgUrl: "",
      file: null,
      specifications: {},
    },
    validationSchema: addProductSchema,
    onSubmit: product ? handleUpdateProduct : saveProduct,
  });
  const [spicsKeys, setSpicsKeys] = useState(["", "", "", "", ""]);
  const [spicsValues, setSpicsValues] = useState(["", "", "", "", ""]);
  useEffect(() => {
    if (product && product.specifications) {
      setFieldValue("title", product.title || "");
      setFieldValue("description", product.description || "");
      setFieldValue("price", {
        new: product.price?.new || "",
        old: product.price?.old || "",
        discount: product.price?.discount || "",
        shipping: product.price?.shipping || "",
      });
      setFieldValue("quantity", product.quantity || "");
      setFieldValue("subCategory", product.subCategory?._id || "");
      setFieldValue("imgUrl", product.img?.url || "");
      setFieldValue("file", null);
      setSpicsKeys(Object.keys(product.specifications));
      setSpicsValues(Object.values(product.specifications));
      let specificationsObj = {};
      for (let i = 0; i < spicsKeys.length; i++) {
        specificationsObj[spicsKeys[i]] = spicsValues[i];
      }
      setFieldValue("specifications", specificationsObj);
    }
  }, [product, setFieldValue]);
  const MySwal = withReactContent(Swal);
  const handleClose = () => setShow(false);
  const [updateProduct] = useUpdateProductMutation();
  const [addProduct] = useAddProductMutation();
  const [page, setPage] = useState(0);
  const formTitles = ["Product Info", "Product Price", "Related Info"];
  const specifications = useSetSpecifications(...spicsKeys, ...spicsValues);
  useEffect(() => {
    setFieldValue("specifications", specifications);
  }, [setFieldValue, specifications]);
  function FormSteps() {
    if (page == 0) {
      return (
        <ProductInfo
          title={values.title}
          setTitle={handleChange}
          titleBlur={handleBlur}
          titleError={errors.title}
          titleTouched={touched.title}
          description={values.description}
          setDescription={handleChange}
          descriptionBlur={handleBlur}
          descriptionError={errors.description}
          descriptionTouhed={touched.description}
          subCategory={values.subCategory}
          setSubCategory={setFieldValue}
          subCategoryBlur={handleBlur}
          subCategoryError={errors.subCategory}
          subCategoryTouched={touched.subCategory}
          spicKeys={spicsKeys}
          setSpicKeys={setSpicsKeys}
          spicValues={spicsValues}
          setSpicValues={setSpicsValues}
          specificationBlur={handleBlur}
          specificationError={errors.specifications}
          specificationTouched={touched.specifications}
        />
      );
    } else if (page == 1) {
      return (
        <ProductPrice
          price={values.price}
          setPrice={setFieldValue}
          priceBlur={handleBlur}
          priceError={errors.price}
          priceTouched={touched}
        />
      );
    } else {
      return (
        <Others
          file={values.file}
          setFile={setFieldValue}
          FileError={errors.file}
          quantity={values.quantity}
          setQuantity={handleChange}
          quantityBlur={handleBlur}
          quantityError={errors.quantity}
          quantityTouched={touched.quantity}
          ImgUrl={values.imgUrl}
          setImgUrl={handleChange}
          imgUrlBlur={handleBlur}
          imgUrlError={errors.imgUrl}
        />
      );
    }
  }

  async function saveProduct(values, { resetForm }) {
    // evt.preventDefault();
    if (values.file && values.imgUrl) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter img url or upload image not both",
      });
      return;
    }

    if (isValid) {
      if (values.file || values.imgUrl) {
        try {
          const formData = new FormData();
          formData.append("title", values.title);
          formData.append("description", values.description);
          const newPrice = {
            new: Number(values.price.new),
            old: Number(values.price.old),
            discount: Number(values.price.discount),
            shipping: Number(values.price.shipping),
          };
          formData.append("price", JSON.stringify(newPrice));
          formData.append("subCategory", values.subCategory);
          const img = values.file ? values.file : values.imgUrl;
          formData.append("image", img);
          formData.append("quantity", values.quantity);
          formData.append(
            "specifications",
            JSON.stringify(values.specifications)
          );
          await addProduct(formData).unwrap();
          handleClose();

          setPage(0);
          resetForm();
        } catch (err) {
          console.log(err);
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: err.data.message ? err.data.message : err.message,
          });
        }
      }
    }
  }
  async function handleUpdateProduct(values, { resetForm }) {
    if (values.file && values.imgUrl) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter img url or upload image not both",
      });
      return;
    }
    if (isValid) {
      try {
        const formData = new FormData();
        formData.append("_id", product._id);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", JSON.stringify(values.price));
        const img = values.file
          ? values.file
          : values.imgUrl
          ? values.imgUrl
          : null;
        formData.append("image", img);
        formData.append("subCategory", values.subCategory);
        formData.append("quantity", values.quantity);
        formData.append(
          "specifications",
          JSON.stringify(values.specifications)
        );

        await updateProduct(formData).unwrap();
        handleClose();
        setPage(0);
        resetForm();
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "Product updated successfully",
        });
      } catch (err) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: err.data.message,
        });
        console.log(err);
      }
    }
  }

  function cancel() {
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose} animation={false} fullscreen>
      <Modal.Header closeButton style={{ backgroundColor: "#f0f0f0" }}>
        <Modal.Title className="fs-3">Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3 fs-3" style={{ backgroundColor: "#f0f0f0" }}>
        <Form className="form">
          <h3>{formTitles[page]}</h3>
          <div className="form-container">{FormSteps()}</div>
          <Row className="formRow row-cols-2">
            {page == 0 ? (
              <Button variant="danger" onClick={cancel}>
                Cancel
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  setPage((prev) => prev - 1);
                }}
              >
                Prev
              </Button>
            )}
            {page == formTitles.length - 1 ? (
              isSubmitting ? (
                <Loading />
              ) : (
                <Button
                  variant="dark"
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  Submit
                </Button>
              )
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  setPage((prev) => prev + 1);
                }}
              >
                Next
              </Button>
            )}
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
ProductsForm.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  product: PropTypes.object,
};
