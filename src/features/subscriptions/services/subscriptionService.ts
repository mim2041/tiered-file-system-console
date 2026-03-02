import { api } from '../../../core/api/api-client';
import { API_ENDPOINTS } from '../../../core/api/endpoints';
import type {
  ApiEnvelope,
  SubscriptionPackage,
  UserSubscriptionHistoryItem,
  UpsertSubscriptionPackagePayload,
} from '../types/subscription.types';

const unwrapResponse = <T>(response: ApiEnvelope<T> | T): T => {
  if (response && typeof response === 'object' && 'data' in (response as ApiEnvelope<T>)) {
    return (response as ApiEnvelope<T>).data;
  }
  return response as T;
};

export const subscriptionService = {
  async getPackages() {
    const response = await api.get<ApiEnvelope<SubscriptionPackage[]> | SubscriptionPackage[]>(
      API_ENDPOINTS.PACKAGES.GET_ALL
    );
    return unwrapResponse(response) ?? [];
  },
  async createPackage(payload: UpsertSubscriptionPackagePayload) {
    const response = await api.post<ApiEnvelope<SubscriptionPackage> | SubscriptionPackage>(
      API_ENDPOINTS.PACKAGES.CREATE,
      payload
    );
    return unwrapResponse(response);
  },
  async updatePackage(id: string, payload: UpsertSubscriptionPackagePayload) {
    const response = await api.put<ApiEnvelope<SubscriptionPackage> | SubscriptionPackage>(
      API_ENDPOINTS.PACKAGES.UPDATE(id),
      payload
    );
    return unwrapResponse(response);
  },
  deletePackage(id: string) {
    return api.delete<ApiEnvelope<null>>(API_ENDPOINTS.PACKAGES.DELETE(id));
  },

  async activateMySubscription(packageId: string) {
    return api.post<ApiEnvelope<UserSubscriptionHistoryItem>>(
      API_ENDPOINTS.USER_SUBSCRIPTIONS.ACTIVATE,
      { packageId }
    );
  },

  async getMySubscriptionHistory() {
    const response = await api.get<ApiEnvelope<UserSubscriptionHistoryItem[]>>(
      API_ENDPOINTS.USER_SUBSCRIPTIONS.MY_HISTORY
    );
    return response?.data ?? [];
  },
};
