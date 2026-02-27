import { api } from '../../../core/api/api-client';
import { API_ENDPOINTS } from '../../../core/api/endpoints';

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface FolderItem {
  id: string;
  name: string;
  depth: number;
  parentId?: string | null;
  createdAt?: string;
}

export interface FileItem {
  id: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  folderId: string;
  createdAt?: string;
}

export const storageService = {
  async getFolders() {
    const response = await api.get<ApiEnvelope<FolderItem[]>>(API_ENDPOINTS.FOLDERS.LIST);
    return response?.data ?? [];
  },

  async createFolder(payload: { name: string; parentId?: string | null }) {
    return api.post<ApiEnvelope<FolderItem>>(API_ENDPOINTS.FOLDERS.CREATE, payload);
  },

  async deleteFolder(id: string) {
    return api.delete<ApiEnvelope<null>>(API_ENDPOINTS.FOLDERS.DELETE(id));
  },

  async getFiles() {
    const response = await api.get<ApiEnvelope<FileItem[]>>(API_ENDPOINTS.FILES.LIST);
    return response?.data ?? [];
  },

  async deleteFile(id: string) {
    return api.delete<ApiEnvelope<null>>(API_ENDPOINTS.FILES.DELETE(id));
  },
};
