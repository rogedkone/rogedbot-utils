import { ApiOpenWeather } from '@integrations/index';
import dayjs from 'dayjs';
import { Forecast } from '@integrations/openweather/types';
import { openIconToEmoji, timeToHuman } from '../utils';

const generateForecastMessage = (forecast: Forecast) => {
  const {
    dt_txt: dateText,
    main: { temp, feels_like: flike, humidity },
    weather,
    wind: { speed },
  } = forecast;
  const msg = [
    `<b>${timeToHuman(dateText.split(' ')[1])}</b> ${Math.ceil(temp)}C как ${Math.ceil(flike)}С ${openIconToEmoji(weather[0].icon)}`,
    `Ветер: ${speed} Влажность: ${humidity}%\n`,
  ];
  return msg.join('\n');
};

export default async (lat: string, lon: string) => {
  const OpenWeatherClient = new ApiOpenWeather({ lat, lon });

  const forecast = await OpenWeatherClient.forecast;
  const reply = [];
  const now = dayjs();
  const today = forecast.filter(
    ({ dt_txt }) => ['06:00:00', '09:00:00', '15:00:00', '18:00:00'].includes(
      dt_txt.split(' ')[1],
    ) && dt_txt.split(' ')[0] === now.format('YYYY-MM-DD'),
  );
  const tomorrow = forecast.filter(
    ({ dt_txt }) => ['00:00:00', '06:00:00', '09:00:00', '15:00:00', '18:00:00'].includes(
      dt_txt.split(' ')[1],
    ) && dt_txt.split(' ')[0] === now.add(1, 'day').format('YYYY-MM-DD'),
  );
  const nextDay = forecast.filter(
    ({ dt_txt }) => ['00:00:00'].includes(dt_txt.split(' ')[1])
      && dt_txt.split(' ')[0] === now.add(2, 'day').format('YYYY-MM-DD'),
  );

  reply.push('<b>=====Сегодня=====</b>');
  reply.push(
    ...[...today, tomorrow[0]].map((item) => generateForecastMessage(item)),
  );

  reply.push('=====<b>Завтра=====</b>');
  reply.push(
    ...[...tomorrow.slice(1), nextDay[0]].map((item) => generateForecastMessage(item)),
  );

  return reply.join('\n');
};
