import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./layouts/DashboardLayout";
import Payments from "./pages/dashboard/Payments";
import Cart from "./pages/dashboard/Cart";
import Orders from "./pages/dashboard/Orders";
import DashboardHome from "./pages/dashboard/DashboardHome";
import OrderPlaced from "./pages/dashboard/orders/OrderPlaced";
import PaymentHistory from "./pages/dashboard/PaymentHistory";
import ScrollToTop from "./ScrollToTop";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />
          <Route
            path="register"
            element={
              <PageWrapper>
                <Register />
              </PageWrapper>
            }
          />
        </Route>

        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PageWrapper>
                <DashboardHome />
              </PageWrapper>
            }
          />
          <Route
            path="orders"
            element={
              <PageWrapper>
                <Orders />
              </PageWrapper>
            }
          />
          <Route
            path="order-placed/:orderId"
            element={
              <PageWrapper>
                <OrderPlaced />
              </PageWrapper>
            }
          />
          <Route
            path="cart"
            element={
              <PageWrapper>
                <Cart />
              </PageWrapper>
            }
          />
          <Route
            path="payments"
            element={
              <PageWrapper>
                <Payments />
              </PageWrapper>
            }
          />
          <Route
            path="payment-history"
            element={
              <PageWrapper>
                <PaymentHistory />
              </PageWrapper>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <AnimatedRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
