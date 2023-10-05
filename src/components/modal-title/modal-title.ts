import Block from '../../core/Block';
import template from './modal-title.hbs?raw';
import './modal-title.scss';

export class ModalTitle extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
