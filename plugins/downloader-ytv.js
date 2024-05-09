import fg from 'api-dylux';
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
import ytsr from 'ytsr';
import ytdl from 'ytdl-core';
import fs from 'fs';
import os from 'os';

let limit = 500;
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
  let searchQuery = args.join(" ");
  
  if (!searchQuery) throw `*❎ يرجى إدخال عنوان الفيديو للبحث عنه.*`;
  
  m.react(rwait);
  try {
    const searchResults = await ytsr(searchQuery, { limit: 1 });
    const video = searchResults.items.filter(i => i.type === 'video')[0];
    if (!video) throw new Error('No videos found');
    
    const info = await ytdl.getInfo(video.url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    if (!format) {
      throw new Error('No valid formats found');
    }

    if (format.contentLength / (1024 * 1024) >= limit) {
      return m.reply(`❒ *⚖️ الـمسـاحـه*: ${format.contentLength / (1024 * 1024).toFixed(2)}MB\n❒ *🎞️ الـجـوده*: ${format.qualityLabel}\n\n*❒ الـملـف تـجاوز حـد الـمساحــه* *+${limit} MB*`);
    }

    const tmpDir = os.tmpdir();
    const fileName = `${tmpDir}/${info.videoDetails.videoId}.mp4`;

    const writableStream = fs.createWriteStream(fileName);
    ytdl(video.url, {
      quality: format.itag,
    }).pipe(writableStream);

    writableStream.on('finish', () => {
      conn.sendFile(
        m.chat,
        fs.readFileSync(fileName),
        `${info.videoDetails.videoId}.mp4`,
        `*❖───┊ ♪ يــوتيوب ♪ ┊───❖*
	  
	  *❏ الـعـنوان: ${info.videoDetails.title}*
	  *❐ الـمده: ${info.videoDetails.lengthSeconds} ثانية*
	  *❑ الـمـشاهدات: ${info.videoDetails.viewCount}*
	  *❒ وقــت الـرفـع: ${info.videoDetails.publishDate}*
	  *❒ الـرابـط: ${video.url}*`,
        m,
        false,
        { asDocument: chat.useDocument }
      );

      fs.unlinkSync(fileName); // حذف الملف المؤقت
      m.react(done);
    });

    writableStream.on('error', (error) => {
      console.error(error);
      m.reply('*جـرب لاحـقاً !*');
    });
  } catch (error) {
    console.error(error);
    m.reply('*جـرب لاحـقاً !*');
  }
};

handler.help = ['فيديو <اسم الفيديو>'];
handler.tags = ['بحث فيديو', 'تحميل فيديو'];
handler.command = ['فيديو'];
handler.diamond = false;

export default handler;
