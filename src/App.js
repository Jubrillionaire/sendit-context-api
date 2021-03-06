import React from "react";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateOrder from "./components/CreateOrder";
import Profile from "./components/Profile";
import { Route, Redirect } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import ParcelContextProvider from "./contexts/ParcelContext";

const token = localStorage.getItem("token");

const App = () => {
  return (
    <AuthContextProvider>
      <ParcelContextProvider>
      <NavBar />
      <Route
        exact
        path="/"
        render={() => {
          return <Home />;
        }}
      />

      <Route
        path="/register"
        render={() => {
          if (!token) return <Register />;
          return <Redirect to="/user" />;
        }}
      />

      <Route
        exact
        path="/login"
        render={() => {
          if (!token) return <Login />;
          return <Redirect to="/user" />;
        }}
      />

      <Route
        exact
        path="/user"
        render={() => {
          if (token) return <Profile />;
          return <Redirect to="/login" />;
        }}
      />

      <Route
        exact
        path="/create-order"
        render={() => {
          if (token) return <CreateOrder />;
          return <Redirect to="/login" />;
        }}
      />
      <Footer />
      </ParcelContextProvider>
    </AuthContextProvider>
  );
};

export default App;
