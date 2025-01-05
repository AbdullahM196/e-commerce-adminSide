import { useEffect, useMemo, useState } from "react";
import LineChart from "../../components/Charts/LineChart";
import PieChart from "../../components/Charts/PieChart";
import "./OrdersHeader.css";
import RecentOrders from "../../components/RecentOrders/RecentOrders";
import {
  useMostSoldCategoryQuery,
  selectOrderStatics,
} from "../../store/API/apiSlices/Orders";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import HelmetMetaTags from "../../components/MetaTags/HelmetMetaTags";
export default function Orders() {
  const { data: soledCategoryData } = useMostSoldCategoryQuery();

  const orderStatics = useSelector(selectOrderStatics);
  const [OrderGrowth, setOrderGrowth] = useState({});
  useEffect(() => {
    const orderGrowth = {
      labels: orderStatics?.map((data) =>
        format(new Date(2023, data._id?.month - 1, 1), "MMMM")
      ),
      datasets: [
        {
          label: "Order Growth",
          data: orderStatics?.map((data) => data.count),
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
  }, [orderStatics]);
  const mostSoledCategory = useMemo(() => {
    return {
      labels: soledCategoryData?.map((data) => {
        return data?.subCategoryDetail?.name;
      }),
      datasets: [
        {
          label: "Most sold Category",
          data: soledCategoryData?.map((data) => data.soled),
          backgroundColor: ["#ffc96c", "#10b981", "#c280fe", "Gray", "Neutral"],
          borderColor: "transparent",
        },
      ],
    };
  }, [soledCategoryData]);
  return (
    <div className="ordersPage">
      <HelmetMetaTags
        title="Orders"
        content="Get a Full Review about My Orders"
        url="/orders"
      />
      <h1>Preview and Manage Orders</h1>
      <div className="ordersBody">
        <div className="OrdersHeader">
          {OrderGrowth.labels && <LineChart data={OrderGrowth} />}
          <PieChart data={mostSoledCategory} />
        </div>
        <RecentOrders />
      </div>
    </div>
  );
}
