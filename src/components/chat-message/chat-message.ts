import Block from '../../core/Block';
import timeFormatConverter from '../../utils/timeFormatConverter'
import template from './chat-message.hbs?raw';
import './chat-message.scss';

export class ChatMessage extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
    this.props.mod = this.props.user_id === window.store.getState().user?.id ? 'sent' : 'received';
    this.props.time = timeFormatConverter(this.props.time as string);
  }

  protected render(): string {
    return (template);
  }
}
