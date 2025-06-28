import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import googleIcons from "../assets/googleIcon.png";
import SideNotify from "../utilities/SideNotify";
import { auth, provider } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Login() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [notification, setNotification] = useState({
    type: "",
    message: "",
    visible: false,
  });
  const notify = (type, message) => {
    setNotification({
      type: type,
      message: message,
      visible: true,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      notify("error", "Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      notify("error", "Password must be at least 6 characters long.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        notify("success", "Login successful!");
        console.log("User logged in:", userCredential.user);
      })
      .catch((error) => {
        notify("error", error.message || "Login failed.");
        console.error("Error logging in:", error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      notify("success", "Login successful!");
    });
  };
  return (
    <div className=" bg-gradient-to-b from-primary-light to-primary to-35% w-full h-[100vh] ">
      <div className="login-container flex flex-col w-full h-full justify-center items-center text-white text-2xl font-bold gap-y-10">
        <h1 className="font-headings">Login</h1>
        <form
          className="login-form flex flex-col gap-4 text-[16px] w-fit font-body font-normal"
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-secondary p-2  rounded focus:outline-none focus:border focus:border-accent"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="bg-secondary p-2  rounded focus:outline-none focus:border focus:border-accent w-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showPass ? faEyeSlash : faEye}
              style={{ color: "#ffffff" }}
              className="absolute right-[5%] top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
          </div>

          <div className="w-full relative overflow-clip">
            <img
              src={googleIcons}
              alt="google Icon"
              className="absolute left-0 w-[15%] top-1/2 transform -translate-y-1/2"
            />
            <button
              className="bg-secondary hover:bg-accent-light  pt-2 pr-2 pb-2 pl-[20%] rounded transition duration-300 self-center w-full text-left"
              onClick={(e) => {
                e.preventDefault();
                handleGoogleSignIn();
              }}
            >
              Sign in with Google
            </button>
          </div>
          <div className="login-line">
            <p className="text-center text-[14px] font-normal">
              Don't have a account?{" "}
              <span className="text-accent hover:text-accent-light transition duration-300 cursor-pointer">
                <Link to="/signup">SignUp</Link>
              </span>
            </p>
          </div>
          <button
            type="submit"
            className="bg-secondary hover:bg-accent  p-2 rounded transition duration-300 self-center w-fit"
          >
            Submit
          </button>
        </form>
        {notification.visible && (
          <SideNotify
            code={notification.type}
            show={notification.visible}
            onClose={() => setNotification({ ...notification, visible: false })}
          >
            <p>{notification.message}</p>
          </SideNotify>
        )}
      </div>
    </div>
  );
}

export default Login;
