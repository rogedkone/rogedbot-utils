// Токены берутся из ENV окружения

export default {
  TG_BOT_TOKEN: process.env.TG_BOT_TOKEN ?? '',
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY ?? '',
};
