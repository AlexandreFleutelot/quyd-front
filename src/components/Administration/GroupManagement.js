// src/components/Administration/GroupManagement.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { groupService } from '../../services';

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingGroup, setEditingGroup] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const fetchedGroups = await groupService.getGroups();
    setGroups(fetchedGroups);
  };

  const showModal = (group = null) => {
    setEditingGroup(group);
    if (group) {
      form.setFieldsValue(group);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingGroup) {
        await groupService.updateGroup(editingGroup.id, values);
      } else {
        await groupService.createGroup(values);
      }
      setIsModalVisible(false);
      fetchGroups();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (groupId) => {
    await groupService.deleteGroup(groupId);
    fetchGroups();
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Collection Name', dataIndex: 'collection_name', key: 'collection_name' },
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
    <div className="group-management">
      <Button onClick={() => showModal()} type="primary" style={{ marginBottom: 16 }}>
        Add Group
      </Button>
      <Table columns={columns} dataSource={groups} rowKey="id" />
      <Modal
        title={editingGroup ? "Edit Group" : "Create Group"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="collection_name" label="Collection Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GroupManagement;