import { useEffect, useState } from "react";
import "./App.css";
import { auth } from "./config/firebase";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Search from "./routes/Search";
function App() {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:");
        setUser(user);
      } else {
        console.log("No user is signed in.");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App flex ">
      {user ? <Sidebar /> : null}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Signup />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
