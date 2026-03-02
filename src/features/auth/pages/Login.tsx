import React, { useEffect } from "react";
import { Form, Input, Button, Typography, Alert, Checkbox, Card } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../core/store/hooks";
import { login, clearError } from "../store/authSlice";

import { routes } from "../../../config/routes";
import { selectIsLoading } from "../store/authSelectors";
import { selectError } from "../store/authSelectors";
import { selectIsAuthenticated } from "../store/authSelectors";
import type { LoginCredentials } from "../types/auth.types";
import AuthLayoutLeft from "../../onboarding/AuthLayoutLeft";

const { Text, Title } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate(routes.dashboard.root, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const onFinish = async (
    values: LoginCredentials & { remember?: boolean }
  ) => {
    try {
      const loginData: LoginCredentials = {
        email: values.email,
        password: values.password,
        remember_me: values.remember || false,
      };
      await dispatch(login(loginData)).unwrap();
      // Navigation will be handled by the useEffect above
    } catch (error) {
      // Error is already handled by the Redux slice
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen grid lg:grid-cols-2"
      style={{
        backgroundImage: `linear-gradient(rgba(7, 34, 75, 0.9), rgba(7, 34, 75, 0.9)), url("/bg-auth.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left Side - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block">
        <AuthLayoutLeft />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full h-full flex items-center justify-center bg-white p-5 sm:p-8 lg:p-10 xl:p-12">
        <Card className="w-full max-w-md !rounded-2xl !border !border-gray-200 !shadow-sm">
          <div className="text-center mb-7">
            <Title level={2} className="!mb-2">
              Admin Sign In
            </Title>
            <Text type="secondary">
              Access the console to manage package policies and limits.
            </Text>
          </div>

          {error && (
            <Alert
              message="Login Failed"
              description={error}
              type="error"
              showIcon
              className="mb-5"
            />
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="admin@company.com"
                prefix={<UserOutlined className="text-gray-400" />}
                className="!rounded-lg !h-11"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                prefix={<LockOutlined className="text-gray-400" />}
                className="!rounded-lg !h-11"
              />
            </Form.Item>

            <div className="mb-6 flex items-center justify-between">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="!mb-0"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link
                to={routes.auth.forgotPassword}
                className="text-primary hover:text-primary-hover transition-colors duration-300"
              >
                Forgot password?
              </Link>
            </div>

            <Form.Item className="!mb-2">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full !h-11 !font-medium"
                style={{ background: "var(--color-dod-primary)" }}
              >
                {isLoading ? "Signing In..." : "Sign In to Admin Console"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
