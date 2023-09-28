import Block from '../../core/Block';
import template from './chats.hbs?raw';
import { data } from '../../data';

export class Chats extends Block {
  constructor() {
    super({
      feed: data.chats.feed,
      currentChat: data.chats.currentChat
    })
  }

  protected render(): string {
    return template;
  }
}
