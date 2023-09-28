import Block from '../../core/Block';
import template from './index-page.hbs?raw'
import { data } from '../../data';

export class IndexPage extends Block {
  constructor() {
    super({
      navlinks: data.navlinks,
      title: 'Когда-нибудь здесь будет красивая главная страница',
      description: 'А пока отсюда можно перейти на страницы, которые есть сейчас'
    })
  }

  protected render(): string {
    return template;
  }
}
