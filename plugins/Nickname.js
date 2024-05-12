// قاعدة البيانات: قائمة بالمستخدمين والألقاب
let usersNicknames = {};

// تعريف الأمر الذي يسجل اللقب
handler.command = "[لقبني]";

function registerNickname(nickname, user) {
    usersNicknames[user] = nickname;
    send("تم تسجيل اللقب بنجاح!");
}

// تعريف الأمر الذي يعرض اللقب المسجل
handler.command = "(لقبي)";

function displayNickname(user) {
    const nickname = usersNicknames[user];
    if (nickname) {
        send("لقبك هو: " + nickname);
    } else {
        send("*تحذير انت غير مسجل❗*");
    }
}

// تعريف الأمر الذي يعرض لقب الشخص المشار إليه
handler.command = "(لقبه)";

function displayOtherUserNickname(user) {
    const mentionedUser = getMentionedUser();
    const nickname = usersNicknames[mentionedUser];
    if (nickname) {
        send("لقب " + mentionedUser + " هو: " + nickname);
    } else {
        send("*هذا الشخص غير مسجل❗*");
    }
}

// تعريف الأمر الذي يعرض ألقاب الجميع
handler.command = "(القابهم)";

function displayAllNicknames() {
    for (const user in usersNicknames) {
        send("@" + user + " - " + usersNicknames[user]);
    }
}

// دالة للحصول على المستخدم الذي تم ذكره بالـ mention
function getMentionedUser() {
    // يمكنك إضافة المنطق هنا للحصول على المستخدم المذكور بالـ mention
}
