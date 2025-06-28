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
  const [authChecked, setAuthChecked] = useState(false); // <--- Added this
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth State:", user);
      setUser(user);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authChecked) return;
    if (!user && !["/login", "/signup"].includes(location.pathname)) {
      navigate("/signup");
    }
    if (user && ["/signup", "/login"].includes(location.pathname)) {
      navigate("/");
    }
  }, [authChecked, user, location.pathname, navigate]);

  if (!authChecked) {
    return <div className="text-white p-10 text-center">Loading...</div>;
  }

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
