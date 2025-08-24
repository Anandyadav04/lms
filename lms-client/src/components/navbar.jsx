import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // example count
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/courses?search=${encodeURIComponent(search)}`);
      setSearch('');
    }
  }

  function toggleDarkMode() {
    setDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode');
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      background: darkMode ? '#1e1e1e' : '#fff',
      color: darkMode ? '#fff' : '#000',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Left: Brand & Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: 'none', color: 'inherit' }}>LMS</Link>
        <div className="desktop-links" style={{ display: menuOpen ? 'block' : 'flex', gap: '10px' }}>
          <Link to="/courses" style={{ color: 'inherit', textDecoration: 'none' }}>Courses</Link>
          <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
          <Link to="/Contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
        </div>
      </div>

      {/* Middle: Search */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '5px' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search courses..."
          style={{
            padding: '6px 10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            outline: 'none'
          }}
        />
        <button type="submit" style={{
          padding: '6px 12px',
          background: '#2575fc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Search
        </button>
      </form>

      {/* Right: User Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Notifications */}
        {user && (
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            🔔
            {notifications > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: 'red',
                color: '#fff',
                borderRadius: '50%',
                padding: '2px 5px',
                fontSize: '0.75rem'
              }}>
                {notifications}
              </span>
            )}
          </div>
        )}

        {/* Dark mode toggle */}
        <button onClick={toggleDarkMode} style={{
          background: 'transparent',
          border: '1px solid #ccc',
          padding: '5px 8px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          {darkMode ? '🌙' : '☀️'}
        </button>

        {/* Auth Links */}
        {user ? (
          <>
            <span className="small" style={{ marginRight: 8 }}>{user.name} ({user.role})</span>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>
            {user.role === 'admin' && <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>Admin</Link>}
            <button onClick={logout} className="btn" style={{ marginLeft: 10 }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
            <Link to="/register" className="btn" style={{
              marginLeft: 8,
              background: '#2575fc',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '4px'
            }}>Sign up</Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="mobile-menu" style={{ display: 'none' }} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
}
