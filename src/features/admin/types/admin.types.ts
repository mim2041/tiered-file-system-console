// Admin Dashboard Types

export interface DashboardStats {
  totalUsers: number;
  totalVerifiedUsers: number;
  totalPackages: number;
  activeSubscriptions: number;
  totalFiles: number;
  totalFolders: number;
  totalStorageBytes: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  activeSubscription?: {
    packageId: string;
    packageName: string;
    endsAt: string;
  };
}

export interface ListUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: 'ADMIN' | 'USER';
  isVerified?: boolean;
}

export interface ListUsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface EnrollmentHistory {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  packageId: string;
  packageName: string;
  packageSlug: string;
  startedAt: string;
  endedAt: string | null;
  isActive: boolean;
}

export interface ListEnrollmentsParams {
  page?: number;
  limit?: number;
  userId?: string;
  packageId?: string;
  isActive?: boolean;
}

export interface ListEnrollmentsResponse {
  data: EnrollmentHistory[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface AuditLogMeta {
  oldData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface AuditLog {
  id: string;
  actorUserId: string;
  actorEmail: string;
  actorName: string;
  actorRole: string;
  actionType: string;
  targetType: string;
  targetId?: string;
  metaJson?: AuditLogMeta;
  createdAt: string;
}

export interface ListAuditLogsParams {
  page?: number;
  limit?: number;
  actorUserId?: string;
  actionType?: string;
  targetType?: string;
  targetId?: string;
  from?: string;
  to?: string;
}

export interface ListAuditLogsResponse {
  data: AuditLog[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
