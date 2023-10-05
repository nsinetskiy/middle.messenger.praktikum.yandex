import Block from '../../core/Block';
import template from './avatar.hbs?raw';
import './avatar.scss';

export class Avatar extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
