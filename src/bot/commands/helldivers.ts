import { Composer } from 'telegraf';
import ApiHellDivers2, { getMajorPlanetsId } from '@integrations/helldivers2';
import { inactive_planets_status, major_order } from '@integrations/helldivers2/messages';
import major_planets_status from '@integrations/helldivers2/messages/active_planets_status';
import { pushToDelete } from '../workers/delete_bot_messages';

export default Composer.command('helldivers', async (ctx, next) => {
  const hellDivers2Client = new ApiHellDivers2();

  const orders = await hellDivers2Client.major_orders;
  const majorIds = getMajorPlanetsId(orders[0]);
  const activePlanets = await hellDivers2Client.active_planets;
  const activePlanetsIds = activePlanets.map(({ planetIndex }) => planetIndex);
  const planetStatuses = await hellDivers2Client.planets_status;
  const planetsInfo = await hellDivers2Client.planets;

  const reply = [];
  reply.push(major_order(orders[0]));
  reply.push('');
  reply.push(major_planets_status(activePlanets
    .filter(({ planetIndex }) => majorIds.includes(planetIndex))));
  reply.push(inactive_planets_status(planetStatuses.filter(({ index }) => majorIds.includes(index) && !activePlanetsIds.includes(index)), planetsInfo));
  reply.join('\n');

  await ctx.deleteMessage();
  const response = await ctx.reply(reply.join('\n'), { parse_mode: 'HTML' });
  pushToDelete(response.chat.id, response.message_id);

  return next();
});
