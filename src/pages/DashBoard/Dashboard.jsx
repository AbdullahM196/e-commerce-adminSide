// import React from "react";
import "./dashboard.css";
import Cards from "../../components/Cards/Cards";
import RecentOrders from "../../components/RecentOrders/RecentOrders";
import RightSide from "../../components/RightSide/ReightSide";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboardBody w-100">
        <div className="dashboardContent">
          <Cards />
          <RecentOrders />
        </div>
        <div className="dashboardRightSide">
          <RightSide />
        </div>
      </div>
    </div>
  );
}
