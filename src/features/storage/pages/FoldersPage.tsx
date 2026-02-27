import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Form, Input, Modal, Popconfirm, Space, Table, Typography, message } from 'antd';
import { DeleteOutlined, FolderAddOutlined, ReloadOutlined } from '@ant-design/icons';
import { storageService, type FolderItem } from '../services/storageService';

const { Title, Text } = Typography;

const FoldersPage: React.FC = () => {
  const [form] = Form.useForm<{ name: string; parentId?: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<FolderItem[]>([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    setIsLoading(true);
    try {
      const data = await storageService.getFolders();
      setRows(data);
    } catch {
      message.error('Failed to load folders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const onCreate = async () => {
    try {
      const values = await form.validateFields();
      await storageService.createFolder({ name: values.name, parentId: values.parentId || null });
      message.success('Folder created');
      setOpen(false);
      form.resetFields();
      await load();
    } catch {
      message.error('Failed to create folder');
    }
  };

  const onDelete = async (id: string) => {
    try {
      await storageService.deleteFolder(id);
      message.success('Folder deleted');
      await load();
    } catch {
      message.error('Failed to delete folder');
    }
  };

  const columns = useMemo(
    () => [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Depth', dataIndex: 'depth', key: 'depth' },
      { title: 'Parent', dataIndex: 'parentId', key: 'parentId', render: (value: string | null) => value || '-' },
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value: string) => (value ? new Date(value).toLocaleString() : '-'),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: unknown, row: FolderItem) => (
          <Popconfirm title="Delete folder?" onConfirm={() => onDelete(row.id)}>
            <Button danger size="small" icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>Folders</Title>
            <Text type="secondary">Create and manage user folder hierarchy.</Text>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={load} loading={isLoading}>Refresh</Button>
            <Button type="primary" icon={<FolderAddOutlined />} onClick={() => setOpen(true)}>New Folder</Button>
          </Space>
        </Space>

        <Table rowKey="id" loading={isLoading} columns={columns} dataSource={rows} />
      </Card>

      <Modal title="Create Folder" open={open} onCancel={() => setOpen(false)} onOk={onCreate}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Folder Name" rules={[{ required: true }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="parentId" label="Parent Folder ID (optional)">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FoldersPage;
