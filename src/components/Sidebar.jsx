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
    <div className="h-[100vh] w-[20%] bg-secondary pt-[2%] border-r-[1px]  border-gray-600">
      <div className="main-container  h-full  text-[16px] font-body">
        <img src={Logo} alt="Vibely" className=" h-10 mx-auto" />
        <div className="links-container flex flex-col items-start ml-[5%] mt-[5%]">
          <div className="normal-links text-white">
            <ul className="styled-ul space-y-4">
              <li>
                <Link>
                  <FontAwesomeIcon
                    icon={faHouse}
                    style={{ color: "#ffffff" }}
                  />
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
                  <FontAwesomeIcon
                    icon={faMusic}
                    style={{ color: "#ffffff" }}
                  />
                  Artists
                </Link>
              </li>
            </ul>
          </div>
          <div className="library-links text-white">
            <h1 className="font-bold my-4">Library</h1>
            <ul className="styled-ul space-y-4">
              <li>
                <Link>Favorites</Link>
              </li>
              <li>
                <Link>Playlists</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
