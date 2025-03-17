require('dotenv').config();

const { Bot, GrammyError, HttpError } = require("grammy");

const bot = new Bot(process.env.BOT_API_KEY);

bot.api.setMyCommands([
    {
        command: "start",
        description: "Start Bot"
    },
]);

bot.command("start", async (ctx) => await ctx.reply("Привет, i bot!"));

// bot.on(":location", async (ctx) => {
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.msg.location.latitude}&lon=${ctx.msg.location.longitude}&appid=87f4403542476da41e8e2480e6b95de4&units=metric`;
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data);
//     ctx.reply(`${data.name}: ${data.main.temp} C`);
// });

bot.on(":location", async (ctx) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.msg.location.latitude}&lon=${ctx.msg.location.longitude}&appid=87f4403542476da41e8e2480e6b95de4&units=metric`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    ctx.reply(`<strong>${data.name}:</strong> ${data.main.temp} C <a href="https://arctic.pp.ua/">Repair</a>`,
        {
            parse_mode: "HTML"
        });
});

bot.on("message", async (ctx) => {
    console.log(ctx.msg);
    ctx.reply('Send Location');
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Ошибка в запросе:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Не удалось связаться с Telegram:", e);
    } else {
        console.error("Неизвестная ошибка:", e);
    }
});

bot.start();