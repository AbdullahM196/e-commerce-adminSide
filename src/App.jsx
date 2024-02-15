import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./components/sideBar/SideBar";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useSelector } from "react-redux";
import Login from "./pages/Login/Login";
function App() {
  const location = useLocation();
  const toggle = useSelector((state) => state.toggle.toggle);
  return (
    <>
      {location.pathname !== "/login" ? (
        <div className="app">
          <Navbar />
          <div className={toggle ? "body" : "bodyAfterToggle"}>
            <div className="leftSide">
              <SideBar />
            </div>
            <div className="content">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
