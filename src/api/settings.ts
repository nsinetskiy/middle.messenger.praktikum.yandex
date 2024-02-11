import HTTPTransport from '../core/HTTPTransport';
import { UserUpdateRequest, ChangePasswordRequest } from '../types';
import { BASE_URL } from '../../constants';

class SettingsAPI {
  private httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport();
  }

  async changeUserProfile(data: UserUpdateRequest) {
    return this.httpTransport.put(`${BASE_URL}/user/profile`, { data });
  }

  async changeUserAvatar(data: FormData) {
    return this.httpTransport.put(`${BASE_URL}/user/profile/avatar`, { data });
  }

  async changeUserPassword(data: ChangePasswordRequest) {
    return this.httpTransport.put(`${BASE_URL}/user/password`, { data });
  }
}

export default SettingsAPI;
