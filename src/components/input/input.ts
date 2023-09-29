import Block from '../../core/Block';
import template from './input.hbs?raw';
import './input.scss';

export class Input extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
