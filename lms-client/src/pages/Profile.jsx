import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ 
    name: user?.name || '', 
    email: user?.email || '' 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, you would update the user data via an API call here
    console.log('Saving user data:', editedUser);
    setIsEditing(false);
    // You would typically update the user context here as well
  };

  const handleCancel = () => {
    setEditedUser({ name: user?.name || '', email: user?.email || '' });
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Your Profile</h1>
        <p style={styles.subtitle}>Manage your account information</p>
      </div>
      
      <div style={styles.card}>
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          {isEditing && (
            <button style={styles.avatarEditBtn}>
              <svg style={styles.cameraIcon} viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19,4H17V3H7V4H5C3.9,4 3,4.9 3,6V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V6C21,4.9 20.1,4 19,4M5,19V7H7.1C7.1,7 9.9,8.7 12,8.7C14.1,8.7 16.9,7 16.9,7H19V19H5Z" />
              </svg>
            </button>
          )}
        </div>
        
        <div style={styles.infoSection}>
          {isEditing ? (
            <>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Role</label>
                <div style={styles.roleDisplay}>
                  {user?.role}
                </div>
                <p style={styles.roleNote}>Role cannot be changed</p>
              </div>
            </>
          ) : (
            <>
              <h2 style={styles.userName}>{user?.name}</h2>
              <p style={styles.userEmail}>{user?.email}</p>
              <div style={styles.roleBadge}>{user?.role}</div>
              
              <div style={styles.stats}>
                <div style={styles.statItem}>
                  <span style={styles.statValue}>24</span>
                  <span style={styles.statLabel}>Projects</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statValue}>12</span>
                  <span style={styles.statLabel}>Connections</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statValue}>3</span>
                  <span style={styles.statLabel}>Years</span>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div style={styles.actions}>
          {isEditing ? (
            <>
              <button style={styles.secondaryButton} onClick={handleCancel}>
                Cancel
              </button>
              <button style={styles.primaryButton} onClick={handleSave}>
                Save Changes
              </button>
            </>
          ) : (
            <button style={styles.primaryButton} onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem 1rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem'
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    padding: '2.5rem',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  },
  avatarSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
    position: 'relative'
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '3rem',
    fontWeight: '600',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: '0',
    right: 'calc(50% - 70px)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#6e8efb',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease'
  },
  cameraIcon: {
    margin: '0 auto',
    display: 'block'
  },
  infoSection: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  userName: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    color: '#1a1a1a'
  },
  userEmail: {
    color: '#666',
    marginBottom: '1.5rem',
    fontSize: '1.1rem'
  },
  roleBadge: {
    display: 'inline-block',
    background: 'rgba(110, 142, 251, 0.1)',
    color: '#6e8efb',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontWeight: '600',
    marginBottom: '2rem'
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '2rem'
  },
  statItem: {
    textAlign: 'center'
  },
  statValue: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a1a1a'
  },
  statLabel: {
    color: '#888',
    fontSize: '0.9rem'
  },
  formGroup: {
    marginBottom: '1.5rem',
    textAlign: 'left'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#444'
  },
  input: {
    width: '100%',
    padding: '0.8rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  },
  roleDisplay: {
    width: '100%',
    padding: '0.8rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#f5f5f5',
    color: '#666',
    boxSizing: 'border-box'
  },
  roleNote: {
    fontSize: '0.8rem',
    color: '#999',
    margin: '0.5rem 0 0 0'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem'
  },
  primaryButton: {
    padding: '0.8rem 1.8rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    color: 'white'
  },
  secondaryButton: {
    padding: '0.8rem 1.8rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: '#f5f5f5',
    color: '#666'
  }
};