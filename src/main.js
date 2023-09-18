import Handlebars from 'handlebars';
import { data } from './data.js';
import * as Components from './components';
import './assets/styles/global.scss';

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

// Для удобства реализуем роутинг
// Импортируем модули всех страниц
const pages = import.meta.glob('./pages/**/*.js', { eager: true });

// Устанавливаем соответствие между названием файла странички (он же путь) и шаблоном Handlebars
const setPageComponents = () => {
  const pageComponentsMap = {};

  for (const item in pages) {
    let key = item.split('/').slice(2, 3).join('');

    pageComponentsMap[key] = Object.values(pages[item])[0];
  }

  return pageComponentsMap;
};
// То, что фактически в адресной строке
// Избавляемся от слеша в начале, чтобы совпадало с ключами pageComponentsMap
const actualPathName = window.location.pathname.substring(1);

// Проверяем существует ли страница с введённым pathname
const checkPath = () => {
  return Object.keys(setPageComponents()).includes(actualPathName);
};
  
const prepareTemplate = () => {
  const rootContainer = document.querySelector('#app');
  let context = data;
     
  rootContainer.innerHTML = !actualPathName ? Handlebars.compile(setPageComponents()['index'])(context) : Handlebars.compile(setPageComponents()[actualPathName])(context);
};

// Если pathname невалидный, перекидываем на страницу ошбки 404.
// Пустой pathname проверем отдельно, так как он валидный,
// по нему отдаём временную страницу с навигацией
if (!checkPath() && actualPathName !== '') {
  window.location.replace('/error404');
}
    
document.addEventListener('DOMContentLoaded', () => prepareTemplate());
