config =		require 'config'
TelegramBot =	require 'node-telegram-bot-api'#




token = config.get 'telegramToken'
bot = new TelegramBot token,
	polling:	true

bot.onText /.*/, (msg) ->
	console.log msg
	bot.sendMessage msg.from.id, 'bla'
