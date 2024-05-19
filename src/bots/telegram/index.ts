import { Telegraf } from 'telegraf';
import constants from '@utils/constants';
import { helldivers, weather } from './commands';
import { geolocation } from './events';
import { weather as weather_cb } from './actions';
import { delete_bot_messages } from './workers';

const Bot = new Telegraf(constants.TG_BOT_TOKEN);

const work = () => {
  setTimeout(() => {
    delete_bot_messages();
    work();
  }, 1000 * 60 * 1.1);
};

Bot.launch(() => {
  console.log('Bot started');
  work();
});

// actions
Bot.use(weather_cb);
// commands
Bot.use(weather, helldivers);
// events
Bot.use(geolocation);

export default Bot;

// Bot.use((ctx, next) => {
//   setTimeout(() => {
//     console.log('try delete message:', ctx.message?.chat.id, ctx.message?.message_id);
//     Bot.telegram.deleteMessage(ctx.message?.chat.id ?? -1, ctx.message?.message_id ?? -1);
//   }, 15000);
//   return next();
// });
