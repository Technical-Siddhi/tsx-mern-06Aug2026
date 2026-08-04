import axiosClient from '../api/axiosClient';
import { ApiResponse, User } from '../types';

export const authService = {
  async getProfile(): Promise<ApiResponse<User>> {
    const response = await axiosClient.get<ApiResponse<User>>('/auth/profile');
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  },
};

export default authService;
