import Router from '../core/Router';

const router = new Router('#app');
const apiErrorHandler = (response: Record<string, unknown>) => {
  const reason = JSON.parse(response.response as string);

  if (response.status === 500) {
    router.go('/error500');
  } else {
    throw new Error(reason.reason);
  }
};

export default apiErrorHandler;
