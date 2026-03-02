export type AllowedFileType = 'image' | 'video' | 'audio' | 'pdf';

export interface SubscriptionPackage {
  id: string;
  name: 'Free' | 'Silver' | 'Gold' | 'Diamond' | string;
  slug?: string;
  description?: string;
  maxFolders: number;
  maxNestingLevel: number;
  maxFileSizeMb: number;
  totalFileLimit: number;
  filesPerFolderLimit: number;
  allowedFileTypes: AllowedFileType[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UpsertSubscriptionPackagePayload {
  name: string;
  description?: string;
  maxFolders: number;
  maxNestingLevel: number;
  maxFileSizeMb: number;
  totalFileLimit: number;
  filesPerFolderLimit: number;
  allowedFileTypes: AllowedFileType[];
}

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UserSubscriptionHistoryItem {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  packageSlug: string;
  startedAt: string;
  endedAt: string | null;
  isActive: boolean;
}
