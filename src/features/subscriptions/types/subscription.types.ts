export type AllowedFileType = 'image' | 'video' | 'audio' | 'pdf';

export interface SubscriptionPackage {
  id: string;
  name: 'Free' | 'Silver' | 'Gold' | 'Diamond' | string;
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
