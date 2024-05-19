import { Composer } from 'telegraf';
import ApiHellDivers2, { getMajorPlanetsId } from '@api/helldivers2';
import { inactive_planets_status, major_order } from '@api/helldivers2/messages';
import major_planets_status from '@api/helldivers2/messages/active_planets_status';
import dayjs from 'dayjs';
import { pushToDelete } from '../workers/delete_bot_messages';

export default Composer.command('helldivers', async (ctx, next) => {
  const hellDivers2Client = new ApiHellDivers2();

  const orders = await hellDivers2Client.major_orders;
  const orderType = orders[0].setting.tasks[0].type;
  const majorIds = getMajorPlanetsId(orders[0]);
  const activePlanets = await hellDivers2Client.active_planets;
  const activePlanetsIds = activePlanets.map(({ planetIndex }) => planetIndex);
  const planetStatuses = await hellDivers2Client.planets_status;
  const planetsInfo = await hellDivers2Client.planets;

  const reply = [];

  if (orderType === 3) {
    const majorOrder = orders[0];
    reply.push(`Прогресс приказа: <b>${Math.floor((majorOrder.progress[0] / majorOrder.setting.tasks[0].values[2]) * 100)}%</b>`);
    reply.push(`Осталось убить: <b>${(new Intl.NumberFormat('ru-RU', { }).format(majorOrder.setting.tasks[0].values[2] - majorOrder.progress[0]))}</b>`);
  } else {
    reply.push(major_order(orders[0]));
    reply.push('');
    reply.push(major_planets_status(activePlanets
      .filter(({ planetIndex }) => majorIds.includes(planetIndex))));
    reply.push(inactive_planets_status(planetStatuses
      .filter(({ index }) => majorIds.includes(index) && !activePlanetsIds
        .includes(index)), planetsInfo));
  }

  reply.push(`До завершения приказа: <b>${Math.floor(orders[0].expiresIn / 86400)}д ${Math.floor(orders[0].expiresIn / 3600 % 24)}ч ${Math.floor(orders[0].expiresIn / 3600 / 24 % 60)}м</b>`);
  reply.join('\n');

  await ctx.deleteMessage();
  const response = await ctx.reply(reply.join('\n'), { parse_mode: 'HTML' });
  pushToDelete(response.chat.id, response.message_id);

  return next();
});
