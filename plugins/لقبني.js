
const handler = {
  command: [
    /\[لقبني(.*)/i,
    /لقبي$/i,
    /لقبه (.*)$/i,
    /القابهم$/i
  ],
  limit: true,
  tags: 'fun',
  category: 'fun',
  async handle(m, { text }) {
    if (!m.isGroup) return await m.reply('هذا الأمر صالح فقط في المجموعات.')
    if (!m.quoted || !m.quoted.jid || !m.quoted.fromMe) return await m.reply('يجب الرد على رسالتي التي تحتوي على أمر التسجيل!')
    let nicknames = global.db.data.nicknames || []
    switch (m.text.split(' ')[0].toLowerCase()) {
      case 'لقبني':
        let user = nicknames.find(n => n.from === m.quoted.sender)
        if (user) return await m.reply('لقد غيرت لقبك مسبقًا.')
        user = { from: m.quoted.sender, nickname: text.replace(/\[لقبني(.*)/i, '') }
        nicknames.push(user)
        await m.reply('تم تسجيل لقبك بنجاح!')
        break
      case 'لقبي':
        let user = nicknames.find(n => n.from === m.sender)
        if (!user) return await m.reply('لم يتم تسجيل أي لقب لك!')
        await m.reply(`لقبك هو: ${user.nickname}`)
        break
      case 'لقبه':
        let men = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted && m.quoted.fromMe ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0]
        let user = nicknames.find(n => n.from === men)
        if (!user) return await m.reply('هذا الشخص غير مسجل!')
        await m.reply(`لقب ${men} هو: ${user.nickname}`)
        break
      case 'القابهم':
        if (nicknames.length === 0) return await m.reply('لم يتم تسجيل أي ألقاب حتى الآن!')
        await m.reply(
          `الألقاب المسجلة هي:\n${
            nicknames
              .map(n => `@${n.from.replace('@s.whatsapp.net', '')} - ${n.nickname}`)
              .join('\n')
          }`
        )
        break
    }
    global.db.data.nicknames = nicknames
  }
}
```
