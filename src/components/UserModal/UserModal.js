import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './UserModal.css';

const UserModal = ({ onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    onClose();
    navigate('/login');
  };

  return (
    <div className="user-modal-overlay" onClick={onClose}>
      <div className="user-modal" onClick={(e) => e.stopPropagation()}>
        <div className="user-info">
          <img src={user.avatar || '/assets/images/default-avatar.png'} alt={user.name} className="user-avatar" />
          <div>
            <h2>Hi, {user.login}!</h2>
          </div>
        </div>
        <div className='buttons-container'>
          <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
        </div>
        <div className="modal-footer">
          <a href="/privacy">Privacy Policy</a> • <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </div>
  );
};

export default UserModal;