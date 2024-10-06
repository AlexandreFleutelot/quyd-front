// src/components/Administration/RoleManagement.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { roleService } from '../../services';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const fetchedRoles = await roleService.getRoles();
    setRoles(fetchedRoles);
  };

  const showModal = (role = null) => {
    setEditingRole(role);
    if (role) {
      form.setFieldsValue(role);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingRole) {
        await roleService.updateRole(editingRole.id, values);
      } else {
        await roleService.createRole(values);
      }
      setIsModalVisible(false);
      fetchRoles();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (roleId) => {
    await roleService.deleteRole(roleId);
    fetchRoles();
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
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
    <div className="role-management">
      <Button onClick={() => showModal()} type="primary" style={{ marginBottom: 16 }}>
        Add Role
      </Button>
      <Table columns={columns} dataSource={roles} rowKey="id" />
      <Modal
        title={editingRole ? "Edit Role" : "Create Role"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManagement;