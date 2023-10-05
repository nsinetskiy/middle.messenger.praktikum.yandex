import Block from '../../core/Block';
import template from './wrapper.hbs?raw';
import './wrapper.scss';

export class Wrapper extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
