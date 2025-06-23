import { useState } from "react";
import "./App.css";
import { auth } from "./config/firebase";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Sidebar from "./components/Sidebar";
function App() {
  const user = auth.currentUser;
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
