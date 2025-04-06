import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api.js";
import "../App.css";
import { generatePDF } from "./pdf.jsx";

const UpdateRoomForm = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const initialFormState = {
        roomName: "",
        roomDescription: "",
        roomImage: null,
        roomFacilities: "",
        dateCreated: "",
        dateUpdated: "",
    };

    const [room, setRoom] = useState(initialFormState);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Fetch room details when the component loads
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await api.get(`/rooms/${roomId}`);
                if (response.data) {
                    setRoom(response.data);
                } else {
                    console.error("Room not found");
                }
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        fetchRoomDetails();
    }, [roomId]);

    // Handle update request
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.put(`/rooms/${roomId}`, room);
            generatePDF(room);
            navigate("/rooms");
        } catch (error) {
            console.error("Error updating room:", error);
        }
    };

    // Handle delete request
    const handleDelete = async () => {
        {
            try {
                await api.delete(`/rooms/${roomId}`);
                navigate("/rooms");
            } catch (error) {
                console.error("Error deleting room:", error);
            }
        }
    };

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    };

    return (
        <div>
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
                                    {room.dateCreated
                                        ? new Date(
                                              room.dateCreated
                                          ).toLocaleDateString("en-GB")
                                        : "-"}
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
                    <button
                        type="button"
                        className="create-button1"
                        style={{
                            marginTop: "50px",
                            marginRight: "40px",
                            position: "Fixed",
                            left: "1025px",
                        }}
                        onClick={() => generatePDF(room)}
                    >
                        DOWNLOAD PDF
                    </button>
                </div>
                <form onSubmit={handleSubmit} style={{ fontFamily: "Karla" }}>
                    <h1 className="page-header">Room details</h1>
                    <a href="/rooms" className="back-link">
                        ← back to rooms
                    </a>
                    <a
                        type="button"
                        onClick={() => setShowConfirmModal(true)}
                        className="back-link"
                        style={{ marginLeft: "450px", cursor: "pointer" }}
                    >
                        X Delete Room
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
                    <div>
                        {room.roomImage ? (
                            <img
                                src={room.roomImage}
                                alt="Room"
                                style={{
                                    width: "400px",
                                    height: "200px",
                                    marginBottom: "10px",
                                    marginTop: "50px",
                                }}
                            />
                        ) : (
                            <p style={{ marginTop: "50px" }}>
                                {" "}
                                *No image available*{" "}
                            </p>
                        )}
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
                        SAVE AND GENERATE PDF
                    </button>
                </form>
            </div>
            {showConfirmModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3 className="delete-heading">Are you sure?</h3>
                        <h3 className="delete-subheading">
                            You are deleteing a room...
                        </h3>
                        <div className="modal-buttons">
                            <button
                                onClick={handleDelete}
                                className="confirm-button"
                            >
                                YES DELETE
                            </button>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="cancel-button"
                            >
                                NO TAKE ME BACK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateRoomForm;
