import Block from '../../core/Block';
import template from './dialog.hbs?raw';
import './dialog.scss';

export class Dialog extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      closeDialog: () => {
        const dialog = this.getContent() as HTMLDialogElement;

        dialog.close();
      }
    });
  }

  protected render(): string {
    return template;
  }
}
