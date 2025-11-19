interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface SignUpRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
  age?: number;
}

export type { User, LoginRequest, SignUpRequest, UpdateUserRequest };