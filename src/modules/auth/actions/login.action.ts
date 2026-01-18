import { tesloApi } from '@/api/teslo.api';
import { isAxiosError } from 'axios';
import type { IAuthResponse, ILoginResponse } from '../interfaces';

export const loginAction = async (email: string, password: string): Promise<ILoginResponse> => {
  try {
    const { data } = await tesloApi.post<IAuthResponse>('/auth/login', { email, password });
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Invalid credentials',
      };
    }
    throw new Error('Login action failed');
  }
};
