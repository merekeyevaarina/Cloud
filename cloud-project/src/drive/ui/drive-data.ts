export type DriveFolder = {
  id: string;
  name: string;
  fileCount: string;
  updatedAt: string;
};

export type DriveFile = {
  id: string;
  name: string;
  mime_type: string;
  size_bytes: bigint;
  created_at: Date;
  folder_id: string | null;
};



export const storageUsage = {
  used: "6,4 ГБ",
  total: "15 ГБ",
  percent: 43,
};
