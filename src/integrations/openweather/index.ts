import axios, { AxiosInstance } from 'axios';
import constants from '@utils/constants';
import { Forecast } from './types';

const openWeatherInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

openWeatherInstance.interceptors.request.use(async (config) => ({
  ...config,
  params: {
    ...config.params,
    appid: constants.OPEN_WEATHER_API_KEY,
    units: 'metric',
    lang: 'ru',
  },
}));

interface OpenWeatherClient {
  lat: string;
  lon: string;
}

export default class ApiOpenWeather {
  protected lat: string;

  protected lon: string;

  protected api: AxiosInstance;

  constructor({ lat, lon }: OpenWeatherClient) {
    this.lat = lat;
    this.lon = lon;
    this.api = openWeatherInstance;
  }

  get forecast() {
    return this.api
      .get<{
      list: Forecast[];
    }>('forecast', { params: { lat: this.lat, lon: this.lon } })
      .then(({ data: { list } }) => list);
  }
}
