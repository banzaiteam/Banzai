import {baseApi} from '@/shared/api/baseApi';
import type {LoginResponse, LoginRequest, LoginOutRequest} from '../model/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginIn: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    loginOut: build.mutation<any, LoginOutRequest>({
      query: (credentials) => ({
        url: 'auth/logout',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginInMutation, useLoginOutMutation} = authApi;