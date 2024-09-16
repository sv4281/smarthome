document.addEventListener('DOMContentLoaded', () => {
    function loadDeviceStates() {
        fetch('/device_states')
            .then(response => response.json())
            .then(data => {
                const deviceStatesSection = document.getElementById('device_states');
                deviceStatesSection.innerHTML = ''; // Clear previous content
                data.forEach(state => {
                    const stateDiv = document.createElement('div');
                    stateDiv.classList.add('data-item');
                    stateDiv.innerHTML = `
                        <p><strong>State ID:</strong> ${state.state_id}</p>
                        <p><strong>Device ID:</strong> ${state.device_id}</p>
                        <p><strong>State:</strong> ${state.state}</p>
                        <p><strong>Timestamp:</strong> ${state.timestamp}</p>
                    `;
                    deviceStatesSection.appendChild(stateDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    }


    function addDeviceState() {
        const deviceId = document.getElementById('deviceStateDeviceId').value;
        const state = document.getElementById('deviceStateState').value;
        const timestamp = document.getElementById('deviceStateTimestamp').value;

        fetch('/device_states', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: deviceId, state: state, timestamp: timestamp })
        })
            .then(response => response.json())
            .then(data => {
                alert('Device state added successfully!');
                loadDeviceStates();
            })
            .catch(error => console.error('Error:', error));
    }

    function deleteDeviceState() {
        const deviceStateId = document.getElementById('deleteDeviceStateId').value;

        fetch(`/device_states/${deviceStateId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert('Device state deleted successfully!');
                loadDeviceStates();
            })
            .catch(error => console.error('Error:', error));
    }

    function updateDeviceState() {
        const deviceStateId = document.getElementById('updateDeviceStateId').value;
        const newDeviceId = document.getElementById('updateDeviceStateDeviceId').value;
        const newState = document.getElementById('updateDeviceStateState').value;
        const newTimestamp = document.getElementById('updateDeviceStateTimestamp').value;

        fetch(`/device_states/${deviceStateId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: newDeviceId, state: newState, timestamp: newTimestamp })
        })
            .then(response => response.json())
            .then(data => {
                alert('Device state updated successfully!');
                loadDeviceStates();
            })
            .catch(error => console.error('Error:', error));
    }

    window.loadDeviceStates = loadDeviceStates;
    window.addDeviceState = addDeviceState;
    window.deleteDeviceState = deleteDeviceState;
    window.updateDeviceState = updateDeviceState;
});
