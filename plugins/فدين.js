//API Vids:
const handler = async (m, { conn }) => {
  try {
      const videoLink = "https://api.bk9.site/Islam/quranvid";
      const videoFileName = "video.mp4";
      await conn.sendMessage(m.chat, { video: { url: videoLink }, fileName: videoFileName, mimetype: 'video/mp4', caption: 'ابو عبدالله' }, { quoted: m });
  } catch (error) {
      console.error(error);
      throw "فشل في إرسال الفيديو.";
  }
};

handler.tags = ['islam'];
handler.command = /^(اسلاميات)$/i;

export default handler;
