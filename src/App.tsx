/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useEffect, useState } from "react";
import { Spin } from "antd";
import AppRouter from "./core/router/AppRouter";
import MaintenanceMode from "./app/common/maintenance/MaintenanceMode";
import { maintenanceService } from "./core/services/maintenanceService";
import { ENV } from "./config/env";
import { useAppSelector } from "./core/store/hooks";

// Global loading component
const GlobalLoading = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
    <div className="text-center">
      <Spin size="large" />
      <p className="mt-4 text-gray-600">Loading application...</p>
    </div>
  </div>
);

const App = () => {
  // const { theme } = useAppSelector(
  //   (state) => state.theme || { theme: "light" }
  // );
  // ${theme === "dark" ? "dark" : ""}

  const [maintenanceConfig, setMaintenanceConfig] = useState({
    isEnabled: false,
    isLoading: true,
    config: null as any,
  });
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkMaintenanceMode = async () => {
      try {
        const config = await maintenanceService.getMaintenanceStatus();
        setMaintenanceConfig({
          isEnabled: config.isEnabled,
          isLoading: false,
          config,
        });
      } catch (error) {
        console.error("Failed to check maintenance mode:", error);
        // Fallback to environment variable
        const envMaintenanceMode = ENV.MAINTENANCE_MODE == "true";
        setMaintenanceConfig({
          isEnabled: envMaintenanceMode,
          isLoading: false,
          config: envMaintenanceMode
            ? maintenanceService.getDefaultConfig()
            : null,
        });
      }
    };

    checkMaintenanceMode();

    // Check for maintenance mode updates every 5 minutes
    const interval = setInterval(checkMaintenanceMode, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (maintenanceConfig.isLoading) {
    return <GlobalLoading />;
  }

  //  ${theme === "dark" ? "dark" : ""}`

  return (
    <div className={`app-container`}>
      {maintenanceConfig.isEnabled &&
      !maintenanceService.shouldBypassMaintenance(
        user?.role as unknown as string | undefined
      ) ? (
        <MaintenanceMode config={maintenanceConfig.config} />
      ) : (
        <>
          <Suspense fallback={<GlobalLoading />}>
            <AppRouter />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default App;
