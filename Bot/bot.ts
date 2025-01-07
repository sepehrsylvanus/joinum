const { Telegraf } = require("telegraf");
const TOKEN = "7539867059:AAGVxoDyJelH39wlX3eYXvU4N0asP0NWNgU";
const bot = new Telegraf(TOKEN);
const url = "https://travel-main-app.vercel.app/en/intro";

// Middleware to parse initData
bot.use((ctx: any, next: any) => {
  if (ctx.message && ctx.message.web_app_data) {
    ctx.webAppData = ctx.message.web_app_data;
  }
  return next();
});

bot.start((ctx: any) => {
  ctx.reply("Welcome", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open web app",
            web_app: { url },
          },
        ],
      ],
    },
  });

  // Log a message indicating the bot has started
  console.log("Bot started");
});

// Handle incoming messages containing web_app_data
bot.on("message", (ctx: any) => {
  if (ctx.webAppData) {
    console.log("initData:", ctx.webAppData);
  } else {
    console.log("Received message without web_app_data.");
  }
});

bot.launch();
