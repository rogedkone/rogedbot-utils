import axios, { AxiosInstance } from 'axios';
import {
  ActivePlanet, MajorOrder, Planets, StatusPlanet,
} from './types';
import { getMajorPlanetsId } from './utils';

const hellDivers2Instance = axios.create({
  baseURL: 'https://helldiverstrainingmanual.com/api/v1/',
});

hellDivers2Instance.interceptors.request.use(async (config) => ({
  ...config,
  params: {
    ...config.params,
  },
}));
export default class ApiHellDivers2 {
  protected api: AxiosInstance;

  constructor() {
    this.api = hellDivers2Instance;
  }

  get major_orders() {
    return this.api.get<MajorOrder[]>('war/major-orders')
      .then(({ data }) => data);
  }

  get active_planets() {
    return this.api
      .get<ActivePlanet[]>('war/campaign')
      .then(({ data }) => data);
  }

  get planets_status() {
    return this.api.get<{ planetStatus: StatusPlanet[] }>('war/status')
      .then(({ data: { planetStatus } }) => planetStatus);
  }

  get planets() {
    return this.api.get<Planets>('planets')
      .then(({ data }) => data);
  }
}

export {
  getMajorPlanetsId,
};
