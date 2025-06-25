import { useState } from "react";
import "./App.css";
import { auth } from "./config/firebase";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
function App() {
  const user = auth.currentUser;
  return (
    <div className="App flex">
      <Routes>
        {user ? <Sidebar /> : null}
        <Route path="/" element={user ? <Home /> : <Signup />} />
      </Routes>
    </div>
  );
}

export default App;
