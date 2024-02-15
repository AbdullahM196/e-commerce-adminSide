import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { Button, Col, Pagination, Row } from "react-bootstrap";
import {
  useGetAllPagesQuery,
  useGetAllProductsQuery,
} from "../../store/API/apiSlices/productsSlice";
import { useAddOffersMutation } from "../../store/API/apiSlices/Offers";
import { useState } from "react";
import "./offerMode.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../loading/Loading";
export default function AddOfferModel({ show, setShow }) {
  const MySwal = withReactContent(Swal);
  const [title, setTitle] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const { data: pages, isSuccess } = useGetAllPagesQuery();
  const [active, setActive] = useState(0);
  let items = [];
  if (isSuccess) {
    const pageCount = pages;
    for (let number = 0; number < pageCount; number++) {
      items.push(
        <Pagination.Item
          key={number}
          onClick={() => setActive(number)}
          active={number === active}
        >
          {number + 1}
        </Pagination.Item>
      );
    }
  }
  const { isSuccess: getAllProductsSuccess, data } =
    useGetAllProductsQuery(active);
  const allProducts = getAllProductsSuccess ? data : [];
  const [file, setFile] = useState(null);
  const [addOffers, { isLoading }] = useAddOffersMutation();
  const [isChecked, setChecked] = useState([]);
  function handleCheckBox(evt) {
    const checkboxId = evt.target.id;
    if (isChecked.includes(checkboxId)) {
      setChecked(isChecked.filter((id) => id !== checkboxId));
    } else {
      setChecked([...isChecked, checkboxId]);
    }
  }

  const handleClose = () => setShow(false);
  async function handleAddOffer() {
    try {
      if (file) {
        const product = new FormData();
        product.append("title", title);
        product.append("offerDescription", offerDescription);
        product.append("discount", discount);
        product.append("img", file);
        product.append("products", JSON.stringify(isChecked));

        await addOffers(product).unwrap();
        handleClose();
        setTitle("");
        setOfferDescription("");
        setDiscount(0);
        setChecked([]);
        setFile(null);
      }
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: err.data.message,
      });
      console.log(err);
    }
  }

  return getAllProductsSuccess ? (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Offer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="Add Offer">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Offer title"
              name="title"
              value={title}
              onChange={(evt) => {
                setTitle(evt.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="offer description">
            <Form.Label>Offer Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="offerDescription"
              value={offerDescription}
              onChange={(evt) => {
                setOfferDescription(evt.target.value);
              }}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="discount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  name="discount"
                  value={discount}
                  onChange={(evt) => {
                    setDiscount(evt.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col className="d-flex align-items-center mt-3 justify-content-end">
              <label className="uploadFileButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                    stroke="#ffffff"
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M17 15V18M17 21V18M17 18H14M17 18H20"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <input
                  type="file"
                  name="productImage"
                  onChange={(evt) => {
                    setFile(evt.target.files[0]);
                  }}
                />
                ADD FILE
              </label>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="products">
            <Form.Label>Products</Form.Label>

            {allProducts?.map((product) => (
              <Form.Check
                key={product._id}
                type="checkbox"
                id={product._id}
                name={product.title}
                checked={isChecked.includes(product._id) ? true : false}
                label={product.title.substring(0, 50)}
                onChange={handleCheckBox}
              />
            ))}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination>{items}</Pagination>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      {isLoading ? (
        <Loading />
      ) : (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOffer}>
            Save Changes
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  ) : (
    <Loading />
  );
}
AddOfferModel.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
};
