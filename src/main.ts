import * as Components from './components';
import { registerComponent } from './core/registerComponent';
import './assets/styles/global.scss';
import Block from './core/Block.ts'

Object.entries(Components).forEach(([ name, component ]) => {
  registerComponent(name, component);
});

// Для удобства реализуем роутинг
// Импортируем модули всех страниц
const pages: {[key: string]: typeof Block} = import.meta.glob('./pages/**/*.ts', { eager: true });

// Устанавливаем соответствие между названием файла странички (он же путь) и шаблоном Handlebars
const setPageComponents = () => {
  const pageComponentsMap: { [key: string]: typeof Block } = {};

  for (const item in pages) {
    const key = item.split('/').slice(2, 3).join('');

    pageComponentsMap[key] = Object.values(pages[item])[0];
  }

  return pageComponentsMap;
};
// То, что фактически в адресной строке
// Избавляемся от слеша в начале, чтобы совпадало с ключами pageComponentsMap
const actualPathName = window.location.pathname.substring(1);

// Проверяем существует ли страница с введённым pathname
const checkPath = (): boolean => {
  return Object.keys(setPageComponents()).includes(actualPathName);
};
  
const prepareTemplate = () => {
  const rootContainer = document.querySelector('#app');
  const Component = !actualPathName ? setPageComponents()['index-page'] : setPageComponents()[actualPathName] as typeof Block;
  const component = new Component({});
  const content = component.getContent();
  rootContainer?.append(content!);
};

// Если pathname невалидный, перекидываем на страницу ошибки 404.
// Пустой pathname проверем отдельно, так как он валидный,
// по нему отдаём временную страницу с навигацией
if (!checkPath() && actualPathName !== '') {
  window.location.replace('/error404');
}
    
document.addEventListener('DOMContentLoaded', () => prepareTemplate());
