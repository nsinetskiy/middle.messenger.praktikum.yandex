import Block from '../../core/Block';
import template from './error-text.hbs?raw';
import './error-text.scss';

export class ErrorText extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
