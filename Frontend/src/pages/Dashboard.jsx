import  { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const Dashboard = () => {
  const [attendance, setAttendance] = useState([]);

  const markAttendance = async () => {
    try {
      const response = await axios.post('/api/attendance/mark');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
       
        const response = await axios.get('/api/attendance');
        setAttendance(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div>
      <button onClick={markAttendance}>Mark Attendance</button>
      <ul>
        {attendance.map((record) => (
          <li key={record.id}>{record.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
