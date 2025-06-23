import React from "react";
import Logo from "../assets/VibelyLogo.png";
function Sidebar() {
  return (
    <div className="h-[100vh] w-[22%] bg-secondary">
      <div className="main-container flex flex-col items-center justify-center h-full">
        <img src={Logo} alt="Vibely" className=" h-12" />
        <div className="normal-links">
          <ul>
            <li>
              <Link></Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
