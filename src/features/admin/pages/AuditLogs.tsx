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
  DatePicker,
  Row,
  Col,
  Modal,
  Descriptions,
  Divider,
  Badge,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import type { Dayjs } from "dayjs";
import type { AuditLog, ListAuditLogsResponse, AuditLogMeta } from "../types/admin.types";
import { adminService } from "../services/adminService";

const AuditLogsPage: React.FC = () => {
  const [data, setData] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [actionTypeFilter, setActionTypeFilter] = useState("");
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const fetchAuditLogs = async (
    page: number = 1,
    actionType?: string,
    from?: string,
    to?: string
  ) => {
    try {
      setLoading(true);
      const response: ListAuditLogsResponse =
        await adminService.listAuditLogs({
          page,
          limit: 20,
          actionType: actionType || undefined,
          from: from || undefined,
          to: to || undefined,
        });

      setData(response.data);
      setPagination({
        current: response.page,
        pageSize: response.limit,
        total: response.total,
      });
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
      message.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const handleTableChange = (pag: TablePaginationConfig) => {
    if (pag.current) {
      fetchAuditLogs(pag.current, actionTypeFilter);
    }
  };

  const handleSearch = () => {
    const fromStr = fromDate ? fromDate.toISOString() : undefined;
    const toStr = toDate ? toDate.toISOString() : undefined;
    fetchAuditLogs(1, actionTypeFilter || undefined, fromStr, toStr);
  };

  const handleReset = () => {
    setActionTypeFilter("");
    setFromDate(null);
    setToDate(null);
    fetchAuditLogs();
  };

  const getActionColor = (actionType: string): string => {
    const colorMap: Record<string, string> = {
      CREATE: "green",
      UPDATE: "blue",
      DELETE: "red",
      READ: "default",
      LOGIN: "cyan",
      LOGOUT: "default",
      PACKAGE_CREATED: "green",
      PACKAGE_UPDATED: "blue",
      PACKAGE_DELETED: "red",
      SUBSCRIPTION_ACTIVATED: "green",
      SUBSCRIPTION_CANCELLED: "red",
      FILE_UPLOADED: "green",
      FILE_DELETED: "red",
      FOLDER_CREATED: "green",
      FOLDER_DELETED: "red",
    };
    return colorMap[actionType] || "default";
  };

  const getChangeSummary = (log: AuditLog): string => {
    if (!log.metaJson) return "—";

    const meta = log.metaJson as AuditLogMeta;
    if (!meta.oldData || !meta.newData) return "—";

    const changes: string[] = [];
    const newData = meta.newData;
    const oldData = meta.oldData;

    for (const key in newData) {
      if (newData[key] !== oldData[key]) {
        changes.push(`${key}: ${oldData[key]} → ${newData[key]}`);
      }
    }

    return changes.length > 0 ? changes.slice(0, 2).join("; ") : "No changes";
  };

  const showDetailModal = (log: AuditLog) => {
    setSelectedLog(log);
    setDetailModalVisible(true);
  };

  const columns: TableColumnsType<AuditLog> = [
    {
      title: "Actor",
      key: "actor",
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.actorName}</div>
          <div className="text-xs text-gray-500">{record.actorEmail}</div>
        </div>
      ),
      width: "18%",
    },
    {
      title: "Action",
      dataIndex: "actionType",
      key: "actionType",
      render: (actionType: string) => (
        <Tag color={getActionColor(actionType)}>{actionType}</Tag>
      ),
      width: "14%",
    },
    {
      title: "Target",
      key: "target",
      render: (_, record) => (
        <div>
          <div className="text-sm font-medium">{record.targetType}</div>
          <div className="text-xs text-gray-500">
            {record.targetId?.slice(0, 8)}...
          </div>
        </div>
      ),
      width: "15%",
    },
    {
      title: "Changes",
      key: "changes",
      render: (_, record) => (
        <div className="max-w-xs truncate text-sm">{getChangeSummary(record)}</div>
      ),
      width: "28%",
    },
    {
      title: "Timestamp",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
      width: "15%",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Action",
      key: "operation",
      width: "10%",
      render: (_, record) => (
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => showDetailModal(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Audit Logs</h1>
        <p className="mt-2 text-gray-600">
          Track all system activities and administrative actions.
        </p>
      </div>

      <Card>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Input
                placeholder="Filter by action type"
                value={actionTypeFilter}
                onChange={(e) => setActionTypeFilter(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <DatePicker
                placeholder="From date"
                value={fromDate}
                onChange={setFromDate}
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <DatePicker
                placeholder="To date"
                value={toDate}
                onChange={setToDate}
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Space style={{ width: "100%" }}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                  block
                >
                  Search
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleReset} block>
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Spin />
            </div>
          ) : data.length === 0 ? (
            <Empty description="No audit logs found" />
          ) : (
            <Table
              columns={columns}
              dataSource={data}
              pagination={pagination}
              onChange={handleTableChange}
              loading={loading}
              rowKey="id"
              scroll={{ x: 1200 }}
            />
          )}
        </Space>
      </Card>

      {/* Detail Modal */}
      <Modal
        title={
          <div>
            <Badge status="processing" />
            Audit Log Details
          </div>
        }
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={900}
      >
        {selectedLog && (
          <div className="space-y-6">
            {/* Basic Info */}
            <Descriptions
              title="Activity Information"
              bordered
              column={2}
              size="small"
            >
              <Descriptions.Item label="Actor">
                <div>
                  <div className="font-medium">{selectedLog.actorName}</div>
                  <div className="text-sm text-gray-500">
                    {selectedLog.actorEmail}
                  </div>
                  <div className="text-xs text-gray-400">
                    Role: {selectedLog.actorRole}
                  </div>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Action">
                <Tag color={getActionColor(selectedLog.actionType)}>
                  {selectedLog.actionType}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Target Type">
                {selectedLog.targetType}
              </Descriptions.Item>
              <Descriptions.Item label="Target ID">
                <code className="text-xs">{selectedLog.targetId || "—"}</code>
              </Descriptions.Item>
              <Descriptions.Item label="Timestamp" span={2}>
                {new Date(selectedLog.createdAt).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>

            {/* Changes Detail */}
            {selectedLog.metaJson && (
              <>
                <Divider />
                <div>
                  <h4 className="mb-4 font-semibold">Changes</h4>

                  {selectedLog.metaJson &&
                    (selectedLog.metaJson as AuditLogMeta).oldData &&
                    (selectedLog.metaJson as AuditLogMeta).newData && (
                      <Row gutter={16}>
                        <Col xs={24} lg={12}>
                          <Card
                            title="Before"
                            size="small"
                            className="bg-red-50"
                            headStyle={{ borderBottom: "2px solid #ff7875" }}
                          >
                            <div className="space-y-2">
                              {Object.entries(
                                ((selectedLog.metaJson as AuditLogMeta).oldData || {}) as Record<string, unknown>
                              ).map(([key, value]) => (
                                <div key={key} className="text-sm">
                                  <div className="font-medium text-gray-700">
                                    {key}
                                  </div>
                                  <div className="overflow-auto rounded bg-white p-2 font-mono text-xs">
                                    {typeof value === "object"
                                      ? JSON.stringify(value, null, 2)
                                      : String(value)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                          <Card
                            title="After"
                            size="small"
                            className="bg-green-50"
                            headStyle={{ borderBottom: "2px solid #95de64" }}
                          >
                            <div className="space-y-2">
                              {Object.entries(
                                ((selectedLog.metaJson as AuditLogMeta).newData || {}) as Record<string, unknown>
                              ).map(([key, value]) => (
                                <div key={key} className="text-sm">
                                  <div className="font-medium text-gray-700">
                                    {key}
                                  </div>
                                  <div className="overflow-auto rounded bg-white p-2 font-mono text-xs">
                                    {typeof value === "object"
                                      ? JSON.stringify(value, null, 2)
                                      : String(value)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    )}

                  {selectedLog.metaJson &&
                    !(selectedLog.metaJson as AuditLogMeta).oldData &&
                    !(selectedLog.metaJson as AuditLogMeta).newData && (
                      <div className="text-gray-500">
                        <code className="block overflow-auto rounded-lg bg-gray-100 p-4 text-xs">
                          {JSON.stringify(
                            selectedLog.metaJson as AuditLogMeta,
                            null,
                            2
                          )}
                        </code>
                      </div>
                    )}
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AuditLogsPage;
