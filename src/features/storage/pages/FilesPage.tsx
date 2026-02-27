import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Popconfirm, Space, Table, Tag, Typography, message } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { storageService, type FileItem } from '../services/storageService';

const { Title, Text } = Typography;

const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const power = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** power;
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[power]}`;
};

const FilesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<FileItem[]>([]);

  const load = async () => {
    setIsLoading(true);
    try {
      const data = await storageService.getFiles();
      setRows(data);
    } catch {
      message.error('Failed to load files');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const onDelete = async (id: string) => {
    try {
      await storageService.deleteFile(id);
      message.success('File deleted');
      await load();
    } catch {
      message.error('Failed to delete file');
    }
  };

  const columns = useMemo(
    () => [
      { title: 'Filename', dataIndex: 'filename', key: 'filename' },
      {
        title: 'Type',
        dataIndex: 'mimeType',
        key: 'mimeType',
        render: (value: string) => <Tag>{value}</Tag>,
      },
      { title: 'Size', dataIndex: 'sizeBytes', key: 'sizeBytes', render: (value: number) => formatBytes(value) },
      { title: 'Folder ID', dataIndex: 'folderId', key: 'folderId' },
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value: string) => (value ? new Date(value).toLocaleString() : '-'),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: unknown, row: FileItem) => (
          <Popconfirm title="Delete file?" onConfirm={() => onDelete(row.id)}>
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
            <Title level={3} style={{ margin: 0 }}>Files</Title>
            <Text type="secondary">File listing and basic lifecycle controls.</Text>
          </div>
          <Button icon={<ReloadOutlined />} onClick={load} loading={isLoading}>Refresh</Button>
        </Space>

        <Table rowKey="id" loading={isLoading} columns={columns} dataSource={rows} />
      </Card>
    </div>
  );
};

export default FilesPage;
