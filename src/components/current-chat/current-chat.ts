import Block from '../../core/Block';
import template from './current-chat.hbs?raw';
import './current-chat.scss';
import * as validators from '../../utils/validators';

export class CurrentChat extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      validate: {
        message: validators.message
      },
      onsubmit: (event: Event) => {
        const sentData = {
          'message': this.refs.message.value()
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
