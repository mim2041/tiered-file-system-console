import React from "react";
import { Card, Row, Col, Statistic, Typography } from "antd";
import {
  FolderOpenOutlined,
  FileOutlined,
  UserOutlined,
  CrownOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const DashboardHome: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>SaaS File Management Dashboard</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Folders"
              value={184}
              prefix={<FolderOpenOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Files"
              value={1290}
              prefix={<FileOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={57}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Packages"
              value={4}
              prefix={<CrownOutlined />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} lg={12}>
          <Card title="Recent Upload Activity" size="small">
            <p>No recent uploads</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Package Usage Snapshot" size="small">
            <p>No usage data yet</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;
