import { Composer } from 'telegraf';
import cities from '@integrations/openweather/cities';
import { forecast } from '@integrations/openweather/messages';
import { pushToDelete } from '../workers/delete_bot_messages';

export default Composer.action(Object.keys(cities).map((city) => `weather_${city}`), async (ctx, next) => {
  ctx.deleteMessage();
  const query = (ctx.update.callback_query as any).data ?? 'none';
  const city = cities[query.split('_').slice(1) as string];
  const reply = await forecast(city.lat, city.lon).then((data) => {
    ctx.answerCbQuery();
    return data;
  }).catch((err) => console.log(err));
  const data = await ctx.reply([`=====${query.split('_').slice(1)}=====`, reply].join('\n'), { parse_mode: 'HTML' });
  pushToDelete(data.chat.id, data.message_id);

  return next();
});
