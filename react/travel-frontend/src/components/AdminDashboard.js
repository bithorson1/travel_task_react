import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Navbar from './Navbar';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    axiosInstance.get('/api/admin/requests/')
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch requests.');
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id, status) => {
    setError('');
    setUpdatingId(id);
    try {
      const { data: requestData } = await axiosInstance.get(`/api/admin/requests/${id}/`);
      const updatedData = { ...requestData, status };
      const { data } = await axiosInstance.put(`/api/admin/requests/${id}/`, updatedData);

      setRequests(prev => prev.map(req => (req.id === id ? data : req)));
    } catch (e) {
      setError('Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2 className="admin-title">Admin Dashboard - All Travel Requests</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {requests.length === 0 ? (
          <p>No travel requests found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Destination</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>User ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.destination}</td>
                  <td>{req.start_date}</td>
                  <td>{req.end_date}</td>
                  <td>{req.reason}</td>
                  <td>{req.status}</td>
                  <td>{req.user}</td>
                  <td className="actions-cell">
                      <Link to={`/admin/requests/${req.id}`} className="view-details-link" style={{ marginRight: '10px' }}>
                        View Details
                      </Link>
                      {req.status === 'Pending' ? (
                        <>
                          <button
                            className="btn btn-approve"
                            onClick={() => updateStatus(req.id, 'Approved')}
                            disabled={updatingId === req.id}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-reject"
                            onClick={() => updateStatus(req.id, 'Rejected')}
                            disabled={updatingId === req.id}
                            style={{ marginLeft: '8px' }}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="no-action-text">No actions available</span>
                      )}
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

export default AdminDashboard;
