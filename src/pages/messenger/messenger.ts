import Block from '../../core/Block';
import { initMessenger } from '../../services/chats';
import template from './messenger.hbs?raw';

export class Messenger extends Block {
  constructor() {
    super({
      feed: window.store.getState().chats,
      currentChat: window.store.getState().activeChat,
      user: window.store.getState().user
    });
    initMessenger();
  }

  protected render(): string {
    return template;
  }
}
