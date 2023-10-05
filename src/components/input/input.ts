import Block from '../../core/Block';
import template from './input.hbs?raw';
import './input.scss';

export class Input extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
    this.props.events = {
      blur: this.props.onblur
    }
  }

  protected render(): string {
    return (template);
  }
}
