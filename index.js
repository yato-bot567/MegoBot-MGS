console.log('[ 💠 ] جاري التجهيز...');
import {join, dirname} from 'path';
import {createRequire} from 'module';
import {fileURLToPath} from 'url';
import {setupMaster, fork} from 'cluster';
import {watchFile, unwatchFile} from 'fs';
import cfonts from 'cfonts';
import {createInterface} from 'readline';
import yargs from 'yargs';
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const {name, author} = require(join(__dirname, './package.json'));
const {say} = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('The mego\nBot', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']});
say(`Bot mego`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']});

let isRunning = false;
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
  if (isRunning) return;
  isRunning = true;
  const args = [join(__dirname, file), ...process.argv.slice(2)];

  /** say('[ ℹ️ ] Escanea el código QR o introduce el código de emparejamiento en WhatsApp.', {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']}); **/

  setupMaster({
    exec: args[0],
    args: args.slice(1)});
  const p = fork();
  p.on('message', (data) => {
    console.log('[RECIBIDO]', data);
    switch (data) {
      case 'reset':
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });
  p.on('exit', (_, code) => {
    isRunning = false;
    console.error('[ ℹ️ ] حدث خطأ غير متوقع:', code);

    p.process.kill();
    isRunning = false;
    start.apply(this, arguments);

    if (process.env.pm_id) {
      process.exit(1);
    } else {
      process.exit();
    }
  });
  const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test']) {
    if (!rl.listenerCount()) {
      rl.on('line', (line) => {
        p.emit('message', line.trim());
        // index.js

// تحميل مكتبة الاتصال بواتساب ومكتبة النظام الملفات
const { WAConnection } = require('@adiwajshing/baileys');
const fs = require('fs');

// تحميل الوظيفة التي تمنع الاستجابة للرسائل القادمة من الأرقام المغربية
const { before } = require('./antiMoroccan.js');

// إعداد الاتصال بالخادم
const conn = new WAConnection();
conn.connectOptions.timeoutMs = 30 * 1000; // 30 ثانية للمحاولة الأولى
conn.connectOptions.maxRetries = 2; // يتم إعادة المحاولة مرتين في حالة الفشل

// دالة تحليل الرسائل وتنفيذ الوظيفة لمنع الاستجابة للرسائل القادمة من الأرقام المغربية
conn.on('message-new', async (message) => {
    await before(message, conn);
    // باقي الكود الخاص برد الرسائل وتنفيذ الأوامر الأخرى
      });
    }
  }
}
start('main.js');
