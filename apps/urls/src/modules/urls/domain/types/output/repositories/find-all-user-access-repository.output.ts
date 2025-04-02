export type FindAllUserAccessRepositoryOutput = {
  id: string;
  address: string;
  browserName?: string;
  browserVersion?: string;
  osName?: string;
  osVersion?: string;
  url: {
    id: string;
    originalUrl: string;
    shortId: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}[];
