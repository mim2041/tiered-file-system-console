import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Space,
  Tag,
  Input,
  Button,
  Spin,
  message,
  Empty,
  Select,
} from "antd";
import { SearchOutlined, ReloadOutlined, UserOutlined } from "@ant-design/icons";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import type { User, ListUsersResponse } from "../types/admin.types";
import { adminService } from "../services/adminService";

const { Option } = Select;

const UsersPage: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [verifiedFilter, setVerifiedFilter] = useState<boolean | undefined>(
    undefined
  );

  const fetchUsers = async (
    page: number = 1,
    search?: string,
    role?: string,
    isVerified?: boolean
  ) => {
    try {
      setLoading(true);
      const response: ListUsersResponse = await adminService.listUsers({
        page,
        limit: 20,
        search: search || undefined,
        role: role as "ADMIN" | "USER" | undefined,
        isVerified: isVerified,
      });

      setData(response.data);
      setPagination({
        current: response.page,
        pageSize: response.limit,
        total: response.total,
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTableChange = (pag: TablePaginationConfig) => {
    if (pag.current) {
      fetchUsers(pag.current, searchText, roleFilter, verifiedFilter);
    }
  };

  const handleSearch = () => {
    fetchUsers(1, searchText, roleFilter, verifiedFilter);
  };

  const handleReset = () => {
    setSearchText("");
    setRoleFilter(undefined);
    setVerifiedFilter(undefined);
    fetchUsers();
  };

  const columns: TableColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (name: string) => (
        <Space>
          <UserOutlined />
          {name}
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      render: (role: string) => (
        <Tag color={role === "ADMIN" ? "red" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      key: "isVerified",
      width: "10%",
      render: (isVerified: boolean) => (
        <Tag color={isVerified ? "green" : "default"}>
          {isVerified ? "Verified" : "Unverified"}
        </Tag>
      ),
    },
    {
      title: "Active Subscription",
      dataIndex: "activeSubscription",
      key: "activeSubscription",
      width: "15%",
      render: (subscription: User["activeSubscription"]) =>
        subscription ? (
          <Tag color="blue">{subscription.packageName}</Tag>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      render: (date: string) => new Date(date).toLocaleString(),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="mt-2 text-gray-600">
          View and manage all users in the system.
        </p>
      </div>

      <Card>
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <Space wrap>
            <Input
              placeholder="Search by name or email"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
            <Select
              placeholder="Filter by role"
              value={roleFilter}
              onChange={setRoleFilter}
              style={{ width: 150 }}
              allowClear
            >
              <Option value="ADMIN">Admin</Option>
              <Option value="USER">User</Option>
            </Select>
            <Select
              placeholder="Filter by verified"
              value={verifiedFilter}
              onChange={setVerifiedFilter}
              style={{ width: 150 }}
              allowClear
            >
              <Option value={true}>Verified</Option>
              <Option value={false}>Unverified</Option>
            </Select>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              Reset
            </Button>
          </Space>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Spin />
            </div>
          ) : data.length === 0 ? (
            <Empty description="No users found" />
          ) : (
            <Table
              columns={columns}
              dataSource={data}
              pagination={pagination}
              onChange={handleTableChange}
              loading={loading}
              rowKey="id"
              scroll={{ x: 1000 }}
            />
          )}
        </Space>
      </Card>
    </div>
  );
};

export default UsersPage;
