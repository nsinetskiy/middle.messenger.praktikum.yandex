import Block from '../../core/Block';
import template from './login.hbs?raw';
import * as validators from '../../utils/validators';
import { login } from '../../services/auth';

export class Login extends Block {
  constructor() {
    super({
      validate: {
        login: validators.login,
        password: validators.password
      },
      onsubmit: (event: Event) => {
        const sentData = {
          login: this.refs.login.value()!,
          password: this.refs.password.value()!
        };
        
        event.preventDefault();
        login(sentData).catch(error => this.refs.alert.setProps({ text: error }));
      }
    })
  }

  protected render(): string {
    return template;
  }
}
