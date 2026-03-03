import React, { useEffect, useState } from "react";
import { Table, Card, Space, Tag, Input, Button, Spin, message, Empty } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import type { EnrollmentHistory, ListEnrollmentsResponse } from "../types/admin.types";
import { adminService } from "../services/adminService";

const EnrollmentHistoryPage: React.FC = () => {
  const [data, setData] = useState<EnrollmentHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [searchText, setSearchText] = useState("");

  const fetchEnrollments = async (
    page: number = 1,
    userId?: string
  ) => {
    try {
      setLoading(true);
      const response: ListEnrollmentsResponse =
        await adminService.listEnrollments({
          page,
          limit: 20,
          userId: userId || undefined,
        });

      setData(response.data);
      setPagination({
        current: response.page,
        pageSize: response.limit,
        total: response.total,
      });
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
      message.error("Failed to load enrollment history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleTableChange = (pag: TablePaginationConfig) => {
    if (pag.current) {
      fetchEnrollments(pag.current);
    }
  };

  const handleSearch = () => {
    fetchEnrollments(1, searchText || undefined);
  };

  const handleRefresh = () => {
    setSearchText("");
    fetchEnrollments();
  };

  const columns: TableColumnsType<EnrollmentHistory> = [
    {
      title: "User",
      dataIndex: "userName",
      key: "userName",
      render: (name: string, record) => `${name} (${record.userEmail})`,
      width: "25%",
    },
    {
      title: "Package",
      dataIndex: "packageName",
      key: "packageName",
      width: "15%",
    },
    {
      title: "Start Date",
      dataIndex: "startedAt",
      key: "startedAt",
      render: (date: string) => new Date(date).toLocaleString(),
      width: "20%",
    },
    {
      title: "End Date",
      dataIndex: "endedAt",
      key: "endedAt",
      render: (date: string | null) => date ? new Date(date).toLocaleString() : "—",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "default"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
      width: "20%",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Package History & Enrollment</h1>
        <p className="mt-2 text-gray-600">
          View all subscription enrollments and user package history.
        </p>
      </div>

      <Card>
        <Space.Compact style={{ width: "100%" }} className="mb-4">
          <Input
            placeholder="Search by User ID"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: "calc(100% - 180px)" }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            style={{ width: "90px" }}
          >
            Search
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            style={{ width: "90px" }}
          >
            Reset
          </Button>
        </Space.Compact>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Spin />
          </div>
        ) : data.length === 0 ? (
          <Empty description="No enrollment records found" />
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
      </Card>
    </div>
  );
};

export default EnrollmentHistoryPage;
