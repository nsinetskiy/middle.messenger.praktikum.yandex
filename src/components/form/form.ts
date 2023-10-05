import Block from '../../core/Block';
import template from './form.hbs?raw';
import './form.scss';

export class Form extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
    this.props.events = {
      submit: this.props.onsubmit
    }
  }

  protected render(): string {
    return (template);
  }
}
