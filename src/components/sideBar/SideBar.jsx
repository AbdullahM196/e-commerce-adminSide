import { useEffect, useState } from "react";
import { BiCategory, BiHomeAlt } from "react-icons/bi";
import "./sidebar.css";
import { TbClipboardList } from "react-icons/tb";
import { LuPackage2 } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useLogoutMutation } from "../../store/API/apiSlices/user";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function SideBar() {
  const MySwal = withReactContent(Swal);
  const location = useLocation();
  const navigate = useNavigate();
  const toggle = useSelector((state) => state.toggle.toggle);
  let classes;
  if (toggle) {
    classes = ["menu", "menuItems", "menuItems active"];
  } else {
    classes = ["shortMenu", "shortMenuItems", "shortMenuItems shortActive"];
  }

  const [active, setActive] = useState("Dashboard");
  useEffect(() => {
    if (location.pathname == "/") {
      setActive("Dashboard");
    } else if (location.pathname == "/customers") {
      setActive("Customers");
    } else if (location.pathname == "/orders") {
      setActive("Orders");
    } else if (location.pathname == "/products") {
      setActive("Products");
    } else if (location.pathname == "/category") {
      setActive("category");
    } else if (location.pathname == "/offers") {
      setActive("Offers");
    }
  }, [location.pathname]);
  const [logout] = useLogoutMutation();
  async function handleLogout() {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data,
      });
      console.log(error);
    }
  }
  return (
    <div className="sideBar">
      <div className={classes[0]}>
        <div
          className={`${active == "Dashboard" ? classes[2] : classes[1]}`}
          onClick={() => {
            setActive("Dashboard");
            navigate("/");
          }}
        >
          <BiHomeAlt />
          <span>Dashboard</span>
        </div>
        <div
          className={`${active == "Customers" ? classes[2] : classes[1]}`}
          onClick={() => {
            setActive("Customers");
            navigate("/customers");
          }}
        >
          <GoPeople />
          <span>Customers</span>
        </div>
        <div
          className={`${active == "Orders" ? classes[2] : classes[1]}`}
          onClick={() => {
            setActive("Orders");
            navigate("/orders");
          }}
        >
          <TbClipboardList />
          <span>Orders</span>
        </div>
        <div
          className={`${active == "Products" ? classes[2] : classes[1]}`}
          onClick={() => {
            setActive("Products");
            navigate("/products");
          }}
        >
          <LuPackage2 />
          <span>Products</span>
        </div>
        <div
          className={`${active == "category" ? classes[2] : classes[1]}`}
          onClick={() => {
            setActive("category");
            navigate("/category");
          }}
        >
          <BiCategory />
          <span>Categories</span>
        </div>
        <div
          className={`${active == "Offers" ? classes[2] : classes[1]}`}
          onClick={() => {
            setActive("Offers");
            navigate("/offers");
          }}
        >
          <MdOutlineLocalOffer />

          <span>Offers</span>
        </div>
        <div className={classes[1]} onClick={handleLogout}>
          <BiLogOut />
          <span>LogOut</span>
        </div>
      </div>
    </div>
  );
}
