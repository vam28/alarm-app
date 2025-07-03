import { useState, useEffect } from 'react';

function App() {
  const [alarmTime, setAlarmTime] = useState('');
  const [alarms, setAlarms] = useState([]);

  // 🔔 Check for alarm match every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const current = now.toTimeString().slice(0, 5); // Format: HH:MM
      if (alarms.includes(current)) {
        alert(`⏰ Alarm ringing for ${current}`);
      }
    }, 60000); // every 1 minute

    return () => clearInterval(interval); // cleanup
  }, [alarms]);

  const addAlarm = () => {
    if (!alarmTime || alarms.includes(alarmTime)) return;
    setAlarms([...alarms, alarmTime]);
    setAlarmTime('');
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
        {alarms.map((time, index) => (
          <li className="list-group-item" key={index}>
            Alarm set for: {time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
