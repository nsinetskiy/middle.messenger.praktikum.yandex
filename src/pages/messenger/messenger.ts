import Block from '../../core/Block';
import template from './messenger.hbs?raw';
import { data } from '../../data';

export class Messenger extends Block {
  constructor() {
    super({
      feed: data.messenger.feed,
      currentChat: data.messenger.currentChat
    })
  }

  protected render(): string {
    return template;
  }
}
