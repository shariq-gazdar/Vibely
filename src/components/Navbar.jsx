import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faAngleLeft,
  faAngleRight,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;
  const userDp = user?.photoURL;

  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  const isInitial = location.key === "default";
  const [dpClick, setDpClick] = useState(false);

  return (
    <div className="navbar flex justify-between items-center text-white px-[3%] pt-[2.3%] text-[16px] font-normal">
      <div className="input-side flex w-full items-center gap-x-4">
        <div className="route-controls flex gap-x-5">
          <button
            onClick={goBack}
            disabled={isInitial}
            className={`text-[20px] transition ${
              isInitial
                ? "text-primary-light cursor-not-allowed"
                : "text-white hover:text-accent"
            }`}
          >
            <FontAwesomeIcon icon={faAngleLeft} size="lg" />
          </button>

          <button
            onClick={goForward}
            className="text-[20px] text-white hover:text-accent transition"
          >
            <FontAwesomeIcon icon={faAngleRight} size="lg" />
          </button>
        </div>

        <input
          type="text"
          placeholder="Search"
          className="bg-primary-light/55 px-5 py-2 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent w-[40%] font-body text-[16px] font-normal"
          onClick={() => {
            if (location.pathname !== "/search") {
              navigate("/search");
            }
          }}
        />
      </div>

      <div className="user-info flex w-[30%] items-center gap-x-4 font-bold font-body relative text-[14px] ">
        <div className="user-image" onClick={() => setDpClick(!dpClick)}>
          {userDp ? (
            <img
              src={userDp}
              alt="user"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleUser}
              className="text-white text-[24px]"
            />
          )}
        </div>
        {user?.displayName || user?.email.split("@")[0]}
        {dpClick && (
          <div className="user-dropdown absolute left-0 top-[50px] bg-primary-light/90 rounded-lg shadow-lg p-4 w-[200px]">
            <ul className="text-white text-[16px] font-normal">
              <li
                className="py-2 hover:bg-accent/20 cursor-pointer"
                onClick={() => {
                  setDpClick(false);
                  auth.signOut();
                }}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="text-white"
                />{" "}
                Sign Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
