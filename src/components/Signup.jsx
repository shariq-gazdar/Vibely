import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import googleIcons from "../assets/googleIcon.png";
import { auth, provider } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SideNotify from "../utilities/SideNotify";
function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState({
    type: "",
    message: "",
    visible: false,
  });
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(auth.currentUser);
    });
  };

  const notify = (type, message) => {
    setNotification({ type, message, visible: true });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name && !email && !password && !confirmPassword) {
      notify("error", "Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      notify("error", "Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      notify("error", "Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        notify("success", "Signup successful!");
      })
      .catch((error) => {
        notify("error", error.message || "Signup failed.");
        console.error("Error signing up:", error);
      });
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className=" bg-gradient-to-b from-primary-light to-primary to-35% w-full h-[100vh] ">
      <div className="signup-container flex flex-col w-full h-full justify-center items-center text-white text-2xl font-bold gap-y-10">
        <h1 className="font-headings">Signup</h1>
        <form
          className="signup-form flex flex-col gap-4 text-[16px] w-fit font-body font-normal"
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="bg-secondary p-2  rounded focus:outline-none focus:border focus:border-accent name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-secondary p-2  rounded focus:outline-none focus:border focus:border-accent email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="relative password">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="bg-secondary p-2  rounded focus:outline-none focus:border focus:border-accent w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <FontAwesomeIcon
              icon={showPass ? faEyeSlash : faEye}
              style={{ color: "#ffffff" }}
              className="absolute right-[5%] top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
          </div>
          <div className="relative confirm-password">
            <input
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="bg-secondary p-2  rounded focus:outline-none focus:border focus:border-accent w-full"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <FontAwesomeIcon
              icon={showConfirmPass ? faEyeSlash : faEye}
              style={{ color: "#ffffff" }}
              className="absolute right-[5%] top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            />
          </div>
          <div className="w-full relative overflow-clip google-signin">
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
              Already have an account?{" "}
              <span className="text-accent hover:text-accent-light transition duration-300 cursor-pointer">
                <Link to="/login">Login</Link>
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

export default Signup;
