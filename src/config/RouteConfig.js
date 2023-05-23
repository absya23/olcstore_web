import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "../components/layout/Main";
import BestSellerPage from "../components/pages/productpage/BestSellerPage";

const HomePage = lazy(() => import("../components/pages/homepage/HomePage"));
const ProductPage = lazy(() =>
  import("../components/pages/productpage/ProductPage")
);
const SingleProduct = lazy(() =>
  import("../components/pages/productpage/SingleProduct")
);
const SignInPage = lazy(() => import("../components/pages/user/SignInPage"));
const SignUpPage = lazy(() => import("../components/pages/user/SignUpPage"));
const CartPage = lazy(() => import("../components/pages/cart/CartPage"));
const ManageCatalog = lazy(() =>
  import("../components/pages/manage_catalog/ManageCatalog")
);
const ManageOrder = lazy(() =>
  import("../components/pages/manage_order/ManageOrder")
);

const OrderDetail = lazy(() =>
  import("../components/pages/manage_order/OrderDetail")
);
const ManageProduct = lazy(() =>
  import("../components/pages/manage_product/ManageProduct")
);
const ManageProductType = lazy(() =>
  import("../components/pages/manage_product_type/ManageProductType")
);
const ManageSlide = lazy(() =>
  import("../components/pages/manage_slide/ManageSlide")
);
const AdminLogin = lazy(() => import("../components/pages/admin/AdminLogin"));

const CheckoutPage = lazy(() =>
  import("../components/pages/cart/CheckoutPage")
);
const ProfilePage = lazy(() => import("../components/pages/user/ProfilePage"));

const SearchPage = lazy(() =>
  import("../components/pages/productpage/SearchPage")
);

const UserOrderDetail = lazy(() =>
  import("../components/pages/user/UserOrderDetail")
);

const RouteConfig = () => {
  return (
    <>
      <Routes>
        <Route element={<Main></Main>}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/user/signin" element={<SignInPage />}></Route>
          <Route path="/user/signup" element={<SignUpPage />}></Route>
          <Route
            path="/user/order/:id_order"
            element={<UserOrderDetail />}
          ></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/cart/checkout" element={<CheckoutPage />}></Route>
          <Route path="/product/:title" element={<SingleProduct />}></Route>
          <Route
            path="/product/best/seller"
            element={<BestSellerPage />}
          ></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/test" element={<div>test</div>}></Route>
          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Route>
        <Route path="/admin/manage-slide" element={<ManageSlide />}></Route>
        <Route path="/admin/manage-catalog" element={<ManageCatalog />}></Route>
        <Route path="/admin/manage-order" element={<ManageOrder />}></Route>
        <Route
          path="/admin/manage-order/:id_order"
          element={<OrderDetail />}
        ></Route>
        <Route path="/admin/manage-product" element={<ManageProduct />}></Route>
        <Route
          path="/admin/manage-product-type"
          element={<ManageProductType />}
        ></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin" element={<AdminLogin />}></Route>
      </Routes>
    </>
  );
};

export default RouteConfig;
