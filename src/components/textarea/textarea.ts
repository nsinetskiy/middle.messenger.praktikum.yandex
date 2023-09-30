import Block from '../../core/Block';
import template from './textarea.hbs?raw';
import './textarea.scss';

export class Textarea extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  public value() {
    return (this.element as HTMLInputElement)?.value || '';
  }

  protected render(): string {
    return (template);
  }
}
