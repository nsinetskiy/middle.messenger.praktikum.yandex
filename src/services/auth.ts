import AuthApi from '../api/auth';
import apiErrorHandler from '../utils/apiErrorHandler';
import Router from '../core/Router';

import type { SignupRequest, LoginRequest } from '../types'

const authApi = new AuthApi();
const router = new Router('#app');
const getUserData = async () => {
  const res = await authApi.getUserData() as Record<string, unknown>;
  const data = JSON.parse(res.response as string);

  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  return data;
};
const signup = async (data: SignupRequest) => {
  const res = await authApi.signup(data) as Record<string, unknown>;

  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  const user = await getUserData();

  window.store.set({ user: user });
  router.go('/messenger');

  return;
};
const login = async (data: LoginRequest) => {
  const res = await authApi.login(data) as Record<string, unknown>;

  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  const user = await getUserData();

  window.store.set({user: user});
  router.go('/messenger');

  return;
};
const logout = async () => {
  await authApi.logout();
  window.store.set({user: null, chats: []});
  router.go('/');
};

export {
  getUserData,
  signup,
  login,
  logout
};
