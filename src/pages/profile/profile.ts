import Block from '../../core/Block';
import template from './profile.hbs?raw';
import { data } from '../../data';

export class Profile extends Block {
  constructor() {
    super({
      profile: data.profile
    })
  }

  protected render(): string {
    return template;
  }
}
