import { useState, useEffect } from 'react';
import api from './api/axios.js'; // Make sure this is correctly set up

function App() {
  const [alarmTime, setAlarmTime] = useState('');
  const [alarms, setAlarms] = useState([]);

  // Fetch alarms on component mount
  useEffect(() => {
    fetchAlarms();
  }, []);

  const fetchAlarms = async () => {
    try {
      const res = await api.get('/alarms');
      setAlarms(res.data);
    } catch (err) {
      console.error('API error:', err);
    }
  };

  // Add new alarm to backend
  const addAlarm = async () => {
    if (!alarmTime || alarms.find(a => a.time === alarmTime)) return;

    try {
      const res = await api.post('/alarms', {
        time: alarmTime,
        label: 'Default Alarm'
      });

      setAlarms([...alarms, res.data]);
      setAlarmTime('');
    } catch (error) {
      console.error('Failed to add alarm:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Alarm Clock</h1>

      <div className="mb-3">
        <input
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
          className="form-control"
        />
      </div>

      <button onClick={addAlarm} className="btn btn-primary mb-4">
        Add Alarm
      </button>

      <ul className="list-group">
        {alarms.map((alarm) => (
          <li className="list-group-item" key={alarm._id}>
            Alarm set for: {alarm.time} — {alarm.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
