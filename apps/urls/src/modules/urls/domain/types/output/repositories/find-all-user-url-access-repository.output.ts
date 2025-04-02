export type FindAllUserUrlAccessRepositoryOutput = {
  id: string;
  address: string;
  browserName?: string;
  browserVersion?: string;
  osName?: string;
  osVersion?: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}[];
