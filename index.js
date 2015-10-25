// index.js

var	config = require('config'),
	TelegramBot = require('node-telegram-bot-api'),
	token = config.telegramToken,
	request = {};

var bot = new TelegramBot(token, {
	polling: true
});

bot.onText(/\/.*/, function(msg) {
	var cmdArg = msg.text.match(/\/([^ ]+) (.*)/);
		cmdNoArg = msg.text.match(/\/(.*)/);

		if (cmdArg) {
			var cmd = cmdArg[1],
				string = cmdArg[2];

			console.log(cmdArg);

			switch (cmd) {
				case "subscribe":
					return bot.sendMessage(msg.from.id, "unsubscribed: \"" + string + "\"");
					break;
				case "unsubscribe":
					return bot.sendMessage(msg.from.id, "unsubscribed: \"" + string + "\"");
					break;
				default:
					return bot.sendMessage(msg.from.id, "unknown command!");
					break;
			}
		} else if (cmdNoArg) {
			var cmd = cmdNoArg[1];

			switch (cmd) {
				case "subscribe":
					return bot.sendMessage(msg.from.id, "please provide a ticket number");
					break;
				default:
					return bot.sendMessage(msg.from.id, "unknown command!");
			}
		}
});

console.log("Bot is running");
