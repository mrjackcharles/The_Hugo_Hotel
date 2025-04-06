from fastapi.testclient import TestClient
from main import app, Room, memory_db
from datetime import datetime

client = TestClient(app)

    # Test the Room model
def test_create_room_model():
    room = Room(
        roomName="Test Room",
        roomDescription="A test room description",
        roomFacilities="WiFi, TV",
        dateCreated=datetime.now(),
    )
    assert room.roomName == "Test Room"
    assert room.roomDescription == "A test room description"
    assert room.roomFacilities == "WiFi, TV"
    assert room.roomId is not None

    # Test the GET /rooms endpoint
def test_get_rooms():
    response = client.get("/rooms")
    assert response.status_code == 200
    assert "rooms" in response.json() 
    assert isinstance(response.json()["rooms"], list)

    # Test the POST /rooms endpoint
def test_add_room():
    new_room = {
        "roomName": "New Room",
        "roomDescription": "A newly added room",
        "roomFacilities": "WiFi, TV, Air Conditioning",
    }
    response = client.post("/rooms", json=new_room)
    assert response.status_code == 200
    assert response.json()["roomName"] == "New Room"

    # Test the DELETE /rooms/{roomId} endpoint
def test_delete_room():
    if memory_db["rooms"]:
        room_id = memory_db["rooms"][0].roomId
        response = client.delete(f"/rooms/{room_id}")
        assert response.status_code == 200
        assert response.json()["message"] == f"Room '{room_id}' deleted successfully"
    else:
        print("No rooms available to delete")

    # Create a room to update
def test_update_room():
    new_room = {
        "roomName": "Test Room",
        "roomDescription": "A room to be updated",
        "roomFacilities": "WiFi, TV",
        "dateCreated": "2023-10-01T12:00:00",
        "dateUpdated": None,
        "roomImage": None,
    }
    post_response = client.post("/rooms", json=new_room)
    assert post_response.status_code == 200
    created_room = post_response.json()
    room_id = created_room["roomId"]

    # Prepare updated room data
    updated_room = {
        "roomName": "Updated Test Room",
        "roomDescription": "This room has been updated",
        "roomFacilities": "WiFi, TV, Air Conditioning",
        "dateCreated": created_room["dateCreated"],
        "dateUpdated": None,
        "roomImage": None,
    }

    # Send PUT request to update the room
    put_response = client.put(f"/rooms/{room_id}", json=updated_room)
    assert put_response.status_code == 200
    response_data = put_response.json()
    assert response_data["message"] == f"Room '{room_id}' updated successfully"

    # Verify the room was updated in memory_db
    get_response = client.get(f"/rooms/{room_id}")
    assert get_response.status_code == 200
    updated_room_data = get_response.json()
    assert updated_room_data["roomName"] == "Updated Test Room"
    assert updated_room_data["roomDescription"] == "This room has been updated"
    assert updated_room_data["roomFacilities"] == "WiFi, TV, Air Conditioning"
