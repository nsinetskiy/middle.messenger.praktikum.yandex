import Block from '../../core/Block';
import template from './signup-link.hbs?raw';
import './signup-link.scss';

export class SignupLink extends Block {
  constructor() {
    super({})
  }

  protected render(): string {
    return (template);
  }
}
