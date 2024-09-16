document.addEventListener('DOMContentLoaded', () => {
    function loadSchedules() {
        fetch('/schedules')
            .then(response => response.json())
            .then(data => {
                const schedulesSection = document.getElementById('schedules');
                schedulesSection.innerHTML = ''; // Clear previous content
                data.forEach(schedule => {
                    const scheduleDiv = document.createElement('div');
                    scheduleDiv.classList.add('data-item');
                    scheduleDiv.innerHTML = `
                        <p><strong>Schedule ID:</strong> ${schedule.schedule_id}</p>
                        <p><strong>Device ID:</strong> ${schedule.device_id}</p>
                        <p><strong>Start Time:</strong> ${schedule.start_time}</p>
                        <p><strong>End Time:</strong> ${schedule.end_time}</p>
                        <p><strong>Days of Week:</strong> ${schedule.days_of_week}</p>
                    `;
                    schedulesSection.appendChild(scheduleDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    }


    function addSchedule() {
        const deviceId = document.getElementById('scheduleDeviceId').value;
        const startTime = document.getElementById('scheduleStartTime').value;
        const endTime = document.getElementById('scheduleEndTime').value;
        const days = document.getElementById('scheduleDays').value;

        fetch('/schedules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: deviceId, start_time: startTime, end_time: endTime, days_of_week: days })
        })
            .then(response => response.json())
            .then(data => {
                alert('Schedule added successfully!');
                loadSchedules();
            })
            .catch(error => console.error('Error:', error));
    }

    function deleteSchedule() {
        const scheduleId = document.getElementById('deleteScheduleId').value;

        fetch(`/schedules/${scheduleId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert('Schedule deleted successfully!');
                loadSchedules();
            })
            .catch(error => console.error('Error:', error));
    }

    function updateSchedule() {
        const scheduleId = document.getElementById('updateScheduleId').value;
        const newDeviceId = document.getElementById('updateScheduleDeviceId').value;
        const newStartTime = document.getElementById('updateScheduleStartTime').value;
        const newEndTime = document.getElementById('updateScheduleEndTime').value;
        const newDays = document.getElementById('updateScheduleDays').value;

        fetch(`/schedules/${scheduleId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_id: newDeviceId, start_time: newStartTime, end_time: newEndTime, days_of_week: newDays })
        })
            .then(response => response.json())
            .then(data => {
                alert('Schedule updated successfully!');
                loadSchedules();
            })
            .catch(error => console.error('Error:', error));
    }

    window.loadSchedules = loadSchedules;
    window.addSchedule = addSchedule;
    window.deleteSchedule = deleteSchedule;
    window.updateSchedule = updateSchedule;
});
