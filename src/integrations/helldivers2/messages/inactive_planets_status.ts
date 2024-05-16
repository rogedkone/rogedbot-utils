import { Planets, StatusPlanet } from '@integrations/helldivers2/types';
import { factionParse } from '@integrations/helldivers2/utils';

export default (planets: StatusPlanet[], planetsInfo: Planets) => {
  const earth = planets.filter((planet) => planet.owner === 1);
  const bugs = planets.filter((planet) => planet.owner === 2);
  const droids = planets.filter((planet) => planet.owner === 3);
  const msg = [];

  if (bugs.length > 0 || droids.length > 0) msg.push('<b>=Продвигаемся к этим планетам=</b>');
  for (const planet of [...droids, ...bugs]) {
    msg.push(`Планета <b>${planetsInfo[planet.index].name}</b> / ${factionParse(planet.owner === 1 ? 'Terminids' : 'Automatons')}`);
    msg.push('🟥'.repeat(10));
    msg.push(`Штурмовиков: <b>${planet.players}</b> чел.`);
    msg.push('');
  }

  if (earth.length > 0) msg.push('<b>=Защищены=</b>');
  for (const planet of earth) {
    msg.push(`Планета <b>${planetsInfo[planet.index].name}</b> / <b>Суперземля</b>`);
    msg.push('🟩'.repeat(10));
    msg.push(`Защнитников: <b>${planet.players}</b> чел.`);
    msg.push('');
  }

  return msg.join('\n');
};
