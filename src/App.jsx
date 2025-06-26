import { useEffect, useState } from "react";
import "./App.css";
import { auth } from "./config/firebase";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Search from "./routes/Search";
import ProtectedRoute from "./routes/ProtectedRoute";
function App() {
  const [user, setUser] = useState(null);
  // console.log(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in.");
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
      {!user ? <Signup /> : null}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute user={user}>
              <Search />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
