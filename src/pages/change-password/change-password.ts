import Block from '../../core/Block';
import template from './change-password.hbs?raw';

export class ChangePassword extends Block {
  constructor() {
    super({
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
