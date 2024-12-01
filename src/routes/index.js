import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/screens/Onboarding/Login";
import Signup from "../components/screens/Onboarding/Signup";
import RequireAuth from "../services/RequireAuth";
import Home from "../components/screens/Authenticated/Home";
import Products from "../components/screens/Authenticated/Products";
import ProductListing from "../components/screens/Authenticated/ProductListing";
import AppLayout from "../components/common/AppLayout";
import Cart from "../components/screens/Authenticated/Cart";
import Orders from "../components/screens/Authenticated/Orders";
import OrderDetail from "../components/screens/Authenticated/OrderDetail";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Onbaording */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />

        {/* Authenticated */}
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path={"/"} element={<Home />} />
            <Route path={"product"} element={<Products />} />
            <Route path={"product-listing"} element={<ProductListing />} />
            <Route path={"cart"} element={<Cart />} />
            <Route path={"orders"} element={<Orders />} />
            <Route path={"order-detail/:id"} element={<OrderDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
