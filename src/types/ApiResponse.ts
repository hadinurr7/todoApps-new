export interface GeneralResponse {
  status: number;
  message: string;
}

export interface Pagination {
  totalPage: number;
  totalData: number;
  page: number;
}

export interface RegisterResponse extends GeneralResponse {
  data: {};
}

export interface LoginResponse extends GeneralResponse {
  data: {
    username?: string;
    email?: string
    token: string;
  };
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  assigneeId?: number;
  creatorId: number
}

// types/ApiResponse.ts
export interface TodoResponse extends GeneralResponse {
  data: Todo | Record<string, never>;
}

