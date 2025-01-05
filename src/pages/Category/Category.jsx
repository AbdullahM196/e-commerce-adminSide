import CategoryCards from "./CategoryCards";
import { useGetAllCategoriesQuery } from "../../store/API/apiSlices/categorySlice";
import Loading from "../../components/loading/Loading";
import { Button, Form, Modal } from "react-bootstrap";
import "./category.css";
import { useState } from "react";
import {
  useEditCategoryMutation,
  useGetCategoryQuery,
} from "../../store/API/apiSlices/categorySlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CategoryTable from "../../components/CategoryTable/CategoryTable";
import SubCategories from "./SubCategories";
import HelmetMetaTags from "../../components/MetaTags/HelmetMetaTags";
export default function Category() {
  const MySwal = withReactContent(Swal);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryName, setCatName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { data } = useGetAllCategoriesQuery();
  const { data: category, isSuccess: categorySuccess } =
    useGetCategoryQuery(categoryId);
  let subCatContent;
  function getSubCategories() {
    if (categorySuccess) {
      subCatContent = category.subCategories
        ? category.subCategories.map((item) => {
            return <SubCategories key={item} id={item} />;
          })
        : "There is no sub category here";
    }
    return subCatContent;
  }
  const [editCategory, { isLoading: loading }] = useEditCategoryMutation();

  async function handleEditCategory() {
    try {
      await editCategory({ id: categoryId, name: categoryName }).unwrap();
      setCatName("");
      handleClose();
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: err.data.message,
      });
      console.log(err);
    }
  }

  return (
    <>
      <HelmetMetaTags
        title="Category"
        content="Products Categories"
        url="/category"
      />
      <div className="category">
        <div className="categoryHeader">
          <CategoryCards color={"#ffc96c"} title={"Category"} />
          <CategoryCards color={"#10b981"} title={"SubCategory"} />
        </div>
        {!data && (
          <div className="w-100 h-100 mt-5 d-flex justify-content-center align-content-center">
            <p>There is No Categories</p>
          </div>
        )}
        <div className="my-5">
          <CategoryTable
            data={data}
            setCategoryId={setCategoryId}
            setCatName={setCatName}
            handleShow={handleShow}
          />
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{categoryName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Add Category Name"
            value={categoryName}
            onChange={(evt) => {
              setCatName(evt.target.value);
            }}
          />
          {getSubCategories()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          {loading ? (
            <Loading />
          ) : (
            <Button variant="primary" onClick={handleEditCategory}>
              Update Category
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
