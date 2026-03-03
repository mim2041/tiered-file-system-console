import { api } from "../../../core/api/api-client";
import { API_ENDPOINTS } from "../../../core/api/endpoints";
import type {
  DashboardStats,
  ListUsersParams,
  ListUsersResponse,
  ListEnrollmentsParams,
  ListEnrollmentsResponse,
  ListAuditLogsParams,
  ListAuditLogsResponse,
} from "../types/admin.types";

export const adminService = {
  // Get dashboard statistics
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get<{ data: DashboardStats }>(
      API_ENDPOINTS.ADMIN.DASHBOARD_STATS
    );
    return response.data;
  },

  // List users
  listUsers: async (params?: ListUsersParams): Promise<ListUsersResponse> => {
    const response = await api.get<{ data: ListUsersResponse["data"]; meta: { page: number; limit: number; total: number } }>(
      API_ENDPOINTS.ADMIN.LIST_USERS,
      { params }
    );
    return {
      data: response.data,
      total: response.meta.total,
      page: response.meta.page,
      limit: response.meta.limit,
      hasMore: response.meta.page * response.meta.limit < response.meta.total,
    };
  },

  // List enrollment history
  listEnrollments: async (
    params?: ListEnrollmentsParams
  ): Promise<ListEnrollmentsResponse> => {
    const response = await api.get<{ data: ListEnrollmentsResponse["data"]; meta: { page: number; limit: number; total: number } }>(
      API_ENDPOINTS.ADMIN.LIST_ENROLLMENTS,
      { params }
    );
    return {
      data: response.data,
      total: response.meta.total,
      page: response.meta.page,
      limit: response.meta.limit,
      hasMore: response.meta.page * response.meta.limit < response.meta.total,
    };
  },

  // List audit logs
  listAuditLogs: async (
    params?: ListAuditLogsParams
  ): Promise<ListAuditLogsResponse> => {
    const response = await api.get<{ data: ListAuditLogsResponse["data"]; meta: { page: number; limit: number; total: number } }>(
      API_ENDPOINTS.ADMIN.GET_AUDIT_LOGS,
      { params }
    );
    return {
      data: response.data,
      total: response.meta.total,
      page: response.meta.page,
      limit: response.meta.limit,
      hasMore: response.meta.page * response.meta.limit < response.meta.total,
    };
  },
};
