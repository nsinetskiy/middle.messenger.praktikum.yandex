import Block from '../../core/Block';
import template from './form-field.hbs?raw';
import './form-field.scss';

export class FormField extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
