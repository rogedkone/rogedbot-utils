import { Composer } from 'telegraf';
import { message } from 'telegraf/filters';
import { forecast } from '@api/openweather/messages';
import { pushToDelete } from '../workers/delete_bot_messages';

export default Composer.on(message('location'), async (ctx, next) => {
  const { message: msg } = ctx;
  const { latitude: lat, longitude: lon } = msg.location;

  const reply = await forecast(lat.toString(), lon.toString());
  const response = await ctx.reply(reply, {
    parse_mode: 'HTML',
  });
  pushToDelete(response.chat.id, response.message_id);

  return next();
});
