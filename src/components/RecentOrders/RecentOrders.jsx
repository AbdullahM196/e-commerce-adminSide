import "./recentOrders.css";
import {
  selectOrderData,
  useGetAllOrdersQuery,
} from "../../store/API/apiSlices/Orders";
import Loading from "../loading/Loading";
import ErrorFetching from "../Error/ErrorFetching";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useChangeOrderStatusMutation } from "../../store/API/apiSlices/Orders";
import OrderDetails from "../OrderDetails/OrdrDetails";
export default function RecentOrders() {
  const orders = useSelector(selectOrderData);
  const { isLoading, error, isSuccess, isError } = useGetAllOrdersQuery();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orderDetail, SetOrderDetail] = useState(null);
  const [changeOrderStatus] = useChangeOrderStatusMutation();
  const allOrderStatus = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  useEffect(() => {
    if (orderDetail !== null) {
      handleShow();
    }
  }, [orderDetail]);
  const [orderState, setOrderStatus] = useState({
    id: "",
    status: "",
  });
  function changeStatus(evt, id) {
    setOrderStatus({
      id: id,
      status: evt.target.value,
    });
  }
  useEffect(() => {
    async function setState() {
      try {
        await changeOrderStatus({
          id: orderState.id,
          data: { status: orderState.status },
        }).unwrap();
      } catch (err) {
        console.log(err);
      }
    }
    if (orderState.status !== "") {
      console.log(orderState);
      setState();
    }
  }, [orderState, changeOrderStatus]);
  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <ErrorFetching error={error} />;
  } else if (isSuccess) {
    return (
      <div className="RecentOrders">
        <h2 className="my-4">Recent Orders</h2>
        <Table className="w-100" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th>userName</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const date = order.createdAt;
              const formattedDate = format(parseISO(date), "dd/MM/yyyy");
              return (
                <tr key={index}>
                  <td className="productTitle">
                    {order.products.map((item) => {
                      return item.product ? (
                        <>
                          <span key={item.product._id}>
                            {item.product.title}{" "}
                          </span>
                          <br />
                        </>
                      ) : (
                        <td> product Deleted</td>
                      );
                    })}
                  </td>
                  <td>
                    {order.customer ? order.customer.userName : "Deleted user"}
                  </td>
                  <td>{formattedDate}</td>
                  <td>
                    <select
                      className="status delivered form-select"
                      onChange={(evt) => changeStatus(evt, order._id)}
                      defaultValue={order.status}
                    >
                      {allOrderStatus.map((status, index) => {
                        return (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <button
                      className="btn border-0 bg-transparent text-info"
                      onClick={() => {
                        SetOrderDetail(order);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {orderDetail && (
            <OrderDetails
              show={show}
              handleClose={handleClose}
              order={orderDetail}
            />
          )}
        </Table>
      </div>
    );
  }
}
