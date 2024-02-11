import SettingsAPI from '../api/settings';
import apiErrorHandler from '../utils/apiErrorHandler';

import type { UserUpdateRequest, ChangePasswordRequest } from '../types';

const settingsApi = new SettingsAPI();
const changeUserProfile = async (data: UserUpdateRequest) => {
  const res = await settingsApi.changeUserProfile(data) as Record<string, unknown>;
  const updatedUserData = JSON.parse(res.response as string);

  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  window.store.set({ user: updatedUserData });
};
const changeUserAvatar = async (data: FormData) => {
  const res = await settingsApi.changeUserAvatar(data) as Record<string, unknown>;
  const updatedUserData = JSON.parse(res.response as string);

  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  window.store.set({ user: updatedUserData });
};
const changeUserPassword = async (data: ChangePasswordRequest) => {
  const res = await settingsApi.changeUserPassword(data) as Record<string, unknown>;
  
  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  return 'Пароль успешно изменён';
};

export {
  changeUserProfile,
  changeUserAvatar,
  changeUserPassword
};
