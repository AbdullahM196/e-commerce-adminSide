import { useEffect, useState } from "react";
import OrderGrowth from "../Charts/LineChart";
import {
  SelectAllUsers,
  useGetAllCustomerQuery,
} from "../../store/API/apiSlices/user";
import "./RightSide.css";
import UserCards from "../usersCards/UserCards";
import Loading from "../loading/Loading";
import ErrorFetching from "../Error/ErrorFetching";
import {
  selectOrderStatics,
  useOrderStatisticsQuery,
} from "../../store/API/apiSlices/Orders";
import { useSelector } from "react-redux";
export default function RightSide() {
  const orderStatics = useSelector(selectOrderStatics);
  const { isLoading, isSuccess, isError, error } = useGetAllCustomerQuery();
  const customers = useSelector(SelectAllUsers);
  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isSuccess) {
    content = <UserCards data={customers} />;
  }
  if (isError) {
    content = <ErrorFetching error={error} />;
  }
  const { isSuccess: ordersSuccess } = useOrderStatisticsQuery();
  const [orderData, setOrderData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    if (ordersSuccess) {
      setOrderData({
        labels: orderStatics.map((data) => data._id.month),
        datasets: [
          {
            label: "orders Growth",
            data: orderStatics.map((data) => data.count),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [ordersSuccess, orderStatics]);
  return (
    <div className="RightSide">
      <div className="newUsers">
        <h3 className="fw-bold">New Customers</h3>
        <div className="users-card">{content}</div>
      </div>
      <div className="orderGrowth my-3">
        <h3 className="fw-bold">Order Growth</h3>
        <div className="growth">
          {ordersSuccess && <OrderGrowth data={orderData} />}
        </div>
      </div>
    </div>
  );
}
