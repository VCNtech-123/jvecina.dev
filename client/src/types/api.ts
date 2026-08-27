export type ApiResponse<T> = {
  status: string;
  data: T;
  results?: number;
};

export type Project = {
  id?: string;
  _id?: string;
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
};

export type Message = {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  readAt?: string | null;
  createdAt?: string;
};

export type Admin = {
  id?: string;
  _id?: string;
  email: string;
  name?: string;
};