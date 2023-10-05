import Block from '../../core/Block';
import template from './root.hbs?raw';
import './root.scss';

export class Root extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
