// auth 관련 요청 타입
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

// user 관련 타입
interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
}

// user 정보 patch용 요청 타입
interface UpdateUserRequest {
  name?: string;
  email?: string;
  age?: number;
}

export type { User, LoginRequest, SignUpRequest, UpdateUserRequest };