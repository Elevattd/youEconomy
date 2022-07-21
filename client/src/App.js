import React from "react";
import { Routes, Route } from "react-router-dom";
import { useGetUserAuthQuery } from "./features/api/authApi.js";
import Layout from "./pages/Layout/Layout.jsx";
import RequireAuth from "./components/functions/RequireAuth/RequireAuth.jsx";
import Home from "./pages/Home/Home";
import History from "./pages/History/History.jsx";
import "./App.scss";

function App() {
  useGetUserAuthQuery();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
