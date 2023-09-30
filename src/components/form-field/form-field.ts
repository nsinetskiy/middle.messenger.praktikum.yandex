import Block from '../../core/Block';
import template from './form-field.hbs?raw';
import './form-field.scss';

export class FormField extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      onblur: () => this.props.type !== 'submit' && this.validate()
    });
  }

  public value() {
    return (this.refs.input.element as HTMLInputElement)?.value || '';
  }

  private validate() {
    const value = (this.refs.input.element as HTMLInputElement).value;
    const errorText = (this.props.validate as (arg: string) => string)(value);

    if (errorText) {
      this.setProps({ errorText });
    } else {
      this.setProps({ errorText: null });
      this.setProps({value: value});
    }
    
  }

  protected render(): string {
    return (template);
  }
}
