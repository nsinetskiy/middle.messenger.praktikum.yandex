import Block from '../../core/Block';
import template from './chat-name.hbs?raw';
import './chat-name.scss';

export class ChatName extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
