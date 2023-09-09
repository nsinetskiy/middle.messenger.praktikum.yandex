export const data = {
  profile: {
    firstName: 'Никита',
    lastName: 'Синецкий',
    displayName: 'nsinetskiy',
    login: 'myLogin',
    email: 'nsinetskiy@someemail.ru',
    phone: '+71234567890'
  },
  chats: {
    feed: [
      {
        name: 'Вася',
        avatar: '',
        time: '19:35',
        fromMe: true,
        text: 'Привет! Круто, поздравляю!',
        isActive: true
      },
      {
        name: 'Нед старк',
        avatar: '',
        time: '18:50',
        text: 'Зима близко'
      },
      {
        name: 'Гарланд Бриггс',
        avatar: '',
        time: '16:00',
        text: 'Совы - не то, чем кажутся'
      },
      {
        name: 'Новости',
        avatar: '',
        time: '14:58',
        text: 'Открытие третьего диаметра стало значимым событием для жителей Зеленограда и Раменского',
        unread: 8
      },
      {
        name: 'Терминатор',
        avatar: '',
        time: '10:00',
        text: 'Я вернусь'
      },
      {
        name: 'Джон Смит',
        avatar: '',
        time: '20.08.23',
        text: 'Добравшись до конца, начинаешь думать о начале'
      },
      {
        name: 'Форрест Гамп',
        avatar: '',
        time: '17.08.23',
        text: 'Жизнь - как коробка шоколадных конфет. Никогда не знаешь, что тебе попадётся.'
      },
      {
        name: 'События Москвы',
        avatar: '',
        time: '10.080.23',
        text: 'Рок-фестиваль Park Live снова перенесён на следующий год.'
      },
      {
        name: 'Джон Смит',
        avatar: '',
        time: '20.08.23',
        text: 'Добравшись до конца, начинаешь думать о начале'
      }
    ],
    currentChat: {
      name: 'Вася',
      messages: [
        {
          text: 'Привет',
          time: '19:30',
          type: 'received'
        },
        {
          text: 'Я наконец-то доделал свой проект! Зацени!',
          time: '19:30',
          type: 'received'
        },
        {
          text: 'Привет! Круто, поздравляю!',
          time: '19:35',
          type: 'sent'
        },
      ]
    }
  },
  navlinks: [
    {
      href: '/login',
      text: 'Авторизация'
    },
    {
      href: '/signup',
      text: 'Регистрация'
    },
    {
      href: '/chats',
      text: 'Список чатов и лента переписки'
    },
    {
      href: '/profile',
      text: 'Настройки пользователя'
    },
    {
      href: '/change-password',
      text: 'Смена пароля'
    },
    {
      href: '/error404',
      text: 'Ошибка 404'
    },
    {
      href: '/error500',
      text: 'Ошибка 500'
    },
  ]
};
