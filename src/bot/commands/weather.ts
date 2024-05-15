import { Composer, Markup } from 'telegraf';
import cities from '@integrations/openweather/cities';
import { pushToDelete } from '../workers/delete_bot_messages';

export default Composer.command('weather', async (ctx, next) => {
  const buttons = Object.entries(cities).map(([city]) => [Markup.button.callback(city, `weather_${city}`)]);
  const keyboard = Markup.inlineKeyboard(buttons);
  ctx.deleteMessage();
  const response = await ctx.reply('Выберите город или скиньте геолокацию', keyboard);
  pushToDelete(response.chat.id, response.message_id);

  return next();
});
