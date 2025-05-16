import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Navbar from './Navbar';

const AdminRequestDetail = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get(`/api/admin/requests/${id}/`)
      .then(res => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load request details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="detail-container">
        <h2>Travel Request Details</h2>
        <div className="detail-box">
          <div><strong>ID:</strong> {request.id}</div>
          <div><strong>User:</strong> {request.user}</div>
          <div><strong>Destination:</strong> {request.destination}</div>
          <div><strong>Start Date:</strong> {request.start_date}</div>
          <div><strong>End Date:</strong> {request.end_date}</div>
          <div><strong>Reason:</strong> {request.reason}</div>
          <div><strong>Status:</strong> <span className={`status ${request.status.toLowerCase()}`}>{request.status}</span></div>
          <div><strong>Created At:</strong> {new Date(request.created_at).toLocaleString()}</div>
        </div>
        <Link to="/admin" className="back-link">← Back to Dashboard</Link>
      </div>
    </>
  );
};

export default AdminRequestDetail;
