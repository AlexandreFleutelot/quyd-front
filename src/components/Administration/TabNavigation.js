// src/components/Administration/TabNavigation.js
import React from 'react';
import { Menu } from 'antd';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <Menu mode="horizontal" selectedKeys={[activeTab]} onClick={e => setActiveTab(e.key)}>
      <Menu.Item key="users">Users</Menu.Item>
      <Menu.Item key="groups">Groups</Menu.Item>
      <Menu.Item key="roles">Roles</Menu.Item>
      <Menu.Item key="accesses">Accesses</Menu.Item>
    </Menu>
  );
};

export default TabNavigation;