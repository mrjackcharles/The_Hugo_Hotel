import React from "react";
import api from "../api.js";
import AddRoomForm from "./AddRoomForm.jsx";

const AddRoom = () => {
    // POST Request
    const addRoom = async (roomData) => {
        try {
            await api.post("/rooms", roomData);
        } catch (error) {
            console.error("Oh No! Error adding room", error);
        }
    };

    return (
        <div>
            <AddRoomForm addRoom={addRoom} />
        </div>
    );
};

export default AddRoom;
