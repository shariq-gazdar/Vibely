import { useEffect, useState } from "react";
import "./App.css";
import { auth } from "./config/firebase";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./routes/Home";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Search from "./routes/Search";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (
      !user &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      navigate("/signup");
    }
  }, [user, location, navigate]);
  return (
    <div className="App flex">
      {user && <Sidebar />}

      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
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

        {/* Redirect all other paths */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/signup"} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
