import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import "../App.css";

const GETrooms = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    // GET Request
    const fetchRooms = async () => {
        try {
            const response = await api.get("/rooms");
            setRooms(response.data.rooms);
        } catch (error) {
            console.error("Oh No! Error fetching rooms", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div style={{ margin: 0, padding: 0 }}>
            <h1 className="page-header">All rooms</h1>
            <button className="create-button2">
                <a href="/create-room">CREATE A ROOM</a>
            </button>
            <table className="room-table">
                <thead>
                    <tr>
                        <th>Room Name</th>
                        <th>Description</th>
                        <th>Facilities</th>
                        <th>Created</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, index) => {
                        const formattedCDate = new Date(
                            room.dateCreated
                        ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                        });

                        const formattedUDate = room.dateUpdated
                            ? new Date(room.dateUpdated).toLocaleDateString(
                                  "en-GB",
                                  {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "2-digit",
                                  }
                              )
                            : "-";

                        return (
                            <tr
                                key={index}
                                className="clickable-row"
                                onClick={() =>
                                    navigate(`/update-room/${room.roomId}`)
                                }
                            >
                                <td>{room.roomName}</td>
                                <td>
                                    {room.roomDescription ||
                                        "No description provided"}
                                </td>
                                <td>
                                    {room.roomFacilities ||
                                        "No facilities listed"}
                                </td>
                                <td>{formattedCDate}</td>
                                <td>{formattedUDate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default GETrooms;
