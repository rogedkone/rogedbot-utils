/* eslint-disable no-restricted-syntax */
import store from '@store/index';
import Bot from '@bot/index';

export const pushToDelete = (chat_id: number, id: number) => {
  store.bot_messages.push({
    chat_id,
    id,
  });
};

export const removeFromDelete = (msg: { chat_id: number, id: number }) => {
  store.bot_messages = store.bot_messages
    .filter((m) => m.chat_id !== msg.chat_id && m.id !== msg.id);
};

export default () => {
  console.log('search old messages', store.bot_messages);
  if (store.bot_messages.length === 0) return;
  for (const msg of store.bot_messages) {
    Bot.telegram.deleteMessage(msg.chat_id, msg.id)
      .then(() => removeFromDelete(msg))
      .catch((err) => {
        console.log(err);
        if (err.desciprion === 'Bad Request: message to delete not found') removeFromDelete(msg);
      });
  }
};
