import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Navbar from './Navbar';

const UserDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/requests/')
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching travel requests:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="user-container">
        <h2 className="dashboard-title">Your Travel Requests</h2>
        {requests.length === 0 ? (
          <p>No travel requests found.</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Destination</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>{req.destination}</td>
                  <td>{req.start_date}</td>
                  <td>{req.end_date}</td>
                  <td>{req.reason}</td>
                  <td>
                    <span className={`status ${req.status.toLowerCase()}`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default UserDashboard;
