import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./components/sideBar/SideBar";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useSelector } from "react-redux";
import Login from "./pages/Login/Login";
import { Suspense, useEffect, useState } from "react";
import { productsSlice } from "./store/API/apiSlices/productsSlice.js";
import { OrderSlice } from "./store/API/apiSlices/Orders.js";
import { userSlice } from "./store/API/apiSlices/user.js";
import { subCategorySlice } from "./store/API/apiSlices/SubCategory.js";
import Loading from "./components/loading/Loading.jsx";
import store from "./store/store.js";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.jsx";
import { categorySlice } from "./store/API/apiSlices/categorySlice.js";
function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      store.dispatch(productsSlice.endpoints.getAllProducts.initiate()),
      store.dispatch(categorySlice.endpoints.getAllCategories.initiate()),
      store.dispatch(subCategorySlice.endpoints.getAllSubCategories.initiate()),
      store.dispatch(OrderSlice.endpoints.getAllOrders.initiate()),
      store.dispatch(OrderSlice.endpoints.mostSoldCategory.initiate()),
      store.dispatch(OrderSlice.endpoints.orderStatistics.initiate()),
      store.dispatch(OrderSlice.endpoints.mostActiveCustomer.initiate()),
      store.dispatch(userSlice.endpoints.getAllCustomer.initiate()),
      store.dispatch(userSlice.endpoints.getUsersData.initiate()),
    ])
      .then(() => setLoading(false))
      .catch((error) => {
        <ErrorFallback error={error} />;
        console.log(error);
      });
  }, []);
  const location = useLocation();
  const toggle = useSelector((state) => state.toggle.toggle);
  if (loading) {
    return <Loading />;
  }
  const content = (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => navigate("/")}
    >
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
  return (
    <>
      {location.pathname !== "/login" ? (
        <div className="app">
          <Navbar />
          <div className={toggle ? "body" : "bodyAfterToggle"}>
            <div className="leftSide">
              <SideBar />
            </div>
            <div className="content">{content}</div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
