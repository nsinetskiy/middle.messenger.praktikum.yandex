import Block from '../../core/Block';
import template from './message-time.hbs?raw';
import './message-time.scss';

export class MessageTime extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
