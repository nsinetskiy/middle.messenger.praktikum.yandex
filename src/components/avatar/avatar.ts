import Block from '../../core/Block';
import { BASE_URL } from '../../../constants';
import template from './avatar.hbs?raw';
import './avatar.scss';

export class Avatar extends Block {
  constructor(props: Record<string, string>) {
    super({
      ...props,
      baseUrl: BASE_URL
    });
  }

  protected render(): string {
    return (template);
  }
}
