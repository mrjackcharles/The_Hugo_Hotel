import React from "react";
import "../App.css";
import PutRoom from "../components/PUTrooms.jsx";
import SideNav from "../components/SideNav.jsx";

const UpdateRoom = () => {
    return (
        <div className="flex-container">
            <div>
                <SideNav />
            </div>
            <div className="roomdetails-container">
                <PutRoom />
            </div>
        </div>
    );
};

export default UpdateRoom;
