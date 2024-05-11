// قاعدة بيانات بسيطة لتخزين حالة القيد لأرقام الهواتف المحظورة
let bannedNumbers = new Set(); 

// ممنوع المغاربه يخوي
let handler = async (m, { conn }) => {
    let message = '';
    if (bannedNumbers.size > 0) {
        message = 'تم منع الأرقام التالية من استخدام البوت:\n';
        bannedNumbers.forEach(num => message += `${num}\n`);
    } else {
        message = 'لا يوجد أرقام محظورة حاليًا.';
    }
    conn.reply(m.chat, message, m);
}
handler.command = /^anti212$/i

// صل على النبي
let updateBannedNumbers = async (phoneNumber, isBanned) => {
    if (isBanned) {
        bannedNumbers.add(phoneNumber);
    } else {
        bannedNumbers.delete(phoneNumber);
    }
}

// بواسطة ابو عبدالله 
export { handler, updateBannedNumbers };
