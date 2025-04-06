import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from uuid import uuid4


class Room(BaseModel):
    roomId: str = Field(default_factory=lambda: str(uuid4()))
    roomName: str
    roomDescription: str
    roomImage: Optional[str] = None
    roomFacilities: str
    dateCreated: datetime = Field(default_factory=datetime.now)
    dateUpdated: Optional[datetime] = None


class Rooms(BaseModel):
    rooms: List[Room]


app = FastAPI(debug=True)

# frontend
origins = [
    "http://localhost:5173",
]

# To not allow unwanted requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {"rooms": []}

# Pre-existing rooms
room1 = Room(
    roomId="27f00b9e-b334-4f32-bd32-deb2ec8c30f6",
    roomName="No. 1 The Apartment",
    roomDescription="Two spacious bedrooms with kingsized beds, full bathroom, kitchen and living area set across two levels.",
    roomFacilities="*Facilities room 1*",
    dateCreated=datetime.strptime("17/03/2025", "%d/%m/%Y"),
)

room2 = Room(
    roomId="27f00b9e-b334-4f32-bd32-deb2ec8c30f7",
    roomName="No. 2 Luxury Double Room",
    roomDescription="Luxury and comfort with double bed, walk-in shower and daily servicing.",
    roomFacilities="*Facilities room 2*",
    dateCreated=datetime.strptime("17/03/2025", "%d/%m/%Y"),
)

room3 = Room(
    roomId="27f00b9e-b334-4f32-bd32-deb2ec8c30f8",
    roomName="No. 3 Luxury Double Room",
    roomDescription="Style and beauty with double bed, walk-in shower and daily servicing.",
    roomFacilities="*Facilities room 3*",
    dateCreated=datetime.strptime("17/03/2025", "%d/%m/%Y"),
)

room4 = Room(
    roomId="27f00b9e-b334-4f32-bd32-deb2ec8c30f9",
    roomName="No. 4 King Junior Suite",
    roomDescription="Modern luxury with kingsized bed, walk-in shower, double sinks, sitting area and air conditioning.",
    roomFacilities="*Facilities room 4*",
    dateCreated=datetime.strptime("17/03/2025", "%d/%m/%Y"),
)


memory_db["rooms"].extend([room1, room2, room3, room4])


@app.get("/rooms", response_model=Rooms)
def get_rooms():
    return Rooms(rooms=memory_db["rooms"])


@app.post("/rooms")
def add_room(room: Room):
    memory_db["rooms"].append(room)
    return room


@app.get("/rooms/{room_id}")
def get_room(room_id: str):
    for room in memory_db["rooms"]:
        if room.roomId == room_id:
            return room
    return {"error": f"Room '{room_id}' not found"}, 404


@app.put("/rooms/{room_id}")
def update_room(room_id: str, updated_room: Room):
    for room in memory_db["rooms"]:
        if room.roomId == room_id:
            room.roomName = updated_room.roomName
            room.roomDescription = updated_room.roomDescription
            room.roomFacilities = updated_room.roomFacilities
            room.dateUpdated = datetime.now()
            return {"message": f"Room '{room_id}' updated successfully", "room": room}
    return {"error": f"Room '{room_id}' not found"}, 404

@app.delete("/rooms/{room_id}")
def delete_room(room_id: str):
    for room in memory_db["rooms"]:
        if room.roomId == room_id:
            memory_db["rooms"].remove(room)
            return {"message": f"Room '{room_id}' deleted successfully"}
    return {"error": f"Room '{room_id}' not found"}, 404


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)