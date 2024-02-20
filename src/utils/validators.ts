export const login = (value: string) => {
  if (value.length < 3 || value.length > 20) {
    return 'Значение должно быть от 3 до 20 символов';
  }

  if (value.match(/^\d+$/)) {
    return 'Значение должно состоять не только из цифр';
  }

  if (!value.match(/^[\w-]+$/)) {
    return 'Только латиница, цифры, дефис и нижнее подчёркивание';
  }

  return null;
}

export const password = (value: string) => {
  if (value.length < 8 || value.length > 40) {
    return 'Пароль должен быть не короче 8 и не длинее 40 символов';
  }

  if (!value.match(/^(?=.*[A-Z])(?=.*\d).+$/)) {
    return 'Должна быть хотя бы одна цифра и одна заглавная буква';
  }
  return null;
}

export const name = (value: string) => {
  if (value && value.length < 1 || value.length > 50) {
    return 'Значение должно быть от 1 до 50 символов';
  }
  
  if (value && !value.match(/^(?:[а-яА-ЯёЁ-]*|[a-zA-Z-]*)$/)) {
    return 'Допускается только латиница или только кириллица и дефис';
  }

  if (value && !value.match(/^(?:[А-ЯЁ]|[A-Z])/)) {
    return 'Первая буква должна быть заглавной';
  }
  
  return null;
}

export const email = (value: string) => {
  if (value && !value.match(/^[-\w.]+@[-A-z0-9.]+.+[a-z]$/)) {
    return 'Email должен быть на латинице и содержать знак @';
  }
  return null;
}

export const phone = (value: string) => {
  if (value.length < 10 || value.length > 15) {
    return 'Значение должно быть от 10 до 15 символов';
  }
  
  if (!value.match(/^\+?\d+$/)) {
    return 'Значение должно состоять только из цифр';
  }
  
  return null;
}

export const chatName = (value: string) => {
  if (value.length < 1) {
    return 'Значение не должно быть пустым';
  }

  return null;
}

export const chatUserId = (value: string) => {
  if (!value.match(/^\+?\d+$/)) {
    return 'Значение должно состоять только из цифр';
  }
}
