import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaComments, FaDatabase } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  
  const navItems = [
    { path: '/home', icon: FaHome, label: 'Home' },
    { path: '/chat', icon: FaComments, label: 'Chat' },
    { path: '/database', icon: FaDatabase, label: 'Base documentaire' },
  ];

  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <BiChevronLeft /> : <BiChevronRight />}
      </button>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon />
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;