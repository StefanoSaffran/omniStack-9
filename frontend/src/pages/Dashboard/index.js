import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client'
import api from '../../services/api';

import './styles.css'

const Dashboard = () => {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');
  const socket = useMemo(() => socketio('http://localhost:3003', {
    query: { user_id },
  }), [user_id]);

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    })
  }, [requests, socket])

  useEffect(() => {
    const user_id = localStorage.getItem('user');
    const config = {
      headers: { user_id }
    }
    api.get('/dashboard', config)
      .then(res => setSpots(res.data))
  }, [])

  const handleAccept = id => {
    api.post(`/bookings/${id}/approvals`)
      .then(res => setRequests(requests.filter(request => request.id !== id)))
  }

  const handleReject = id => {
    api.post(`/bookings/${id}/rejections`)
    .then(res => setRequests(requests.filter(request => request.id !== id)))
  }
  const rows = spots.map(spot => (
    <li key={spot.id}>
      <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
      <strong>{spot.company}</strong>
      <span>{spot.price ? `RS${spot.price}/dia` : 'GRATUITO'}</span>
    </li>
  ))

  const requestsMessage = requests.map(request => (
    <li key={request.id}>
      <p>
        <strong>{request.user.email}</strong> está solicitando um reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
      </p>
      <button className="accept" onClick={() => handleAccept(request.id)}>ACEITAR</button>
      <button className="reject" onClick={() => handleReject(request.id)}>REJEITAR</button>
    </li>
  ))
  return (
    <>
      <ul className="notifications">
        {requestsMessage}
      </ul>

      <ul className="spot-list">
        {rows}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  )
}

export default Dashboard;