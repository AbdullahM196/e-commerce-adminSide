import { BiShoppingBag } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slices/toggleSidebar";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const open = useSelector((state) => state.toggle.toggle);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <div id="navBar">
      <span className="hamburgerMenu">
        {open ? (
          <IoMdClose onClick={toggle} />
        ) : (
          <GiHamburgerMenu onClick={toggle} />
        )}
      </span>
      <div className="logo">
        {" "}
        <BiShoppingBag />
        <span>Shop</span>
      </div>
    </div>
  );
}
