// قم بإنشاء متغير لتخزين قائمة الأرقام المغربية المحظورة
let blockedNumbers = [];

// أمر "منع212" لإضافة أو إزالة رقم مغربي محظور
bot.command('منع212', (ctx) => {
    // افحص إذا كانت الرسالة تحتوي على رقم مغربي
    if (ctx.message.text.match(/^منع212\s+\d{9}$/)) {
        let number = ctx.message.text.split(' ')[1];
        if (!blockedNumbers.includes(number)) {
            // قم بإضافة الرقم إلى قائمة الأرقام المحظورة
            blockedNumbers.push(number);
            ctx.reply(`تم منع الرقم المغربي ${number}`);
        } else {
            // قم بإزالة الرقم من قائمة الأرقام المحظورة
            blockedNumbers = blockedNumbers.filter(n => n !== number);
            ctx.reply(`تم السماح بالرقم المغربي ${number}`);
        }
    } else {
        ctx.reply('الرجاء استخدام الأمر بالصيغة الصحيحة: منع212 [الرقم المغربي]');
    }
});

// قم بإيقاف تشغيل البوت عندما يأتي الرقم المغربي محظورًا
bot.on('message', (ctx) => {
    if (blockedNumbers.includes(ctx.message.text.substring(0, 3))) {
        ctx.reply('عذراً، لا يمكنني قبول الأوامر من هذا الرقم المغربي.');
    } else {
        // تنفيذ الأوامر الأخرى هنا...
    }
});
