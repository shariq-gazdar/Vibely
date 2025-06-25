import React from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
function Singup() {
  return (
    <div className=" bg-gradient-to-b from-primary-light to-primary to-35% w-full h-[100vh] ">
      <div className="signup-container flex w-full h-full justify-center items-center text-white text-2xl">
        <h1>Signup</h1>
        <form className="signup-form"></form>
      </div>
    </div>
  );
}

export default Singup;
