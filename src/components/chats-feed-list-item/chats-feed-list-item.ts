import { Block } from '../../core/Block';
import { closeWebSocketConnection } from '../../services/messages';
import { getActiveChat } from '../../services/chats';
import timeFormatConverter from '../../utils/timeFormatConverter'

import type { LastMessage } from '../../types';

import template from './chats-feed-list-item.hbs?raw';
import './chats-feed-list-item.scss';

export class ChatsFeedListItem extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      events: {
        click: () => {
          closeWebSocketConnection();
          getActiveChat(this.props.id as number);
          // this.props.unread_count = 0;
        }
      }
    });
    this.props.isActive = window.store.getState().activeChat?.id === this.props.id;
    this.props.fromMe = () => {
      const lastMessageProps = this.props.last_message as LastMessage;
      
      return window.store.getState().user?.login === lastMessageProps?.user.login;
    };
    this.props.time = () => {
      if (this.props.last_message) {
        const lastMessage = this.props.last_message as Record<string, string>;
        
        return timeFormatConverter(lastMessage.time)
      } else {
        return;
      }
    };
  }

  protected render(): string {
    return template;
  }
}
