let handler = async (m, { conn, command, text, usedPrefix, participants }) => {
    if (!text) throw "*مـنـشـن الــشـخص الـذي تـريـد مـعـرفة نـسـبـة غبائه !*"
    const mentionedUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
 const userChar = [
     "1%",
 "2%",
 "3%",
 "4%",
 "5%",
 "6%",
 "7%",
 "8%",
 "9%",
 "10%",
 "11%",
 "12%",
 "13%",
 "14%",
 "15%",
 "16%",
 "17%",
 "18%",
 "19%",
 "20%",
 "21%",
 "22%",
 "23%",
 "24%",
 "25%",
 "26%",
 "27%",
 "28%",
 "29%",
 "30%",
 "31%",
 "32%",
 "33%",
 "34%",
 "35%",
 "36%",
 "37%",
 "38%",
 "39%",
 "40%",
 "41%",
 "42%",
 "43%",
 "45%",
 "46%",
 "47%",
 "48%",
 "49%",
 "50%",
 "51%",
 "52%",
 "53%",
 "54%",
 "55%",
 "56%",
 "57%",
 "58%",
 "59%",
 "60%",
 "61%",
 "62%",
 "63%",
 "64%",
 "65%",
 "66%",
 "67%",
 "68%",
 "69%",
 "70%",
 "71%",
 "72%",
 "73%",
 "74%",
 "75%",
 "76%",
 "77%",
 "78%",
 "79%",
 "80%",
 "81%",
 "82%",
 "83%",
 "84%",
 "85%",
 "86%",
 "87%",
 "88%",
 "89%",
 "90%",
 "9%",
 "91%",
 "92%",
 "93%",
 "94%",
 "95%",
 "96%",
 "97%",
 "98%",
 "99%",
 "100%",
    ]
    const userCharacterSeletion =
      userChar[Math.floor(Math.random() * userChar.length)]

    let message = `*@${mentionedUser.split("@")[0]} انــه غبي بـنـسـبــة ${userCharacterSeletion}*`
    
    conn.sendMessage(m.chat, { text: message, mentions: [mentionedUser] }, { quoted: m })
    
}
handler.help = ["character @tag"]
handler.tags = ['fun']
handler.command = /^(غبائه)/i

export default handler 
