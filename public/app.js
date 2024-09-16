document.addEventListener('DOMContentLoaded', () => {
    function loadUsers() {
        fetch('/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const userSection = document.getElementById('users');
                userSection.innerHTML = '';
                data.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.classList.add('data-item');
                    userDiv.innerHTML = `
                    <div class="user">
                        <p><strong>ID:</strong> ${user.user_id}</p>
                        <p><strong>Username:</strong> ${user.username}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Phone:</strong> ${user.phone}</p>
                    </div>
                `; userSection.appendChild(userDiv);
                }).join('');
            })
            .catch(error => console.error('Error:', error));
    }

    function loadDevices() {
        fetch('/devices')
            .then(response => response.json())
            .then(data => {
                const deviceSection = document.getElementById('devices');
                deviceSection.innerHTML = ''; // Clear previous content
                data.forEach(device => {
                    const deviceDiv = document.createElement('div');
                    deviceDiv.classList.add('data-item');
                    deviceDiv.innerHTML = `
                        <p><strong>Device ID:</strong> ${device.device_id}</p>
                        <p><strong>Device Name:</strong> ${device.device_name}</p>
                        <p><strong>Device Type:</strong> ${device.device_type}</p>
                        <p><strong>Location:</strong> ${device.location}</p>
                    `;
                    deviceSection.appendChild(deviceDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    }



    // Function to add a new device
    function addDevice() {
        const name = document.getElementById('deviceName').value;
        const type = document.getElementById('deviceType').value;
        const location = document.getElementById('deviceLocation').value;

        fetch('/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ device_name: name, device_type: type, location: location })
        })
            .then(response => response.json())
            .then(data => {
                alert('Device added successfully!');
                loadDevices(); // Refresh the device list
            })
            .catch(error => console.error('Error:', error));
    }

    // Function to delete a device
    function deleteDevice() {
        const deviceId = document.getElementById('deleteDeviceId').value;

        fetch(`/devices/${deviceId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                alert('Device deleted successfully!');
                loadDevices(); // Refresh the device list
            })
            .catch(error => console.error('Error:', error));
    }

    // Function to update a device
    function updateDevice() {
        const deviceId = document.getElementById('updateDeviceId').value;
        const newName = document.getElementById('updateDeviceName').value;
        const newType = document.getElementById('updateDeviceType').value;
        const newLocation = document.getElementById('updateDeviceLocation').value;

        fetch(`/devices/${deviceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ device_name: newName, device_type: newType, location: newLocation })
        })
            .then(response => response.json())
            .then(data => {
                alert('Device updated successfully!');
                loadDevices(); // Refresh the device list
            })
            .catch(error => console.error('Error:', error));
    }

    // Attach functions to global scope to be accessible from HTML
    window.loadUsers = loadUsers;
    window.loadDevices = loadDevices;

    window.addDevice = addDevice;
    window.deleteDevice = deleteDevice;
    window.updateDevice = updateDevice;
});
