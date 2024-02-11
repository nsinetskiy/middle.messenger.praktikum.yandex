import Block from '../../core/Block';
import template from './error404.hbs?raw';
import Router from '../../core/Router';

export class Error404 extends Block {
  constructor() {
    super({
      goToChats: () => {
        const router = new Router('#app');
        const user = window.store.getState().user;

        if (user) {
          router.go('/messenger');
        } else {
          router.go('/');
        }
      }
    })
  }

  protected render(): string {
    return template;
  }
}
