import { Block } from '../../core/Block';
import { getActiveChat } from '../../services/chats';
import template from './chats-feed-list-item.hbs?raw';
import './chats-feed-list-item.scss';

export class ChatsFeedListItem extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      events: {
        click: () => {
          getActiveChat(this.props.id as number);
        }
      }
    });
    this.props.isActive = window.store.getState().activeChat?.id === this.props.id
  }

  protected render(): string {
    return template;
  }
}
