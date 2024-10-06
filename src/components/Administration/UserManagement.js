// src/components/Administration/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Switch } from 'antd';
import { userService, groupService, roleService } from '../../services';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchGroups();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = await userService.getUsers();
    setUsers(fetchedUsers);
  };

  const fetchGroups = async () => {
    const fetchedGroups = await groupService.getGroups();
    setGroups(fetchedGroups);
  };

  const fetchRoles = async () => {
    const fetchedRoles = await roleService.getRoles();
    setRoles(fetchedRoles);
  };

  const showModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      form.setFieldsValue({
        ...user,
        roles: user.roles.map(role => role.name),
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await userService.updateUser(editingUser.id, values);
      } else {
        await userService.createUser(values);
      }
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (userId) => {
    await userService.deleteUser(userId);
    fetchUsers();
  };

  const columns = [
    { title: 'Login', dataIndex: 'login', key: 'login' },
    { title: 'Group', dataIndex: ['group', 'name'], key: 'group' },
    { 
      title: 'Roles', 
      dataIndex: 'roles', 
      key: 'roles',
      render: (roles) => roles.map(role => role.name).join(', ')
    },
    { 
      title: 'Active', 
      dataIndex: 'is_active', 
      key: 'is_active',
      render: (isActive) => isActive ? 'Yes' : 'No'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div className="user-management">
      <Button onClick={() => showModal()} type="primary" style={{ marginBottom: 16 }}>
        Add User
      </Button>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <Modal
        title={editingUser ? "Edit User" : "Create User"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="login" label="Login" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {!editingUser && (
            <Form.Item name="password" label="Password" rules={[{ required: true, min: 8 }]}>
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item name="group_id" label="Group" rules={[{ required: true }]}>
            <Select>
              {groups.map(group => (
                <Select.Option key={group.id} value={group.id}>{group.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="roles" label="Roles">
            <Select mode="multiple">
              {roles.map(role => (
                <Select.Option key={role.id} value={role.name}>{role.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="is_active" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;