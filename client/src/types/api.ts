export type ApiListResponse<T> = {
  status: string;
  results: number;
  data: T[];
};

export type ApiOneResponse<T> = {
  status: string;
  data: T;
};

export type Project = {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  summary: string;
  description?: string;
  highlights?: string[];
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
  featured?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
};