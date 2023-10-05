import Block from '../../core/Block';
import template from './avatar-editor.hbs?raw';
import './avatar-editor.scss';

export class AvatarEditor extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props
    });
  }

  protected render(): string {
    return (template);
  }
}
