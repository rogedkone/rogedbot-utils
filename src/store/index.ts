export default {
  bot_messages: [],
  weather: {
    city: null,
  },
} as { bot_messages: { chat_id: number, id: number }[], weather: { city: null | string } };
