import axiosInstance from './axiosInstance';
import type { LoginRequest, SignUpRequest } from '@/types/user';

const postLogin = async (data: LoginRequest) => {
  const response = await axiosInstance.post('/api/v1/auth/login', data);
  return response.data;
};

const postSignUp = async (data: SignUpRequest) => {
  const response = await axiosInstance.post('/api/v1/users', data);
  return response.data;
};

export { postLogin, postSignUp };