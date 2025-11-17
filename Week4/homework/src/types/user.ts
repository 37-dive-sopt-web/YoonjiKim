export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface SignupRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  age: number;
}

export interface DeleteUserRequest {
  id: string;
} 