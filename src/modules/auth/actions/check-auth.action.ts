import { tesloApi } from '@/api/teslo.api';
import { isAxiosError } from 'axios';
import type { IAuthResponse, ICheckError, ICheckSuccess } from '../interfaces';

export const checkAuthAction = async (): Promise<ICheckSuccess | ICheckError> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token || token.length < 10) return { ok: false };

    const { data } = await tesloApi.get<IAuthResponse>('/auth/check-status');
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return { ok: false };
    }
    throw new Error('Check auth action failed');
  }
};
