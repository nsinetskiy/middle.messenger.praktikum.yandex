import Block from '../../core/Block';
import template from './button.hbs?raw';
import './button.scss';

export class Button extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
