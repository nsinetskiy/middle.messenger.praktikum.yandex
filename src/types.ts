import WSTransport from "./core/WSTransport";

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export type Message = {
  reverse(): Message[] | undefined;
  chat_id: number;
  content: string;
  file?: string;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
};

export type LastMessage = {
  content: string;
  id: number;
  time: string;
  user: User;
};

export type Chat = {
  id: number;
  title: string;
  avatar: Nullable<string>;
  unreadCount: number;
  lastMessage: LastMessage | null;
  users?: ChatUser[];
  token?: string;
  messages?: Message[];
};

export type CurrentChat = {
  id: number;
  title: string;
  avatar: Nullable<string>;
  created_by?: number;
  last_message?: LastMessage;
  token?: string;
  messages?: Message[];
  webSocket?: WSTransport;
};

export type AppState = {
  error: string | null;
  user: User | null;
  activeChat: CurrentChat | null;
  chats: Chat[];
};

export type SignupRequest = Omit<User, 'id' | 'display_name' | 'avatar'> & {
  password: string;
};

export type ChatUser = Omit<User, 'id' | 'display_name'>;

export type SignupResponse = {
  id: number;
};

export type LoginRequest = {
  login: string;
  password: string;
};

export type UserUpdateRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type APIError = {
  reason: string;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type CreateChatRequest = {
  title: string;
};

export type UsersRequest = {
  users: number[];
  chatId: number;
};

export type ChatDeleteRequest = {
  chatId: number;
};
