import * as Components from './components';
import * as Pages from './pages';
import { registerComponent } from './core/registerComponent';
import './assets/styles/global.scss';
import Store from './core/Store';
import Router from './core/Router';
import { initApp } from './services/init';

import type { AppState } from './types';

declare global {
  interface Window {
    store: Store<AppState>;
  }

  type Nullable<T> = T | null;
}

const initState: AppState = {
  error: null,
  user: null,
  activeChat: null,
  chats: []
};  
const prepareTemplate = () => {
  const router = new Router('#app');
  
  router
    .use('/', Pages.Login)
    .use('/sign-up', Pages.Signup)
    .use('/messenger', Pages.Messenger)
    .use('/settings', Pages.Settings)
    .use('/change-password', Pages.ChangePassword)
    .use('/error404', Pages.Error404)
    .use('/error500', Pages.Error500)
    .start();
};

Object.entries(Components).forEach(([ name, component ]) => {
  registerComponent(name, component);
});
window.store = new Store<AppState>(initState);
document.addEventListener('DOMContentLoaded', () => {
  prepareTemplate();
  initApp();
});
