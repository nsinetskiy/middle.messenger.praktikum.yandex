import HTTPTransport from '../core/HTTPTransport';
import { SignupRequest, LoginRequest } from '../types';
import { BASE_URL } from '../../constants';

class AuthAPI {
  private httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport();
  }

  async signup(data: SignupRequest) {
    return this.httpTransport.post(`${BASE_URL}/auth/signup`, { data });
  }

  async login(data: LoginRequest) {
    return this.httpTransport.post(`${BASE_URL}/auth/signin`, { data });
  }

  async getUserData() {
    return this.httpTransport.get(`${BASE_URL}/auth/user`);
  }

  async logout() {
    return this.httpTransport.post(`${BASE_URL}/auth/logout`);
  }
}

export default AuthAPI;
