import "./dashboard.css";
import Cards from "../../components/Cards/Cards";
import RightSide from "../../components/RightSide/ReightSide";
import RecentOrders from "../../components/RecentOrders/RecentOrders";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboardBody">
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
