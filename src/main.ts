import * as Components from './components';
import * as Pages from './pages';
import { registerComponent } from './core/registerComponent';
import './assets/styles/global.scss';
import Router from './core/Router.ts'

Object.entries(Components).forEach(([ name, component ]) => {
  registerComponent(name, component);
});
  
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
    .start()
};
    
document.addEventListener('DOMContentLoaded', () => prepareTemplate());
