import Block from '../../core/Block';
import Router from '../../core/Router';
import template from './link.hbs?raw';
import './link.scss';

export class Link extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
    this.element?.addEventListener('click', (event: Event) => {
      const router = new Router('#app');

      event.preventDefault();
      router.go(props.href);
    });
  }

  protected render(): string {
    return (template);
  }
}
