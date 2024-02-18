import Block from '../../core/Block';
import template from './settings.hbs?raw';
import * as validators from '../../utils/validators';
import { changeUserProfile } from '../../services/settings';
import Router from '../../core/Router';
import { logout } from '../../services/auth';
import { StoreEvents } from '../../core/Store';

export class Settings extends Block {
  constructor() {
    super({
      profile: window.store.getState().user,
      validate: {
        name: validators.name,
        login: validators.login,
        email: validators.email,
        phone: validators.phone
      },
      onsubmit: (event: Event) => {
        const sentData = {
          'first_name': this.refs.first_name.value()!,
          'second_name': this.refs.second_name.value()!,
          'display_name': this.refs.display_name.value()!,
          'login': this.refs.login.value()!,
          'email': this.refs.email.value()!,
          'phone': this.refs.phone.value()!
        };
        
        event.preventDefault();
        changeUserProfile(sentData).catch(error => this.refs.alert.setProps({ text: error }));
      },
      goBack: () => {
        const router = new Router('#app');
        
        router.back();
      },
      logout: logout
    })
    window.store.on(StoreEvents.Updated, () => {
      this.setProps({
        profile: window.store.getState().user
      });
    });
  }

  protected render(): string {
    return template;
  }
}
