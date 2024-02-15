import { Col, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Others({
  ImgUrl,
  setImgUrl,
  imgUrlBlur,
  imgUrlError,
  quantity,
  setQuantity,
  quantityBlur,
  quantityError,
  setFile,
  quantityTouched,
}) {
  return (
    <>
      <Row className="mb-3 ProducTFormRow">
        <Form.Group as={Col} controlId="formGridImage">
          <Form.Label>Upload Image or {"-->"}</Form.Label>
          <Form.Control
            type="file"
            name="productImage"
            onChange={(evt) => {
              setFile("file", evt.target.files[0]);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDiscount">
          <Form.Label>Enter Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Image url for this Product"
            value={ImgUrl}
            onChange={setImgUrl}
            onBlur={imgUrlBlur}
            name="imgUrl"
            isInvalid={imgUrlError}
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="text"
          placeholder="Quantity"
          name="quantity"
          value={quantity}
          onChange={setQuantity}
          onBlur={quantityBlur}
          isInvalid={quantityError}
        />
        {quantityError && quantityTouched && (
          <p className="text-danger">{quantityError}</p>
        )}
      </Form.Group>
    </>
  );
}
Others.propTypes = {
  ImgUrl: PropTypes.string,
  quantity: PropTypes.string,
  setFile: PropTypes.func,
  setImgUrl: PropTypes.func,
  setImage: PropTypes.func,
  setQuantity: PropTypes.func,
  imgUrlBlur: PropTypes.func,
  imgUrlError: PropTypes.func,
  quantityBlur: PropTypes.func,
  quantityError: PropTypes.func,
  FileError: PropTypes.func,
  quantityTouched: PropTypes.func,
};
