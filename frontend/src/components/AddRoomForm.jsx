import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import { generatePDF } from "./pdf.jsx";

// Initial state for the form
const AddRoomForm = ({ addRoom }) => {
    const initialFormState = {
        roomName: "",
        roomDescription: "",
        roomFacilities: "",
        dateCreated: new Date().toISOString(),
        dateUpdated: null,
        roomImage: null,
    };

    const [room, setRoom] = useState(initialFormState);
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const fileInputRef = useRef(null);

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    };

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setRoom({ ...room, roomImage: reader.result }); // Base64 image
            };
            reader.readAsDataURL(file);
        } else {
            setRoom({ ...room, roomImage: null });
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!room.roomName.trim()) {
            alert("Room name cannot be empty!");
            return;
        }

        // Create a new room object
        const newRoom = {
            ...room,
            roomId: uuidv4(),
            roomCreationDate: new Date().toISOString(),
        };

        addRoom(newRoom);

        generatePDF(newRoom);

        setRoom(initialFormState);
        setFileInputKey(Date.now());
    };

    return (
        <div>
            <div className="dates-section">
                <h3 className="form-titles" style={{ paddingLeft: "8px" }}>
                    Dates
                </h3>
                <table className="dates-table">
                    <tbody>
                        <tr>
                            <td>Created</td>
                            <td>Updated</td>
                        </tr>
                        <tr>
                            <td className="dates">
                                {new Date().toLocaleDateString("en-GB")}
                            </td>
                            <td className="dates">
                                {room.dateUpdated
                                    ? new Date(
                                          room.dateUpdated
                                      ).toLocaleDateString("en-GB")
                                    : "-"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit} style={{ fontFamily: "Karla" }}>
                <h1 className="page-header">Room details</h1>
                <a href="/rooms" className="back-link">
                    ← back to rooms
                </a>
                <h2 className="sub-heading">Room details</h2>
                <h3 className="form-titles" style={{ padding: 0 }}>
                    {" "}
                    Title{" "}
                </h3>
                <input
                    type="text"
                    name="roomName"
                    value={room.roomName}
                    onChange={handleChange}
                    placeholder="Room title"
                    className="input-box"
                />
                <h3 className="form-titles"> Description </h3>
                <input
                    type="text"
                    name="roomDescription"
                    value={room.roomDescription}
                    onChange={handleChange}
                    placeholder="Room description..."
                    className="input-box"
                />
                <h3 className="form-titles"> Image </h3>
                <div className="file-upload-wrapper">
                    <label htmlFor="file-upload" className="file-upload-label">
                        {room.roomImage ? "File selected" : "+ Add image"}
                    </label>
                    <input
                        id="file-upload"
                        key={fileInputKey}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-upload"
                        ref={fileInputRef}
                    />
                </div>
                <h3 className="form-titles"> Facilities </h3>
                <input
                    type="text"
                    name="roomFacilities"
                    value={room.roomFacilities}
                    onChange={handleChange}
                    placeholder="Room facilities..."
                    className="input-box"
                    style={{ marginBottom: "40px" }}
                />
                <button type="submit" className="create-button1">
                    CREATE AND GENERATE PDF
                </button>
            </form>
        </div>
    );
};

export default AddRoomForm;
