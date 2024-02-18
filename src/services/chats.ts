import ChatsAPI from '../api/chats';
import apiErrorHandler from '../utils/apiErrorHandler';
import { connectWebSocket } from './messages.ts';

import type { CreateChatRequest, UsersRequest, ChatDeleteRequest } from '../types';

const chatsApi = new ChatsAPI();
const getChats = async () => {
  const res = await chatsApi.getChats() as Record<string,unknown>;
  const data = JSON.parse(res.response as string);

  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  return data;
};
const initMessenger = async () => {
  const chats = await getChats();
  
  if (window.store.getState().chats.length === 0) {
    window.store.set({ chats: chats });
  }
};
const getActiveChat = async (selectedChatId: number) => {
  // Чтобы не отправлять лишний запрос к серверу, берём из стора
  const data = window.store.getState().chats.find(item => item.id === selectedChatId);
  
  if (data) {
    const activeChatUsers = await getChatUsers(selectedChatId);
    
    data.users = activeChatUsers;

    if (data.users && data.users.length > 1) {
      const token = await requestChatToken(selectedChatId);
      data.token = token;
      const userId = window.store.getState().user!.id;
      connectWebSocket(userId, selectedChatId, token, data);
    }
  }

  window.store.set({ activeChat: data });
  
  return data;
};
const createChat = async (data: CreateChatRequest) => {
  const res = await chatsApi.createChat(data) as Record<string, unknown>;

  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  const chats = await getChats();

  window.store.set({ chats: chats });

  return;
};
const getChatUsers = async (id: number) => {
  if (id) {
    const res = await chatsApi.getChatUsers(id) as Record<string, unknown>;
    const data = JSON.parse(res.response as string);
    
    if (res.status !== 200) {
      apiErrorHandler(res);

      return;
    }

    return data;
  }
};
const addUsersToChat = async (data: UsersRequest) => {
  const res = await chatsApi.addUsersToChat(data) as Record<string, unknown>;

  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  const chats = await getChats();
  const activeChat = await getActiveChat(data.chatId);

  window.store.set({ chats: chats, activeChat: activeChat });

  return;
};
const deleteUsersFromChat = async (data: UsersRequest) => {
  const res = await chatsApi.deleteUsersFromChat(data) as Record<string, unknown>;

  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  const chats = await getChats();
  const activeChat = await getActiveChat(data.chatId);

  window.store.set({ chats: chats, activeChat: activeChat });

  return;
};
const deleteChat = async (data: ChatDeleteRequest) => {
  const res = await chatsApi.deleteChat(data) as Record<string, number>;

  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  const chats = await getChats();

  window.store.set({ chats: chats, activeChat: null });

  return;
};
const requestChatToken = async (id: number) => {
  const res = await chatsApi.requestChatToken(id) as Record<string, unknown>;
  const data = JSON.parse(res.response as string);

  if (res.status !== 200) {
    apiErrorHandler(res);

    return;
  }

  return data.token;
};

export {
  getChats,
  initMessenger,
  getActiveChat,
  createChat,
  getChatUsers,
  addUsersToChat,
  deleteUsersFromChat,
  deleteChat,
  requestChatToken
};
