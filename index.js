var	config = require('config');
var shortid = require('shortid');
var TelegramBot = require('node-telegram-bot-api');

var LagesonumClient = require('./LagesonumClient');





var telegramBot = new TelegramBot(config.telegramToken, {
	polling: true
});
var lagesonumClient = Object.create(LagesonumClient)
lagesonumClient.init(config.lagesonum);

var ticketFormat = /^[a-z][0-9]{3}$/i;



telegramBot.onText(/\/subscribe (.+)/, function(msg, match) {
	var user = msg.from.id;
	var ticket = match[1];
	if (!ticketFormat.test(ticket))
		return self.sendMessage(user, 'Wrong ticket format. Tickets have this format: B123');

	var self = this;
	lagesonumClient.subscribe(user, ticket)
	.catch(function (err) {
		self.sendMessage(user, 'There was an error: ' + err.message);
	})
	.then(function () {
		self.sendMessage(user, 'You successfully subscribed to the ticket ' + ticket + '.');
	});
});



telegramBot.onText(/\/unsubscribe (.+)/, function(msg, match) {
	var user = msg.from.id;
	var ticket = match[1];
	if (!ticketFormat.test(ticket))
		return self.sendMessage(user, 'Wrong ticket format. Tickets have this format: B123');

	var self = this;
	lagesonumClient.unsubscribe(user, ticket)
	.catch(function (err) {
		self.sendMessage(user, 'There was an error: ' + err.message);
	})
	.then(function () {
		self.sendMessage(user, 'You successfully unsubscribed from the ticket ' + ticket + '.');
	});
});



telegramBot.onText(/\/stop/, function(msg) {
	var user = msg.from.id;

	var self = this;
	lagesonumClient.unsubscribeAll(user)
	.catch(function (err) {
		self.sendMessage(user, 'There was an error: ' + err.message);
	})
	.then(function () {
		self.sendMessage(user, 'You successfully unsubscribed from the all tickets.');
	});
});



telegramBot.onText(/\/tickets/, function(msg) {
	var user = msg.from.id;

	var self = this;
	lagesonumClient.unsubscribeAll(user)
	.catch(function (err) {
		self.sendMessage(user, 'There was an error: ' + err.message);
	})
	.then(function () {
		self.sendMessage(user, 'You are subscribed to the following tickets.\n' + tickets.join('\n'));
	});
});



telegramBot.onText(/\/(?!subscribe|unsubscribe|stop|tickets)[a-z0-9]+/, function(msg) {
	return telegramBot.sendMessage(msg.from.id, "unknown command!"); // + usage
});



console.log('Bot is running');
