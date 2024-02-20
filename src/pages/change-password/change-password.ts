import Block from '../../core/Block';
import { changeUserPassword } from '../../services/settings';
import Router from '../../core/Router';
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
          'oldPassword': this.refs.oldPassword.value()!,
          'newPassword': this.refs.newPassword.value()!,
          'newPasswordAgain': this.refs.newPasswordAgain.value()
        };
        
        event.preventDefault();
        if (sentData.newPassword === sentData.newPasswordAgain) {
          changeUserPassword(sentData).then(result => this.refs.alert.setProps({ text: result })).catch(error => this.refs.alert.setProps({ text: error }));
        } else {
          this.refs.alert.setProps({ text: 'Пароли не совпадают' });
        }
      },
      goBack: () => {
        const router = new Router('#app');
        
        router.back();
      },
    })
  }

  protected render(): string {
    return template;
  }
}
