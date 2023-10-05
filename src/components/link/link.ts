import Block from '../../core/Block';
import template from './link.hbs?raw';
import './link.scss';

export class Link extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
