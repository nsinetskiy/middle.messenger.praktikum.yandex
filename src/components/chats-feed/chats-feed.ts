import Block from '../../core/Block';
import template from './chats-feed.hbs?raw';
import './chats-feed.scss';

export class ChatsFeed extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      onsubmit: (event: Event) => {
        const sentData = {
          'search': this.refs.search.value()
        };
        
        event.preventDefault();
        console.log(sentData);
      }
    });
  }

  protected render(): string {
    return (template);
  }
}
