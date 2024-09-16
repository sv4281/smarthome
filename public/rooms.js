document.addEventListener('DOMContentLoaded', () => {
    function loadRooms() {
        fetch('/rooms')
            .then(response => response.json())
            .then(data => {
                const roomsSection = document.getElementById('rooms');
                roomsSection.innerHTML = ''; // Clear previous content
                data.forEach(room => {
                    const roomDiv = document.createElement('div');
                    roomDiv.classList.add('data-item');
                    roomDiv.innerHTML = `
                        <p><strong>Room ID:</strong> ${room.room_id}</p>
                        <p><strong>Room Name:</strong> ${room.room_name}</p>
                        <p><strong>Location:</strong> ${room.location}</p>
                    `;
                    roomsSection.appendChild(roomDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    }


    function addRoom() {
        const name = document.getElementById('roomName').value;
        const location = document.getElementById('roomLocation').value;

        fetch('/rooms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ room_name: name, location: location })
        })
            .then(response => response.json())
            .then(data => {
                alert('Room added successfully!');
                loadRooms();
            })
            .catch(error => console.error('Error:', error));
    }

    function deleteRoom() {
        const roomId = document.getElementById('deleteRoomId').value;

        fetch(`/rooms/${roomId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert('Room deleted successfully!');
                loadRooms();
            })
            .catch(error => console.error('Error:', error));
    }

    function updateRoom() {
        const roomId = document.getElementById('updateRoomId').value;
        const newName = document.getElementById('updateRoomName').value;
        const newLocation = document.getElementById('updateRoomLocation').value;

        fetch(`/rooms/${roomId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ room_name: newName, location: newLocation })
        })
            .then(response => response.json())
            .then(data => {
                alert('Room updated successfully!');
                loadRooms();
            })
            .catch(error => console.error('Error:', error));
    }

    window.loadRooms = loadRooms;
    window.addRoom = addRoom;
    window.deleteRoom = deleteRoom;
    window.updateRoom = updateRoom;
});
