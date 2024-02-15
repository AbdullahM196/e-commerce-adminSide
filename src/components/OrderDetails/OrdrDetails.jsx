import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import "./orderDetails.css";
import { formatDistanceToNow } from "date-fns";
export default function OrderDetails({ show, handleClose, order }) {
  const timeAgo = formatDistanceToNow(new Date(order.createdAt), {
    addSuffix: true,
  });
  return (
    <Modal show={show} onHide={handleClose} scrollable size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="orderDetailBody">
        <span className="d-flex gap-3">
          <span>
            <strong>Order ID</strong> {order._id}
          </span>
          <span>
            <strong>Placed on</strong> {timeAgo}
          </span>
        </span>
        <hr />
        <ul
          style={{ listStyle: order.products.length == 1 ? "none" : "number" }}
        >
          {order?.products?.map((item, index) => {
            return item.product !== undefined && item.product !== null ? (
              <>
                <div className="d-flex">
                  <img
                    style={{ objectFit: "contain", width: "100px" }}
                    className="me-3"
                    src={item.product.img.url}
                    alt={item.title}
                  />
                  <li
                    className="d-flex flex-column gap-1"
                    key={item.product._id}
                  >
                    <span className="fs-5 fw-bold my-0">
                      {item.product.title}
                    </span>
                    <br />
                    <span>
                      <strong>product:</strong> {item.quantity} x{" "}
                      {item.product.price.new.toFixed(2)} EGP
                    </span>
                    <span className="d-flex gap-1">
                      <strong>price</strong>
                      <span>{item.price.toFixed(2)}</span>
                    </span>
                    <span className="d-flex gap-1">
                      <strong>Shipment</strong>
                      <span>
                        {item.quantity * item.product.price.shipping.toFixed(2)}{" "}
                        EGP
                      </span>
                    </span>
                  </li>
                </div>
                {order.products.length !== index + 1 && <hr />}
              </>
            ) : (
              <div className="w-100 d-flex justify-content-center align-items-center my-3">
                <br />
                <h1>Product Deleted</h1>
                <br />
              </div>
            );
          })}
        </ul>
        <hr />
        <span>
          <strong>Order Total Price:</strong> {order.totalPrice} EGP
        </span>

        <span className="d-flex gap-2">
          <strong>Shipping Address:</strong>
          <span>{order.address}</span>
        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
OrderDetails.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  order: PropTypes.object,
};
