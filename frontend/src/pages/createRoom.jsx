import React from "react";
import "../App.css";
import AddRoom from "../components/POSTrooms.jsx";
import SideNav from "../components/SideNav.jsx";

const CreateRoom = () => {
    return (
        <div className="flex-container">
            <div>
                <SideNav />
            </div>
            <div className="roomdetails-container">
                <AddRoom />
            </div>
        </div>
    );
};

export default CreateRoom;
