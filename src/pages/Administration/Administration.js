// src/pages/Administration/Administration.js
import React, { useState, useEffect } from 'react';
import UserManagement from '../../components/Administration/UserManagement';
import GroupManagement from '../../components/Administration/GroupManagement';
import RoleManagement from '../../components/Administration/RoleManagement';
import AccessManagement from '../../components/Administration/AccessManagement';
import TabNavigation from '../../components/Administration/TabNavigation';
import './Administration.css';

const Administration = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'groups':
        return <GroupManagement />;
      case 'roles':
        return <RoleManagement />;
      case 'accesses':
        return <AccessManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="administration">
      <h1 className="admin-title">Administration</h1>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderActiveTab()}
    </div>
  );
};

export default Administration;