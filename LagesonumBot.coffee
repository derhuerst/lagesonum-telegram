redis =			require 'redis'





module.exports =



	# The Redis DB client.
	redis:			null,



	init: () ->
		@redis = redis.createClient()



	addSubscriber: (ticket, handle) ->
		# todo

	removeSubscriber: (ticket, handle) ->
		# todo



	notify: (ticket) ->
		# todos
