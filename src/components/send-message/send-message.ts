import Block from '../../core/Block';
import template from './send-message.hbs?raw';
import './send-message.scss';

export class SendMessage extends Block {
  constructor() {
    super({});
  }

  protected render(): string {
    return (template);
  }
}
