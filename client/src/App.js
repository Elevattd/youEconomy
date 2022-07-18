import React from "react";
import { Routes, Route } from "react-router-dom";
import { useGetUserAuthQuery } from "./features/api/authApi.js";

import RequireAuth from "./components/functions/RequireAuth/RequireAuth.jsx";
import Home from "./pages/Home/Home";
import "./App.scss";
import Layout from "./pages/Layout/Layout.jsx";

function App() {
  useGetUserAuthQuery();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
