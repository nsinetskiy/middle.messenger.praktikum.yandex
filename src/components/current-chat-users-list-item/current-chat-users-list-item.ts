import { Block } from '../../core/Block';
import { deleteUsersFromChat } from '../../services/chats';
import template from './current-chat-users-list-item.hbs?raw';
import './current-chat-users-list-item.scss';

export class CurrentChatUsersListItem extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      deleteUser: () => {
        const sentData = {
          users: [Number(this.props.id)],
          chatId: window.store.getState().activeChat!.id
        };

        deleteUsersFromChat(sentData).catch(error => alert(error));
      }
    });
    this.props.isAdmin = this.props.role === 'admin';
  }

  protected render(): string {
    return template;
  }
}
