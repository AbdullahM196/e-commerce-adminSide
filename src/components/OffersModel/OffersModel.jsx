import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { formatDistanceToNow, parseISO } from "date-fns";
import { MdOutlineModeEdit } from "react-icons/md";
import { useUpdateOffersMutation } from "../../store/API/apiSlices/Offers";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../store/API/apiSlices/productsSlice";
import useProductPagination from "../../Hooks/Pagination";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../loading/Loading";

export default function OffersModel({ show, handleClose, data }) {
  const { page, productPagination } = useProductPagination();
  const MySwal = withReactContent(Swal);
  const [file, setFile] = useState(null);

  const [updateMode, setUpdateMode] = useState(false);

  const { data: allProducts, isSuccess: getAllProductsSuccess } =
    useGetAllProductsQuery(page);
  const [updateOffers, { isLoading }] = useUpdateOffersMutation();

  const date = data && parseISO(data.createdAt);
  const timeAgo = data && formatDistanceToNow(date, { addSuffix: true });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [products, setProducts] = useState([]);
  const [isChecked, setChecked] = useState([]);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.offerDescription);
      setDiscount(data.discount);
      setProducts(data.products);
      setChecked(data.products);
    }
  }, [data]);
  let checkBoxes;
  function handleCheckBox(evt) {
    const itemId = evt.target.id;
    if (isChecked.includes(itemId)) {
      // Item is already checked, remove it
      setChecked(isChecked.filter((id) => id !== itemId));
    } else {
      // Item is not checked, add it
      setChecked([...isChecked, itemId]);
    }
  }
  if (data && getAllProductsSuccess) {
    checkBoxes = (
      <div className="container-fluid w-100">
        {allProducts.map((item) => {
          return (
            <Form.Check
              key={item._id}
              label={item.title}
              type="checkbox"
              id={item._id}
              checked={isChecked.includes(item._id)}
              onChange={handleCheckBox}
            />
          );
        })}
        <span className="d-flex justify-content-center">
          {productPagination}
        </span>
      </div>
    );
  }
  async function handleUpdate() {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("offerDescription", description);
      formData.append("discount", discount);
      formData.append("img", file);
      formData.append("products", JSON.stringify(isChecked));
      formData.append("_id", data._id);
      await updateOffers(formData).unwrap();
      handleClose();
      setUpdateMode(false);
      setFile(null);
      setProducts([]);
      setDiscount(0);
      setTitle("");
      setDescription("");
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data.message,
      });
      console.log(error);
    }
  }

  return (
    data && (
      <Modal
        size="lg"
        id={data._id}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title className=" w-100 d-flex justify-content-between">
            <span> {data.title.substring(0, 31)} </span>
            <span>
              {" "}
              <MdOutlineModeEdit
                onClick={() => {
                  setUpdateMode((prev) => !prev);
                }}
              />
            </span>
          </Modal.Title>
        </Modal.Header>
        {updateMode ? (
          <Modal.Body>
            <Form>
              <Form.Control
                className="mb-3"
                type="file"
                name="productImage"
                onChange={(evt) => {
                  setFile(evt);
                }}
              />
              <FloatingLabel
                controlId="floatingTitle"
                label="Title"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Offer Title"
                  value={title}
                  onChange={(evt) => {
                    setTitle(evt.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingDescription"
                label="Description"
                value={description}
                onChange={(evt) => {
                  setDescription(evt.target.value);
                }}
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(evt) => {
                    setDescription(evt.target.value);
                  }}
                  placeholder="Offer Description"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInputDiscount"
                label="Discount"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  min={1}
                  max={100}
                  placeholder="Offer Discount"
                  value={discount}
                  onChange={(evt) => {
                    setDiscount(evt.target.value);
                  }}
                />
              </FloatingLabel>
              {checkBoxes}
            </Form>
          </Modal.Body>
        ) : (
          <Modal.Body className="d-flex flex-column fs-4 h-100">
            <img
              src={data.img.url}
              style={{
                height: "200px",
              }}
            />{" "}
            <span>Description: {data.offerDescription}</span>
            <span>Discount: {data.discount}%</span>
            <div className="w-100 d-flex flex-column">
              {data.products.map((item) => {
                return (
                  <span key={item._id}>
                    <img
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                      src={
                        item.img.url
                          ? item.img.url
                          : "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                      }
                      alt={item.title}
                    />

                    {item.title}
                  </span>
                );
              })}
            </div>
          </Modal.Body>
        )}
        {isLoading ? (
          <Loading />
        ) : (
          <Modal.Footer>
            <span className="me-auto">{timeAgo}</span>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {updateMode && (
              <Button variant="primary" onClick={handleUpdate}>
                update
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal>
    )
  );
}

OffersModel.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  data: PropTypes.object,
};
