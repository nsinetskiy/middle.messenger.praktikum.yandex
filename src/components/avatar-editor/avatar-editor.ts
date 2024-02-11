import Block from '../../core/Block';
import { changeUserAvatar } from '../../services/settings';
// import { BASE_URL } from '../../../constants';
import template from './avatar-editor.hbs?raw';
import './avatar-editor.scss';

export class AvatarEditor extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      getAvatarSrc:  () => {
        const avatar = window.store.getState().user?.avatar;

        return avatar ? `${window.store.getState().user?.avatar}` : null
      },
      openDialog: () => {
        const dialog = this.refs.dialog.getContent() as HTMLDialogElement;

        dialog.showModal();
      },
      onsubmit: (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        changeUserAvatar(formData).catch(error => this.refs.alert.setProps({ text: error }));
        event.preventDefault();
      }
    });
  }

  protected render(): string {
    return (template);
  }
}
