(function (Q, $) {
	/*
	* Streams/chat
	*/
	Q.Tool.define('Streams/chat', function(options) {
		this.Q.onInit.set(this.initialize, 'Streams/chat');
	}, {}, {
		initialize: function(){
			var self = this;

			if ($.isEmptyObject(this.options)) {
				return false;
			}

			Q.Template.set('Streams/chat/message-error',
				'<div class="message-item Q_w100 error">'+
					'<div class="Q_w100 message-text-container">'+
						'<div class="message-item-text">'+
							'{{#error.isLoggedError}}'+
								this.options.notLoggedIn+
							'{{/error.isLoggedError}}'+
							'{{#error.isAuthorizedError}}'+
								this.options.notAuthorized+
							'{{/error.isAuthorizedError}}'+
						'</div>'+
						'<div class="Q_clear"></div>'+
						'<div class="Q_w20 Q_right date">{{date}}</div>'+
						'<div class="Q_clear"></div>'+
					'</div>'+
					'<div class="Q_clear"></div>'+
				'</div>'
			);

			this.pretyData();
			this.render(function(){
				self.renderMessages();
				self.scrollBottom();
				self.addEvents();
			});
		},

		pretyData: function() {
			this.options.more = {};
			if (this.options.loadMore == 'click') {
				this.options.more.isClick = true;
			} else if (this.options.loadMore == 'scroll') {
				this.options.more.isScroll = true;
			}
		},

		pretyMessages: function(messages){
			var res  = [],
				self = this;

			if (messages.content) { // one message
				res.push(parseMessage(messages));
			} else { // more messages
				for(var i in messages) {
					if (messages[i].content) {
						res.push(parseMessage(messages[i]));
					}
				}
			}

			return res;

			function sliceContent(content) {
				if (content.length > self.options.messageMaxHeight) {
					return content.slice(0, self.options.messageMaxHeight) + '..';
				}

				return content;
			};

			function parseMessage(message) {
				var data = {
					fullContent: message.content, 
					content    : sliceContent(message.content),
					date       : self.parseDate(message.sentTime),
					byUserId   : message.byUserId,
					ordinal    : message.ordinal,
					_class     : ''
				};

				if (data.content.length > self.options.messageMaxHeight) {
					data._class = 'Q_ellipsis'
				}

				if (message.byUserId === self.options.userId) {
					data._class += ' with-me';
				} else {
					data._class += ' to-me';
				}

				return data;
			};
		},

		render: function(callback){
			var $el = $(this.element);

			Q.Template.render('Streams/chat/main', this.options, function(error, html){
				if (error) { return error; }
				$el.html(html);

				callback && callback();
			});
		},

		renderMessages: function(messages){
			var $el = $(this.element);

			if (messages && !$.isEmptyObject(messages) && $.isArray(messages)) {
				for (var i=0; i<messages.length; ++i) {
					// is set this message
					if (this.getOrdinal(false, messages[i].ordinal)) {
						continue;
					}

					Q.Template.render('Streams/chat/message-item', messages[i], function(error, html){
						if (error) { return error; }

						$el.find('.no-messages').remove();

						var $html = $(html);

						Q.activate($html.find('.avatar-container').html(
							Q.Tool.setUpElement('div', 'Users/avatar', { userId: messages[i].byUserId })
						));

						$el.find('.messages-container').append($html);
					});
				}
			} else {
				Q.Template.render('Streams/chat/no-messages', function(error, html){
					if (error) { return error; }
					$el.find('.messages-container').html(html);
				});
			}
		},

		renderError: function(message){
			var $el = $(this.element);

			for (var i in message) {
				if (message[i] && message[i].errors) {
					for (var error in message[i].errors) {
						var data = {
							error: {},
							date : this.parseDate({ expression: 'CURRENT_TIMESTAMP' })
						};

						// detect error type and get html
						if (message[i].errors[error].classname.match(/notLoggedIn/i)) {
							data.error.isLoggedError = true;							
						} else if (message[i].errors[error].classname.match(/notAuthorized/i)) {
							data.error.isAuthorizedError = true;
						}

						Q.Template.render('Streams/chat/message-error', data, function(error, html){
							if (error) { return error; }

							$el.find('.no-messages').remove();
							$el.find('.messages-container').html(html);
						});
					}
				}
			}
		},

		more: function(callback){
			var opt    = this.options,
				self   = this,
				params = {
					'max'  : this.getOrdinal(0, 'first') - 1,
					'limit': opt.messagesToLoad
				};

			Q.jsonRequest.options.quiet = true;
			Q.Streams.Message.get(opt.publisherId, opt.streamName, params, function(err, messages){
				Q.jsonRequest.options.quiet = false;
				if (err) {
					return;
				}

				callback.call(self, messages);
			}, { 'type': 'Streams/chat/message', 'ascending': false });
		},

		addEvents: function(){
			var self    = this,
				$el     = $(this.element),
				opt     = this.options,
				blocked = false;

			/*
			* get more messages
			*/
			function renderMore(messages) {
				messages = self.pretyMessages(messages);
				if (!!messages.length) {
					self.renderMessages(messages);
					self.scrollTop();
				}
			};

			if (opt.more.isClick) {
				$el.find('.more').click(function(){
					self.more(renderMore);
				});
			} else {
				$el.find('.messages-container').scroll(function(event){
					if ($(this).scrollTop() == 0) {
						self.more(renderMore);
					}
				});
			}

			$el.find('.Q_ellipsis .message-item-text').live('click', function(){
				var $container = $(this).parents('.message-item'),
					username   = $container.find('.Users_avatar_contents').text();

				if ($container.data('byuserid') === self.options.userId) {
					username = 'me';
				}

				Q.Dialogs.push({
					title  : 'Message from ' + username,
					content: '<div class="Streams_popup_content">' + $container.data('content') + '</div>'
				});
			});

			/*
			* get messages
			*/
			Q.Streams.Stream.onMessage(opt.publisherId, opt.streamName, 'Streams/chat/message').set(function(stream, message) {
				self.renderMessages(self.pretyMessages(message));
				self.scrollBottom();
			}, 'Streams.chat');

			/*
			* send message
			*/
			$el.find('.message-text').keypress(function(event){
				if (event.charCode == 13) {
					$el.find('.send-message').trigger('click');
					return false;
				}
			});

			$el.find('.send-message').click(function() {
				if (blocked) {
					return false;
				}

				Q.jsonRequest.options.quiet = true;
				blocked = this;

				var content = $el.find('.message-text').val();
				$el.find('.message-text').val('');

				Q.Streams.Message.post({
					'publisherId': opt.publisherId,
					'streamName' : opt.streamName,
					'type'       : 'Streams/chat/message',
					'content'    : content
				}, function(err, message) {
					if (err) {
						self.renderError(message);
					}

					Q.jsonRequest.options.quiet = false;
					blocked = false;
				});
			});
		},

		parseDate: function(date){
			var date = (date.expression == 'CURRENT_TIMESTAMP') ? new Date() : new Date(date);
			var pretyDate = function(d){
				return d.toString().length == 1 ? '0'+d : d;
			};

			return date.getFullYear() 		  + '-' + 
				   pretyDate(date.getMonth()) + '-' + 
				   pretyDate(date.getDay())   + ' ' +
				   date.getHours()     		  + ':' +
				   date.getMinutes()  		  + ':' +
				   date.getSeconds();
		},

		getOrdinal: function(action, ordinal){
			if (ordinal) {
				ordinal = 'data-ordinal='+ordinal;
			}

			var data = this.findMessageData.call(this, action, ordinal);
			return data ? data.ordinal : null;
		},

		/*
		* find by options [first, last] or/and param
		* or only by param
		* @return data attribute or null 
		*/
		findMessageData: function(action, byParam){
			var $el = $(this.element),
				query = '.message-item';

			byParam = (byParam ? '['+byParam+']' : '');

			if (!action && byParam) {
				var $node = $el.find(query+byParam);
				return $node ? $node.data() : null;
			}

			if (typeof(action) == 'string') {
				switch(action){
					case 'first':
					case 'last':
						return $el.find(query+':'+action+byParam).data();
				}
			} else if (typeof(action) == 'number') {
				var messages = $el.find(query+byParam);
				return messages.length <= action ? $(messages.get(action)).data() : null;
			}

			return null;
		},

		scrollBottom: function() {
			$(this.element).find('.messages-container').animate({ scrollTop: $(document).height() }, '300');
		},

		scrollTop: function() {
			$(this.element).find('.messages-container').animate({ scrollTop: -$(document).height() }, '300');	
		}
	});

	Q.Template.set('Streams/chat/message-item',
		'<div class="message-item Q_w100 {{#_class}} {{_class}} {{/_class}}" '+
				'data-content="{{fullContent}}" '+
				'data-byUserId="{{byUserId}}" '+
				'data-ordinal="{{ordinal}}">'+
			'<div class="Q_w20 avatar-container"></div>'+
			'<div class="Q_w100 message-text-container">'+
				'<div class="message-item-text">{{content}}</div>'+
				'<div class="Q_clear"></div>'+
				'<div class="Q_w20 Q_right date">{{date}}</div>'+
				'<div class="Q_clear"></div>'+
			'</div>'+
			'<div class="Q_clear"></div>'+
		'</div>'
	);

	Q.Template.set('Streams/chat/no-messages', '<i class="no-messages">No messages</i>');

	Q.Template.set('Streams/chat/main', 
		'<h1>Chat {{streamName}}</h1>'+
		'<div class="Q_clear"></div>'+
		'{{#more.isClick}}'+
			'<div class="more Q_w100">More messages</div>'+
		'{{/more.isClick}}'+
		'<div class="messages-container">'+
			'<!-- messages -->'+
		'</div>'+
		'<textarea class="message-text Q_w100" placeholder="Write your message"></textarea>'+
		'<hr />'+
		'<button class="Q_right send-message">Send</button>'+
		'<div class="Q_clear"></div>'
	);
})(Q, jQuery);