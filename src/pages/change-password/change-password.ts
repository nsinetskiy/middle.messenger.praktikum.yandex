import Block from '../../core/Block';
import template from './change-password.hbs?raw';
import * as validators from '../../utils/validators';

export class ChangePassword extends Block {
  constructor() {
    super({
      validate: {
        password: validators.password
      },
      onsubmit: (event: Event) => {
        const sentData = {
          'oldPassword': this.refs.oldPassword.value(),
          'newPassword': this.refs.newPassword.value(),
          'newPasswordAgain': this.refs.newPasswordAgain.value()
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
