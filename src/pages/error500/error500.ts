import Block from '../../core/Block';
import template from './error500.hbs?raw';

export class Error500 extends Block {
  constructor() {
    super({})
  }

  protected render(): string {
    return template;
  }
}
