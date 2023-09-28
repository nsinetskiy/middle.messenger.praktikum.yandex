import Block from '../../core/Block';
import template from './change-password.hbs?raw';

export class ChangePassword extends Block {
  constructor() {
    super({})
  }

  protected render(): string {
    return template;
  }
}
