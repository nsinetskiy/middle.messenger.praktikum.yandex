import Block from '../../core/Block';
import template from './current-chat.hbs?raw';
import './current-chat.scss';

export class CurrentChat extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
