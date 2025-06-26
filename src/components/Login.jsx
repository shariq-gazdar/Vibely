import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import googleIcons from "../assets/googleIcon.png";
import { auth, provider } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Login() {
  const [showPass, setShowPass] = useState(false);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(auth.currentUser);
    });
  };
  return (
    <div className=" bg-gradient-to-b from-primary-light to-primary to-35% w-full h-[100vh] ">
      <div className="login-container flex flex-col w-full h-full justify-center items-center text-white text-2xl font-bold gap-y-10">
        <h1 className="font-headings">Login</h1>
        <form className="login-form flex flex-col gap-4 text-[16px] w-fit font-body font-normal">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-secondary p-2  rounded focus:outline-none focus:border focus:border-accent"
          />
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="bg-secondary p-2  rounded focus:outline-none focus:border focus:border-accent w-full"
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
      </div>
    </div>
  );
}

export default Login;
