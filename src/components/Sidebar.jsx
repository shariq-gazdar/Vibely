import React from "react";
import Logo from "../assets/VibelyLogo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMasksTheater,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
function Sidebar() {
  return (
    <div className="h-[100vh] w-[22%] bg-secondary">
      <div className="main-container  h-full pt-[5%]">
        <img src={Logo} alt="Vibely" className=" h-12 mx-auto" />
        <div className="normal-links text-white">
          <ul className="styled-ul">
            <li>
              <Link>
                <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff" }} />
                Home
              </Link>
            </li>
            <li>
              <Link>
                <FontAwesomeIcon
                  icon={faMasksTheater}
                  style={{ color: "#ffffff" }}
                />
                Genre
              </Link>
            </li>
            <li>
              <Link>
                <FontAwesomeIcon icon={faMusic} style={{ color: "#ffffff" }} />
                Artists
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
