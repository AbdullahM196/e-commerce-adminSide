import { Col, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";
export default function ProductPrice({
  price,
  setPrice,
  priceBlur,
  priceError,
  priceTouched,
}) {
  return (
    <>
      <Row className="mb-3 ProducTFormRow">
        <Form.Group as={Col} controlId="formGridNewPrice">
          <Form.Label>New Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product price"
            name="newPrice"
            value={price.new}
            onChange={(evt) => {
              const price = evt.target.value;
              return setPrice("price.new", +price);
            }}
            onBlur={priceBlur}
          />
          {priceError?.new && priceTouched && (
            <p className="text-danger">{priceError?.new}</p>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDiscount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="text"
            name="discount"
            placeholder="Enter Discount in this Product"
            value={price.discount}
            onChange={(evt) => {
              const price = evt.target.value;
              return setPrice("price.discount", +price);
            }}
          />
          {priceError?.discount && priceTouched && (
            <p className="text-danger">{priceError?.discount}</p>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-3 ProducTFormRow">
        <Form.Group as={Col} controlId="formGridNewPrice">
          <Form.Label>Old Price</Form.Label>
          <Form.Control
            type="text"
            name="oldPrice"
            placeholder="Enter Product Old price"
            value={price.old}
            onChange={(evt) => {
              const price = evt.target.value;
              return setPrice("price.old", +price);
            }}
          />
          {priceError?.old && priceTouched && (
            <p className="text-danger">{priceError?.old}</p>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDiscount">
          <Form.Label>shipping</Form.Label>
          <Form.Control
            type="text"
            name="shipping"
            placeholder="Enter shipping price for this Product"
            value={price.shipping}
            onChange={(evt) => {
              const price = evt.target.value;
              return setPrice("price.shipping", +price);
            }}
            onBlur={priceBlur}
          />
          {priceError?.shipping && priceTouched && (
            <p className="text-danger">{priceError?.shipping}</p>
          )}
        </Form.Group>
      </Row>
    </>
  );
}
ProductPrice.propTypes = {
  price: PropTypes.object.isRequired,
  setPrice: PropTypes.func.isRequired,
  priceBlur: PropTypes.func.isRequired,
  priceError: PropTypes.func.isRequired,
  priceTouched: PropTypes.func.isRequired,
};
