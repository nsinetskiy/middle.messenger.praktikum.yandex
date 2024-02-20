import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { addUsersToChat, deleteChat } from '../../services/chats';
import { StoreEvents } from '../../core/Store';
import { sendMessage } from '../../services/messages';
import template from './current-chat.hbs?raw';
import './current-chat.scss';

export class CurrentChat extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      validate: {
        chatUserId: validators.chatUserId
      },
      openAddUserDialog: () => {
        const dialog = this.refs.addUserDialog.getContent() as HTMLDialogElement;

        dialog.showModal();
      },
      addUser: (event: Event) => {
        event.preventDefault();
        const sentData = {
          users: [Number(this.refs.userid.value())!],
          chatId: window.store.getState().activeChat!.id
        };

        addUsersToChat(sentData).catch(error => alert(error));
      },
      deleteChat: () => {
        const sentData = {
          chatId: window.store.getState().activeChat!.id
        };

        deleteChat(sentData).catch(error => alert(error));
      },
      onsubmit: (event: Event) => {
        const messageField = this.refs.message.getContent() as HTMLTextAreaElement;
        const sentData = {
          'message': messageField.value
        };
        
        event.preventDefault();
        sendMessage(sentData.message);
        messageField!.value = '';
      }
    });
    this.props.isAdmin = () => {
      return window.store.getState().user?.id === window.store.getState().activeChat?.created_by;
    }
    this.props.messages = () => {
      window.store.getState().activeChat?.messages;
    };
    window.store.on(StoreEvents.Updated, () => {
      this.setProps({
        currentChat: window.store.getState().activeChat,
        messages: window.store.getState().activeChat?.messages
      });
    });
  }

  protected render(): string {
    return template;
  }
}
