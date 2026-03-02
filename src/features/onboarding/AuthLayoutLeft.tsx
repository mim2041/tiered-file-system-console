import { Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const AuthLayoutLeft = () => {
  const highlights = [
    "Manage subscription packages and limits from one console",
    "Apply policy updates instantly across all tenant operations",
    "Keep admin actions consistent with API-first workflows",
  ];

  return (
    <div className="h-screen flex items-center justify-center p-8 xl:p-12">
      <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 xl:p-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center">
            <img src="/logo.svg" alt="Tiered File System" className="h-7 w-7" />
          </div>
          <div>
            <Text className="!text-white/80 uppercase tracking-wide !text-xs">
              Admin Console
            </Text>
            <Title level={4} className="!text-white !mb-0">
              Tiered File System
            </Title>
          </div>
        </div>

        <Title level={2} className="!text-white !mb-3">
          Control your package rules with confidence
        </Title>
        <Paragraph className="!text-white/80 !mb-8">
          Sign in to manage package limits, enforce rules in real time, and keep your SaaS file system policies aligned with backend constraints.
        </Paragraph>

        <div className="space-y-4">
          {highlights.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-primary" />
              <Text className="!text-white/90">{item}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutLeft;
