import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Carouselslide from "./pages/Carousel";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServiceList from "./pages/ServiceList";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CaretakerRegister from "./pages/CaretakerRegister";
import Services from "./pages/Services";
import CaretakerList from "./pages/Caretakers";
import CaretakerDetails from "./pages/CaretakerDetails";
import CustomersList from "./pages/CustomerList";
import UserDetails from "./pages/UserDetails";
import OnGoingServices from "./pages/OnGoingServices";
import MyBookings from "./pages/MyBookings";
import PaymentPage from "./pages/PaymentPage";
import UserProfile from "./pages/UserProfile";
import CaretakerProfile from "./pages/CaretakerProfile";
import ServiceDetails from "./pages/ServiceDetails";
import ForgotPassword from "./pages/ForgotPassword";
import Error from './components/Error'

import Team from "./pages/Team";
import React from "react";

export default function App() {

  return (
    <div style={{ width: "100vw" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<><Carouselslide /><Footer /></>} path="/" exact />
          <Route element={<Login />} path="/login" />
          <Route element={<AdminLogin />} path="/admin" />
          <Route element={<CustomerRegister />} path="/cregister" />
          <Route element={<CaretakerRegister />} path="/oregister" />
          <Route element={<CaretakerList />} path="/owners" />
          <Route element={<OnGoingServices />} path="/ongoing" />
          <Route element={<CaretakerDetails />} path="/odetails/:id" />
          <Route element={<CustomersList />} path="/customers" />
          <Route element={<UserDetails />} path="/udetails/:id" />
          <Route element={<Services />} path="/aservices" />
          <Route element={<ServiceList />} path="/services" />
          <Route element={<ServiceDetails />} path="/services/:id" />
          <Route element={<PaymentPage />} path="/payment/:id" />
          <Route element={<MyBookings />} path="/mybookings" />
          <Route element={<UserProfile />} path="/uprofile" />
          <Route element={<CaretakerProfile />} path="/oprofile" />
          <Route element={<ForgotPassword />} path="/forgotpwd" />
          <Route element={<Team />} path="/team" />
          <Route element={<Error />} path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}