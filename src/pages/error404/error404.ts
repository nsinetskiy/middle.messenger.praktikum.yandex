import Block from '../../core/Block';
import template from './error404.hbs?raw';

export class Error404 extends Block {
  constructor() {
    super({})
  }

  protected render(): string {
    return template;
  }
}
