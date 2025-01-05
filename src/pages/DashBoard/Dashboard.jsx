import "./dashboard.css";
import Cards from "../../components/Cards/Cards";
import RightSide from "../../components/RightSide/ReightSide";
import RecentOrders from "../../components/RecentOrders/RecentOrders";
import HelmetMetaTags from "../../components/MetaTags/HelmetMetaTags";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <HelmetMetaTags
        title="Dashboard"
        content="Get a Full Review about My Website"
        url="/dashboard"
      />
      <h1>e-shop Admin Dashboard</h1>
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
