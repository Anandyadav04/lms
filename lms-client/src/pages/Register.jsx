import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const res = auth.register({ name, email, password });
    if (res.ok) navigate('/dashboard');
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f4f6f8',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Left side image */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(images/signup.jpeg) center/cover no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        padding: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          Welcome to LMS Platform
        </h1>
        <p style={{
          fontSize: '1.2rem',
          maxWidth: '500px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          lineHeight: '1.6'
        }}>
          Join thousands of students and educators in our learning management system. Access courses, track progress, and achieve your learning goals.
        </p>
      </div>

      {/* Right side register form */}
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
            textAlign: 'center',
            fontWeight: '600'
          }}>
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <input
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
                onFocus={e => e.target.style.borderColor = '#007bff'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
                onFocus={e => e.target.style.borderColor = '#007bff'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                  outline: 'none'
                }}
                onFocus={e => e.target.style.borderColor = '#007bff'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                color: '#fff',
                padding: '15px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'transform 0.2s, box-shadow 0.2s',
                marginTop: '10px'
              }}
              onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.target.style.transform = 'translateY(0)'}
            >
              Create Account
            </button>
          </form>
          <p style={{
            marginTop: '1.5rem',
            fontSize: '0.9rem',
            textAlign: 'center',
            color: '#777'
          }}>
            Already have an account? <a href="/login" style={{ color: '#2575fc', textDecoration: 'none', fontWeight: '600' }}>Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}