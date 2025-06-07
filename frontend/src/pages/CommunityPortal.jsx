import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function CommunityPortal() {
  const { auth, logout } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Major Singh', text: 'Welcome to the officers community!', timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      const mockMessages = [
        'Remember the next welfare meeting on Friday.',
        'Anyone interested in a group hike this weekend?',
        'Please review the new medical aid scheme.',
        'Good morning, team! Keep up the great work.',
      ];
      const randomMsg = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'Officer Chat Bot',
          text: randomMsg,
          timestamp: new Date(),
        },
      ]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: auth.user.name,
        text: newMessage.trim(),
        timestamp: new Date(),
      },
    ]);
    setNewMessage('');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#f4f5ec',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(106, 120, 50, 0.2)',
        fontFamily: 'Segoe UI, sans-serif',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#3d4f2d' }}>Community Portal</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          border: '1px solid #aab78d',
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: '#e9eede',
          marginBottom: '1rem',
        }}
      >
        {messages.length === 0 && <p style={{ color: '#556b2f' }}>No messages yet.</p>}

        {messages.map(({ id, sender, text, timestamp }) => (
          <div
            key={id}
            style={{
              marginBottom: '1rem',
              backgroundColor: sender === auth.user.name ? '#a6c76f' : '#d6e4b8',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              maxWidth: '70%',
              alignSelf: sender === auth.user.name ? 'flex-end' : 'flex-start',
              boxShadow: '0 0 4px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{ fontWeight: '600', color: '#374720', marginBottom: '0.25rem' }}
            >
              {sender}
            </div>
            <div style={{ whiteSpace: 'pre-wrap', color: '#3a3a3a' }}>{text}</div>
            <small style={{ fontSize: '0.7rem', color: '#556b2f', marginTop: '0.3rem' }}>
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.75rem' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '0.75rem 1rem',
            borderRadius: '25px',
            border: '1.5px solid #aab78d',
            fontSize: '1rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          className="btn btn-success"
          style={{ padding: '0 1.5rem', borderRadius: '25px' }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
