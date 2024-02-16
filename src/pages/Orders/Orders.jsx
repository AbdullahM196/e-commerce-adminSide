import { useEffect, useMemo, useState } from "react";
import LineChart from "../../components/Charts/LineChart";
import PieChart from "../../components/Charts/PieChart";
import "./OrdersHeader.css";
import RecentOrders from "../../components/RecentOrders/RecentOrders";
import {
  useOrderStatisticsQuery,
  useMostSoldCategoryQuery,
} from "../../store/API/apiSlices/Orders";
import Loading from "../../components/loading/Loading";
import ErrorFetching from "../../components/Error/ErrorFetching";
import { format } from "date-fns";
export default function Orders() {
  const { data: soledCategoryData, isSuccess: soldCategorySuccess } =
    useMostSoldCategoryQuery();
  ////////////////////////////////////////////////////
  const { data, isLoading, error, isSuccess, isError } =
    useOrderStatisticsQuery();
  ////////////////////////////////////////////////////
  const [OrderGrowth, setOrderGrowth] = useState({});
  useEffect(() => {
    if (isSuccess) {
      const orderGrowth = {
        labels: data.map((data) =>
          format(new Date(2023, data._id?.month - 1, 1), "MMMM")
        ),
        datasets: [
          {
            label: "Order Growth",
            data: data.map((data) => data.count),
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
      };
      setOrderGrowth(orderGrowth);
    }
  }, [isSuccess, data]);
  let orderGrowthChart = "";
  if (isLoading) {
    orderGrowthChart = <Loading />;
  } else if (isError) {
    orderGrowthChart = <ErrorFetching error={error} />;
  } else if (isSuccess && Object.keys(OrderGrowth).length !== 0) {
    orderGrowthChart = <LineChart data={OrderGrowth} />;
  }
  ///////////////////////////////////////////////
  const mostSoledCategory = useMemo(() => {
    if (soldCategorySuccess) {
      return {
        labels: soledCategoryData?.map((data) => {
          return data?.subCategoryDetail?.name;
        }),
        datasets: [
          {
            label: "Most sold Category",
            data: soledCategoryData.map((data) => data.soled),
            backgroundColor: [
              "#ffc96c",
              "#10b981",
              "#c280fe",
              "Gray",
              "Neutral",
            ],
            borderColor: "transparent",
          },
        ],
      };
    } else {
      // Provide a default structure or an empty object
      return {
        labels: [],
        datasets: [],
      };
    }
  }, [soledCategoryData, soldCategorySuccess]);
  return (
    <div className="ordersPage">
      <h1>Orders</h1>
      <div className="ordersBody">
        <div className="OrdersHeader">
          {orderGrowthChart}
          <PieChart data={mostSoledCategory} />
        </div>
        <RecentOrders />
      </div>
    </div>
  );
}
