const timeFormatConverter = (timeString: string) => {
  if (timeString) {
    const date = new Date(timeString);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

      return time;
    } else {
      const formatter = new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const formattedDate = formatter.format(date);

      return formattedDate;
    }
  }
};

export default timeFormatConverter;
