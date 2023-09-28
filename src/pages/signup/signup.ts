import Block from '../../core/Block';
import template from './signup.hbs?raw';

export class Signup extends Block {
  constructor() {
    super({})
  }

  protected render(): string {
    return template;
  }
}
