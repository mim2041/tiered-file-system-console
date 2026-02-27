import { api } from '../../../core/api/api-client';
import { API_ENDPOINTS } from '../../../core/api/endpoints';
import type {
  SubscriptionPackage,
  UpsertSubscriptionPackagePayload,
} from '../types/subscription.types';

export const subscriptionService = {
  getPackages() {
    return api.get<SubscriptionPackage[]>(API_ENDPOINTS.PACKAGES.GET_ALL);
  },
  createPackage(payload: UpsertSubscriptionPackagePayload) {
    return api.post<SubscriptionPackage>(API_ENDPOINTS.PACKAGES.CREATE, payload);
  },
  updatePackage(id: string, payload: UpsertSubscriptionPackagePayload) {
    return api.put<SubscriptionPackage>(API_ENDPOINTS.PACKAGES.UPDATE(id), payload);
  },
  deletePackage(id: string) {
    return api.delete<void>(API_ENDPOINTS.PACKAGES.DELETE(id));
  },
};
