import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await auth.login({ email, password });
    setLoading(false);
    if (res.ok) navigate(from, { replace: true });
    else alert(res.message || 'Login failed');
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f4f6f8'
    }}>
      {/* Left side image */}
      <div style={{
        flex: 1,
        background: 'url(https://source.unsplash.com/800x800/?education,books) center/cover no-repeat'
      }}></div>

      {/* Right side login form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px',
          padding: '40px'
        }}>
          <h2 style={{
            marginBottom: '1.5rem',
            fontSize: '2rem',
            color: '#333',
            textAlign: 'center'
          }}>
            Login to LMS
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                padding: '12px 15px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                padding: '12px 15px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />
            <button
              disabled={loading}
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                color: '#fff',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p style={{
            marginTop: '1rem',
            fontSize: '0.9rem',
            textAlign: 'center',
            color: '#777'
          }}>
            Tip: <strong>admin@lms.com / admin</strong> or any email / <strong>student</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
