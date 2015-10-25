var	config = require('config'),
	shortid = require('shortid'),
	TelegramBot = require('node-telegram-bot-api'),
	LagesonumClient = require('./LagesonumClient'),
	ticketFormat = /^[a-z][0-9]{3}$/i;


var telegramBot = new TelegramBot(config.telegramToken, {
	polling: true
});

var lagesonumClient = Object.create(LagesonumClient);

lagesonumClient.init(config.lagesonum);

telegramBot.onText(/\/subscribe (.+)/, function(msg, match) {
	var user = msg.from.id,
		ticket = match[1],
		self = telegramBot;

	if (!ticketFormat.test(ticket)) {
		return self.sendMessage(user, 'Wrong ticket format. Tickets have this format: B123');
	}

	lagesonumClient.subscribe(user, ticket)
		.catch(function (err) {
			self.sendMessage(user, 'There was an error: ' + err.message);
		})
		.then(function (body) {
			if (body.success === true) {
				self.sendMessage(user, 'You successfully subscribed to the ticket ' + ticket + '.');
			} else {
				self.sendMessage(user, 'There was an error!');
				// send message to the developers
			}
		});
});

telegramBot.onText(/\/unsubscribe (.+)/, function(msg, match) {
	var user = msg.from.id;
		ticket = match[1],
		self = telegramBot;

	if (!ticketFormat.test(ticket)) {
		return self.sendMessage(user, 'Wrong ticket format. Tickets have this format: B123');
	}

	lagesonumClient.unsubscribe(user, ticket)
		.catch(function (err) {
			self.sendMessage(user, 'There was an error: ' + err.message);
		})
		.then(function (body) {
			if (body.success === true) {
				self.sendMessage(user, 'You successfully unsubscribed from the ticket ' + ticket + '.');
			} else {
				self.sendMessage(user, 'There was an error!');
				// send message to the developers
			}
		});
});

telegramBot.onText(/\/stop/, function(msg) {
	var user = msg.from.id,
		self = telegramBot;

	lagesonumClient.unsubscribeAll(user)
	.catch(function (err) {
		return self.sendMessage(user, 'There was an error: ' + err.message);
	})
	.then(function (body) {
		if (body.success === true) {
			self.sendMessage(user, 'You successfully unsubscribed from the all tickets.');
		} else {
			self.sendMessage(user, 'There was an error!');
			// send message to the developers
		}
	});
});

telegramBot.onText(/\/tickets/, function(msg) {
	var user = msg.from.id,
		self = this;

	lagesonumClient.subscriptions(user)
		.catch(function (err) {
			return telegramBot.sendMessage(user, 'There was an error: ' + err.message);
		})
		.then(function (body) {
			if (body.success === true) {
				telegramBot.sendMessage(user, 'You are subscribed to the following tickets:\n' + body.data.tickets.join('\n'));
			} else {
				self.sendMessage(user, 'There was an error!');
				// send message to the developers
			}
		});
});

telegramBot.onText(/\/(?!subscribe|unsubscribe|start|stop|tickets)[a-z0-9]+/, function(msg) {
	return telegramBot.sendMessage(msg.from.id, "unknown command!"); // + usage
});

console.log('Bot is running');
