import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/DashBoard/Dashboard.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { IntlProvider } from "react-intl";
import Customers from "./pages/Customers/Customers.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Login from "./pages/Login/Login.jsx";
import ProtectRoute from "./pages/ProtectRoute.jsx";
import Category from "./pages/Category/Category.jsx";
import Offers from "./pages/Offers/Offers.jsx";
import { productsSlice } from "./store/API/apiSlices/productsSlice.js";
import Products from "./pages/Products/Products.jsx";
import { OrderSlice } from "./store/API/apiSlices/Orders.js";
import { userSlice } from "./store/API/apiSlices/user.js";
import { subCategorySlice } from "./store/API/apiSlices/SubCategory.js";
store.dispatch(productsSlice.endpoints.getAllProducts.initiate());
store.dispatch(subCategorySlice.endpoints.getAllSubCategories.initiate());
store.dispatch(OrderSlice.endpoints.getAllOrders.initiate());
store.dispatch(userSlice.endpoints.getAllCustomer.initiate());

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<ProtectRoute />}>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="category" element={<Category />} />
          <Route path="offers" element={<Offers />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale="en">
        <RouterProvider router={router} />
      </IntlProvider>
    </Provider>
  </React.StrictMode>
);
