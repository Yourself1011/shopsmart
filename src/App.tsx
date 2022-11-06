import React, { lazy, Suspense } from "react";
import logo from "./logo.svg";
import "./styles.scss";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

// Page imports
const Home = lazy(() => import("./pages/Home/Home"));
const Create = lazy(() => import("./pages/Create/Create"));

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="loading"></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
