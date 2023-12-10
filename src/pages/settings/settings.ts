import Block from '../../core/Block';
import template from './settings.hbs?raw';
import { data } from '../../data';
import * as validators from '../../utils/validators';

export class Settings extends Block {
  constructor() {
    super({
      profile: data.settings,
      validate: {
        name: validators.name,
        login: validators.login,
        email: validators.email,
        phone: validators.phone
      },
      onsubmit: (event: Event) => {
        const sentData = {
          'first_name': this.refs.first_name.value(),
          'second_name': this.refs.second_name.value(),
          'display_name': this.refs.display_name.value(),
          'login': this.refs.login.value(),
          'email': this.refs.email.value(),
          'phone': this.refs.phone.value()
        };
        
        event.preventDefault();
        console.log(sentData);
      }
    })
  }

  protected render(): string {
    return template;
  }
}
