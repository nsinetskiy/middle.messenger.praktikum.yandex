import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { createChat } from '../../services/chats';
import { StoreEvents } from '../../core/Store';
import template from './chats-feed.hbs?raw';
import './chats-feed.scss';

export class ChatsFeed extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      validate: {
        chatName: validators.chatName
      },
      openCreateChatDialog: () => {
        const dialog = this.refs.createChatDialog.getContent() as HTMLDialogElement;

        dialog.showModal();
      },
      createChat: (event: Event) => {
        const sentData = {
          title: this.refs.title.value()!
        };

        event.preventDefault();
        createChat(sentData).catch(error => this.refs.alert.setProps({ text: error }));
      }
    });
    window.store.on(StoreEvents.Updated, () => {
      this.setProps({
        feed: window.store.getState().chats
      });
    });
  }

  protected render(): string {
    return (template);
  }
}
