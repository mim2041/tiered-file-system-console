import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Empty, message, Progress, Statistic } from "antd";
import {
  UserOutlined,
  CrownOutlined,
  FileOutlined,
  FolderOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { DashboardStats } from "../types/admin.types";
import { adminService } from "../services/adminService";

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        message.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!stats) {
    return (
      <Empty
        description="Failed to load statistics"
        style={{ marginTop: "50px" }}
      />
    );
  }

  const formatBytes = (bytes: string): string => {
    const num = parseInt(bytes);
    if (num === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(num) / Math.log(k));
    return Math.round((num / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const verificationRate =
    stats.totalUsers > 0
      ? Math.round((stats.totalVerifiedUsers / stats.totalUsers) * 100)
      : 0;

  const statCards: StatCard[] = [
    {
      title: "Total Users",
      value: stats.totalUsers ?? 0,
      icon: <UserOutlined className="text-2xl" />,
      color: "bg-blue-500",
    },
    {
      title: "Verified Users",
      value: stats.totalVerifiedUsers ?? 0,
      icon: <CheckCircleOutlined className="text-2xl" />,
      color: "bg-green-500",
    },
    {
      title: "Active Subscriptions",
      value: stats.activeSubscriptions ?? 0,
      icon: <CrownOutlined className="text-2xl" />,
      color: "bg-purple-500",
    },
    {
      title: "Total Packages",
      value: stats.totalPackages ?? 0,
      icon: <CrownOutlined className="text-2xl" />,
      color: "bg-yellow-500",
    },
    {
      title: "Total Files",
      value: stats.totalFiles ?? 0,
      icon: <FileOutlined className="text-2xl" />,
      color: "bg-indigo-500",
    },
    {
      title: "Total Folders",
      value: stats.totalFolders ?? 0,
      icon: <FolderOutlined className="text-2xl" />,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here&apos;s your platform overview.
        </p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        {statCards.map((stat) => (
          <Col xs={24} sm={12} lg={8} key={stat.title}>
            <Card
              hoverable
              className="h-full shadow-md"
              bodyStyle={{ padding: "20px" }}
            >
              <div className="space-y-4">
                <div
                  className={`inline-flex rounded-lg ${stat.color} p-3 text-white`}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Analytics Cards */}
      <Row gutter={[16, 16]}>
        {/* User Verification Rate */}
        <Col xs={24} lg={8}>
          <Card title="User Verification Rate" className="shadow-md">
            <div className="text-center">
              <Progress
                type="circle"
                percent={verificationRate}
                format={(percent) => `${percent}%`}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
              />
              <div className="mt-4">
                <Statistic
                  title="Verified Users"
                  value={stats.totalVerifiedUsers ?? 0}
                  suffix={`/ ${stats.totalUsers ?? 0}`}
                />
              </div>
            </div>
          </Card>
        </Col>

        {/* Storage Usage */}
        <Col xs={24} lg={8}>
          <Card title="Storage Usage" className="shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Storage</span>
                <span className="text-xl font-bold">
                  {formatBytes(stats.totalStorageBytes ?? "0")}
                </span>
              </div>
              <div className="flex items-center justify-center py-8">
                <DatabaseOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
              </div>
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-xs text-gray-500">Files</p>
                  <p className="text-lg font-semibold">{stats.totalFiles ?? 0}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Folders</p>
                  <p className="text-lg font-semibold">{stats.totalFolders ?? 0}</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Subscription Overview */}
        <Col xs={24} lg={8}>
          <Card title="Subscription Overview" className="shadow-md">
            <div className="space-y-6">
              <div className="text-center">
                <Statistic
                  title="Active Subscriptions"
                  value={stats.activeSubscriptions ?? 0}
                  prefix={<CrownOutlined />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </div>
              <div className="border-t pt-4">
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-gray-600">Subscription Rate</span>
                  <span className="text-sm font-medium">
                    {stats.totalUsers > 0
                      ? Math.round(
                          (stats.activeSubscriptions / stats.totalUsers) * 100
                        )
                      : 0}
                    %
                  </span>
                </div>
                <Progress
                  percent={
                    stats.totalUsers > 0
                      ? Math.round(
                          (stats.activeSubscriptions / stats.totalUsers) * 100
                        )
                      : 0
                  }
                  strokeColor="#52c41a"
                />
              </div>
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-xs text-gray-600">Total Packages</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalPackages ?? 0}
                </p>
                <p className="text-xs text-gray-500">Available plans</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;
