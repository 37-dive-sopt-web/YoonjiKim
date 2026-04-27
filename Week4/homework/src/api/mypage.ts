import axiosInstance from './axiosInstance';
import type { UpdateUserRequest } from '@/types/user';

const getUserInfo = async (id: number) => {
  const response = await axiosInstance.get(`/api/v1/users/${id}`);
  return response.data;
};

const updateUserInfo = async (id: number, data: UpdateUserRequest) => {
  const response = await axiosInstance.patch(`/api/v1/users/${id}`, data);
  return response.data;
};

const deleteUserInfo = async (id: number) => {
  const response = await axiosInstance.delete(`/api/v1/users/${id}`);
  return response.data;
};

export { getUserInfo, updateUserInfo, deleteUserInfo };