export type ActivePlanet = {
  planetIndex: number,
  name: string,
  faction: 'Terminids' | 'Automatons',
  players: number,
  health: number,
  maxHealth: number,
  percentage: number,
  defense: boolean,
  majorOrder: boolean,
  biome: {
    slug: string,
    description: string,
  },
  expireDateTime: null
};

export type Planets = {
  [key: string]: {
    name: string,
    sector: string,
    biome: null,
    environmentals: {
      name: string,
      description: string
    }[]
  }
};

export type StatusPlanet = {
  index: number,
  owner: 1 | 2 | 3, // 3 - automatons, 2 - terminids, 1 - superearth
  health: number,
  regenPerSecond: number,
  players: number
};

export type MajorOrder = {
  id32: number,
  progress: number[],
  expiresIn: number,
  setting: {
    type: 4,
    overrideTitle: string,
    overrideBrief: string,
    taskDescription: string,
    tasks: {
      'type': number,
      'values': [
        number,
        number,
        number,
      ],
      'valueTypes': [
        number,
        number,
        number,
      ]
    }[],
    reward: {
      'type': number,
      'id32': number,
      'amount': number
    },
    flags: number
  }
};
