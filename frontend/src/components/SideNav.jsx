import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";

const SideNav = () => {
    const location = useLocation();

    // Find current path
    const currentPath = location.pathname;

    return (
        <div className="side-nav">
            <img src={Logo} alt="Company Logo" style={{ paddingLeft: "10%" }} />
            {currentPath === "/rooms" && <a>Room list</a>}
            {currentPath === "/create-room" && <a>Add Room</a>}
            {currentPath.startsWith("/update-room") && <a>Update Room</a>}
        </div>
    );
};

export default SideNav;
