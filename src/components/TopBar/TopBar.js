import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import UserModal from '../UserModal/UserModal';
import './TopBar.css';

const TopBar = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const toggleUserModal = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };

  return (
    <div className="topbar">
      <div className="global-info">QUYD - Questionnez vos documents</div>
      <button className="user-icon" onClick={toggleUserModal}>
        <FaUser />
      </button>
      {isUserModalOpen && <UserModal onClose={toggleUserModal} />}
    </div>
  );
};

export default TopBar;