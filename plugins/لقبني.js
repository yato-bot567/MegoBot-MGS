// handler.command = 'لقبني'
const setNickname = async (message, args) => {
  const nickname = args.join(' ');
  if (!nickname) return message.reply('Please provide a nickname!');
  const user = message.author;
  // Store the nickname in a database or a cache
  await db.set(`nickname:${user.id}`, nickname);
  message.reply(`Your nickname has been set to ${nickname}!`);
};
