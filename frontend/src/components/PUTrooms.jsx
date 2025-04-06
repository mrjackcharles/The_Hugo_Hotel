import React from "react";
import api from "../api.js";
import UpdateRoomForm from "./UpdateRoomForm.jsx";

const PutRoom = () => {
    // PUT Request
    const updateRoom = async (roomData) => {
        try {
            await api.put("/rooms", roomData);
        } catch (error) {
            console.error("Oh No! Error updating room", error);
        }
    };

    return (
        <div>
            <UpdateRoomForm updateRoom={updateRoom} />
        </div>
    );
};

export default PutRoom;
