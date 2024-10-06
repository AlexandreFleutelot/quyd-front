// src/components/Administration/AccessManagement.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { accessService, groupService } from '../../services';

const AccessManagement = () => {
  const [accesses, setAccesses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingAccess, setEditingAccess] = useState(null);

  useEffect(() => {
    fetchAccesses();
    fetchGroups();
  }, []);

  const fetchAccesses = async () => {
    const fetchedAccesses = await accessService.getAccesses();
    setAccesses(fetchedAccesses);
  };

  const fetchGroups = async () => {
    const fetchedGroups = await groupService.getGroups();
    setGroups(fetchedGroups);
  };

  const showModal = (access = null) => {
    setEditingAccess(access);
    if (access) {
      form.setFieldsValue(access);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingAccess) {
        await accessService.updateAccess(editingAccess.id, values);
      } else {
        await accessService.createAccess(values);
      }
      setIsModalVisible(false);
      fetchAccesses();
      message.success(`Access ${editingAccess ? 'updated' : 'created'} successfully`);
    } catch (error) {
      console.error('Validation failed:', error);
      message.error(`Failed to ${editingAccess ? 'update' : 'create'} access. Please try again.`);
    }
  };

  const handleDelete = async (accessId) => {
    await accessService.deleteAccess(accessId);
    fetchAccesses();
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
    <div className="access-management">
      <Button onClick={() => showModal()} type="primary" style={{ marginBottom: 16 }}>
        Add Access
      </Button>
      <Table columns={columns} dataSource={accesses} rowKey="id" />
      <Modal
        title={editingAccess ? "Edit Access" : "Create Access"}
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

export default AccessManagement;