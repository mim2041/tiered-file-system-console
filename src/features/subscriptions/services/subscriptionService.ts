import { api } from '../../../core/api/api-client';
import { API_ENDPOINTS } from '../../../core/api/endpoints';
import type {
  ApiEnvelope,
  SubscriptionPackage,
  UpsertSubscriptionPackagePayload,
} from '../types/subscription.types';

export const subscriptionService = {
  async getPackages() {
    const response = await api.get<ApiEnvelope<SubscriptionPackage[]>>(
      API_ENDPOINTS.PACKAGES.GET_ALL
    );
    return response.data ?? [];
  },
  createPackage(payload: UpsertSubscriptionPackagePayload) {
    return api.post<ApiEnvelope<SubscriptionPackage>>(
      API_ENDPOINTS.PACKAGES.CREATE,
      payload
    );
  },
  updatePackage(id: string, payload: UpsertSubscriptionPackagePayload) {
    return api.put<ApiEnvelope<SubscriptionPackage>>(
      API_ENDPOINTS.PACKAGES.UPDATE(id),
      payload
    );
  },
  deletePackage(id: string) {
    return api.delete<ApiEnvelope<null>>(API_ENDPOINTS.PACKAGES.DELETE(id));
  },
};
