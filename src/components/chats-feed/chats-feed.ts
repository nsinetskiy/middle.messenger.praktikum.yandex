import Block from '../../core/Block';
import template from './chats-feed.hbs?raw';
import './chats-feed.scss';

export class ChatsFeed extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
