import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    console.log("Attempting login with:", email, password);
    
    try {
      const result = await auth.login({ email, password });
      console.log("Login result:", result);
      
      if (result.ok) {
        console.log("Login successful, navigating to:", from);
        navigate(from, { replace: true });
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  // Test function to check auth state
  const checkAuthState = () => {
    console.log("Current auth state:", auth.user);
    console.log("All users:", auth.users);
    console.log("LocalStorage user:", localStorage.getItem('lms_user'));
    console.log("LocalStorage users:", localStorage.getItem('lms_users'));
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f4f6f8'
    }}>
      {/* Left side image */}
      <div style={{
        flex: 1,
        background: 'url(https://source.unsplash.com/800x800/?education,books) center/cover no-repeat',
        display: window.innerWidth > 768 ? 'block' : 'none'
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
          padding: '40px',
          position: 'relative'
        }}>
          {/* Debug button - remove in production */}
          <button 
            onClick={checkAuthState}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#eee',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Debug Auth
          </button>
          
          <h2 style={{
            marginBottom: '1.5rem',
            fontSize: '2rem',
            color: '#333',
            textAlign: 'center'
          }}>
            Login to LMS
          </h2>
          
          {error && (
            <div style={{
              color: '#e74c3c',
              backgroundColor: '#fadbd8',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
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
              required
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
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div style={{
            marginTop: '1.5rem',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Test Accounts:</p>
            <p style={{ margin: '5px 0' }}>Admin: <strong>admin@lms.com</strong> / <strong>admin</strong></p>
            <p style={{ margin: '5px 0' }}>Student: <strong>any email</strong> / <strong>student</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}