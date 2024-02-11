import HTTPTransport from '../core/HTTPTransport';
import { CreateChatRequest, UsersRequest, ChatDeleteRequest } from '../types';
import { BASE_URL } from '../../constants';

class ChatsAPI {
  private httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport();
  }

  async getChats() {
    return this.httpTransport.get(`${BASE_URL}/chats`);
  }

  async createChat(data: CreateChatRequest) {
    return this.httpTransport.post(`${BASE_URL}/chats`, { data });
  }

  async getChatUsers(id: number) {
    return this.httpTransport.get(`${BASE_URL}/chats/${id}/users`);
  }

  async addUsersToChat(data: UsersRequest) {
    return this.httpTransport.put(`${BASE_URL}/chats/users`, { data });
  }

  async deleteUsersFromChat(data: UsersRequest) {
    return this.httpTransport.delete(`${BASE_URL}/chats/users`, { data });
  }

  async deleteChat(data: ChatDeleteRequest) {
    return this.httpTransport.delete(`${BASE_URL}/chats`, { data });
  }
}

export default ChatsAPI;
