import Block from '../../core/Block';
import template from './chat-message.hbs?raw';
import './chat-message.scss';

export class ChatMessage extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
