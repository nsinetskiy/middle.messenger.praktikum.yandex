import Block from '../../core/Block';
import template from './textarea.hbs?raw';
import './textarea.scss';

export class Textarea extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      onblur: () => this.validate()
    });
  }

  public value() {
    return (this.element as HTMLInputElement)?.value || '';
  }

  private validate() {
    const value = (this.element as HTMLInputElement).value || '';
    const errorText = (this.props.validate as (arg: string) => string)(value) || '';

    if (errorText) {
      console.log(errorText);
    }
    
  }

  protected render(): string {
    return (template);
  }
}
