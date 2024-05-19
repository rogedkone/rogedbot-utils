/* eslint-disable no-restricted-syntax */
import { ActivePlanet } from '@api/helldivers2/types';
import { factionParse } from '@api/helldivers2/utils';

const generateDefence = (percent: number) => {
  const msg = [];
  const defended = Math.floor(percent / 10);
  const lost = 10 - defended;
  msg.push(`${defended === 0 ? '' : '🟦'.repeat(defended - 1)}🟨${'🟧'.repeat(defended === 0 ? lost - 1 : lost)}`);

  return msg.join('\n');
};

const generateAttack = (percent: number) => {
  const msg = [];
  const taken = Math.floor(percent / 10);
  const remaining = 10 - taken;
  msg.push(`${taken === 0 ? '' : '🟩'.repeat(taken - 1)}🟨${'🟥'.repeat(taken === 0 ? remaining - 1 : remaining)}`);

  return msg.join('\n');
};
export default (planets: ActivePlanet[]) => {
  const defense = planets.filter((planet) => planet.defense);
  const attack = planets.filter((planet) => !planet.defense);
  const msg = [];
  if (attack.length > 0) msg.push('<b>=Сражаемся за эти планеты=</b>');
  for (const planet of attack) {
    msg.push(`Планета <b>${planet.name}</b> / ${factionParse(planet.faction)}`);
    msg.push(generateAttack(planet.percentage));
    msg.push(`Штурмовиков: ${planet.players} чел.`);
    msg.push('');
  }

  if (defense.length > 0) msg.push('<b>=Защищаем эти планеты=</b>');
  for (const planet of defense) {
    msg.push(`Планета ${planet.name} / ${factionParse(planet.faction)}`);
    msg.push(generateDefence(planet.percentage));
    msg.push(`Защнитников: ${planet.players} чел.`);
    msg.push('');
  }

  return msg.join('\n');
};
