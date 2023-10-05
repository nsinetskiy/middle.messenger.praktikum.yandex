import Block from '../../core/Block';
import template from './signup.hbs?raw';
import * as validators from '../../utils/validators';

export class Signup extends Block {
  constructor() {
    super({
      validate: {
        name: validators.name,
        login: validators.login,
        email: validators.email,
        password: validators.password,
        phone: validators.phone
      },
      onsubmit: (event: Event) => {
        const sentData = {
          'first_name': this.refs.first_name.value(),
          'second_name': this.refs.second_name.value(),
          'login': this.refs.login.value(),
          'email': this.refs.email.value(),
          'password': this.refs.password.value(),
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
