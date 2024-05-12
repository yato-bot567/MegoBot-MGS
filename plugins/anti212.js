export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
    const datas = global
    const senderNumber = m.sender.split('@')[0]; // Extracting sender's number
    const isFromMorocco = senderNumber.startsWith('+212'); // Check if sender's number starts with '212'
    
    // Check if the message is in a group or if it's a private message
    const isGroupMessage = m.isGroupMsg ? true : false;
    
    // If the sender's number starts with '212' and the message is either in a group or private, ignore the command
    if (isFromMorocco && (isGroupMessage || !isGroupMessage)) {
        return true;
    }
    
    // Your existing code for other checks
    if (m.isBaileys && m.fromMe) return true;
    if (m.isGroup) return false;
    if (!m.message) return true;
    if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return true;
    const chat = global.db.data.chats[m.chat];
    const bot = global.db.data.settings[this.user.jid] || {};
    if (bot.antiPrivate && !isOwner && !isROwner) {
        await m.reply(tradutor.texto1, false, {mentions: [m.sender]});
        await this.updateBlockStatus(m.chat, 'block');
    }
    return false;
}
