export const timeToHuman = (time: string) => {
  const human: {
    [key: string]: 'Ночью' | 'Рано утром' | 'Утром' | 'Днём' | 'Вечером';
  } = {
    '00:00:00': 'Ночью',
    '06:00:00': 'Рано утром',
    '09:00:00': 'Утром',
    '15:00:00': 'Днём',
    '18:00:00': 'Вечером',
  };

  return human[time];
};

export const openIconToEmoji = (icon: string) => {
  const icons: {
    [key: string]: string;
  } = {
    '01d': '☀️',
    '02d': '🌤️',
    '03d': '☁️',
    '04d': '☁️☁️',
    '09d': '🌧️',
    '10d': '🌤️🌧️',
    '11d': '🌩️',
    '13d': '❄️',
    '50d': '🌫️',
    '01n': '☀︎',
    '02n': '🌤',
    '03n': '☁︎',
    '04n': '☁☁',
    '09n': '🌧',
    '10n': '🌤🌧',
    '11n': '🌩',
    '13n': '❆',
    '50n': '⬛',
  };
  return icons[icon];
};
