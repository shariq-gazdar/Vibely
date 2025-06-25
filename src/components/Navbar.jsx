import React from "react";
import { auth } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const user = auth.currentUser;
  const userDp = user ? user?.photoURL : null;
  return (
    <div className="navbar flex justify-between items-center  text-white px-[5%] py-[2%]">
      <input
        type="text"
        placeholder="Search"
        className="bg-primary-light/55 px-5 py-2
        rounded-full text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent w-[30%] font-body text-[16px] font-normal"
      />
      <div className="user-info flex ">
        {userDp ? (
          <img
            src={user.photoURL}
            alt="user image"
            className="w-[45px] rounded-full"
          />
        ) : (
          <FontAwesomeIcon icon={faCircleUser} style={{ color: "#ffffff" }} />
        )}
      </div>
    </div>
  );
}

export default Navbar;
