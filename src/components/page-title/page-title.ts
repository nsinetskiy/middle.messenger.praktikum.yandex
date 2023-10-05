import Block from '../../core/Block';
import template from './page-title.hbs?raw';
import './page-title.scss';

export class PageTitle extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
