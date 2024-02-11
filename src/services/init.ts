import { getUserData } from './auth';
import { getChats } from './chats';
import Router from '../core/Router';

const router = new Router('#app');

const initApp = async () => {
  const currentRoute = router.currentRoute();
  let user = null;
  let chats = [];

  try {
    user = await getUserData();
    chats = await getChats();
    window.store.set({ user: user, chats: chats });
    
    if (currentRoute === '/') {
      router.go('/messenger');
      router.history.replaceState({}, '', '/messenger');
    }
  } catch (error) {

    switch(currentRoute) {
    case '/sign-up':
      break;
    case '/error404':
      break;
    case '/error500': 
      break;
    default:
      router.go('/');

      return;
    }

  }
};

export {
  initApp
};
