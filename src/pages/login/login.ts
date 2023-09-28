import Block from '../../core/Block';
import template from './login.hbs?raw';

export class Login extends Block {
  constructor() {
    super({})
  }

  protected render(): string {
    return template;
  }
}
