export type FindAllUserAccessOutput = {
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
  };
  createdAt: Date;
}[];
