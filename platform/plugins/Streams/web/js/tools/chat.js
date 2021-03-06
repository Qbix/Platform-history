(function (Q, $) {
	
/**
 * Streams Tools
 * @module Streams-tools
 */

/**
 * Chatroom for people chat in a stream that allows posting messages with type "Streams/chat/message"
 * @class Streams chat
 * @constructor
 * @param {Object} [options] this object contains function parameters
 *   @param {String} [options.publisherId] Required if stream option is empty. The publisher's user id.
 *   @param {String} [options.streamName] Required if stream option is empty. The stream's name.
 *   @param {Stream} [options.stream] Optionally pass a Streams.Stream object here if you have it already
 *   @param {String} [options.messageMaxHeight] The maximum height, in pixels, of a rendered message
 *   @param {String} [options.messagesToLoad] The number of "Streams/chat" messages to load at a time.
 *   @param {String} [options.animations] Options for animation, which can include:
 *     <ul>
 *         <li>"duration" - defaults to 300</li>
 *     </ul>
 *   @param {Object} [options.loadMore] May be "scroll", "click" or null/false. Defaults to "click".
 *     <ul>
 *         <li>"click" will show label with "Click to see earlier messages" (configurable in Q.text.Streams.chat.loadMore.click string), and when the user clicks it, new messages will be loaded.</li>
 *         <li>"scroll" means new messages will be loaded when the scrollbar of the chat container reaches the top (for desktop) or whole document scrollbar reaches the top (android). On all other browsers it would use pull-to-refresh ... meaning, it will show "Pull to see earlier messages" (html configurable in Q.text.Streams.chat.loadMore.pull string) and as you pull "too far" you trigger the load. As for the indicator of "pulling too far", we will worry about that later, for now skip it. But remember to discuss it with me afterwards.</li>
 *         <li>null/false/etc. - no interface to load earlier messages</li>
 *     </ul>
 *   @param {Q.Event} [options.onRefresh] Event for when an the chat has been updated
 *   @param {Q.Event} [options.onError] Event for when an error occurs, and the error is passed
 */
Q.Tool.define('Streams/chat', function(options) {		
	var tool = this;
	var state = tool.state;
	state.more = {};
	switch (state.loadMore) {
		case 'click': state.more.isClick = true; break;
		case 'scroll': state.more.isScroll = true; break;
		default: break;
	}
	if (state.stream) {
		state.publisherId = state.stream.fields.publisherId;
		state.streamName = state.stream.fields.name;
	}
	if (!state.publisherId) {
		throw new Q.Error("Streams/chat: missing publisherId option");
	}
	if (!state.streamName) {
		throw new Q.Error("Streams/chat: missing streamName option");
	}
	tool.refresh(function () {
		if (state.scrollToBottom) {
			tool.scrollToBottom();
		}
	});
	Q.Streams.refresh.beforeRequest.add(function () {
		if (state.stream) {
			state.stream.refresh(null, {messages: true});
		}
	}, tool);
	//tool.Q.onInit.set(_init, "Streams/chat");
}, 

{
	messageMaxHeight: '200px',
	messagesToLoad: 10,
	loadMore: 'click',
	animations: {
		duration: 300
	},
	scrollToBottom: true,
	onRefresh: new Q.Event(),
	templates: {
		main: {
			dir: 'plugins/Streams/views',
			name: 'Streams/chat/main',
			fields: { placeholder: "Add a comment" }
		},
		Streams_chat_noMessages: {
			dir: 'plugins/Streams/views',
			name: 'Streams/chat/Streams_chat_noMessages',
			fields: { }
		},
		message: {
			item: {
				dir: 'plugins/Streams/views',
				name: 'Streams/chat/message/bubble',
				fields: {  }
			},
			notification: {
				dir: 'plugins/Streams/views',
				name: 'Streams/chat/message/notification',
				fields: { }
			},
			error: {
				dir: 'plugins/Streams/views',
				name: 'Streams/chat/message/error',
				fields: {
					text: {
						notLoggedIn: "You are not logged in",
						notAuthorized: "You are not authorized"
					}
				}
			}
		}
	}
}, 

{
	Q: {
	
		onRetain: function () {
			var $last = this.$('.Streams_chat_bubble').last();
			var selector = '.Streams_chat_item';
			var $nextAll = $last.length
				? $last.nextAll(selector)
				: this.$(selector);
			this.refresh(function () {
				this.$('.Streams_chat_messages')
					.append($nextAll)
					.scrollTop(this.state.lastScrollTop);
			});
		}
		
	},
	/**
	 * @method prevent
	 * Disables the textarea, preventing the user from writing
	 * a message using the provided interface. They are still able to POST
	 * to the server, however, e.g. manually.
	 * @param {String|false} message
	 *  The text to display in the placeholder of the textarea while input is prevented.
	 *  Pass false here to re-enable the textarea.
	 * @return {HTMLElement} the div that replaces the textarea
	 */
	prevent: function (message, callback) {
		var tool = this;
		var state = tool.state;
		var $ie = state.$inputElement;
		var $prevent = state.$prevent;
		if (state.prevented && message === false) {
			$ie.attr('placeholder', state.lastPlaceholder)
			.removeAttr('disabled')
			.css('cursor', 'text')
			.trigger('Q_refresh');
		} else if (!state.prevented && message !== false) {
			state.lastPlaceholder = $ie.attr('placeholder')
				|| $ie.data('Q-placeholder').text();
			$ie.val('').attr('placeholder', message)
			.trigger('Q_refresh')
			.attr('disabled', 'disabled')
			.css('cursor', 'not-allowed');
		}
		state.prevented = !!message;
	},
	prepareMessages: function(messages, action){
		var res  = {};
		var tool = this;
		var state = tool.state;
		
		if ('content' in messages) {
			// this is a single message
			var m = messages;
			messages = {};
			messages[m.ordinal] = m;
		}

		for (var ordinal in messages) {
			var message = messages[ordinal];
			var r = res[ordinal] = {
				content    : message.content,
				time       : Date.fromDateTime(message.sentTime).getTime() / 1000,
				byUserId   : message.byUserId,
				ordinal    : message.ordinal,
				classes    : (message.byUserId === Q.Users.loggedInUserId())
								? ' Streams_chat_from_me'
								: ' Streams_chat_to_me'
			};
			r[action] = true;
		}

		return res;
	},

	render: function(callback){
		var tool = this;
		var $te = $(tool.element);
		var state = tool.state;

		var fields = Q.extend({}, state.more, state.templates.main.fields);
		Q.Template.render(
			'Streams/chat/main',
			fields,
			function(error, html){
				if (error) { return error; }
				$te.html(html);
				
				if (Q.Users.loggedInUser
				&& !state.stream.testWriteLevel('post')) {
					tool.$('.Streams_chat_composer').hide();
				}

				state.$inputElement = tool.$('.Streams_chat_composer textarea');
				callback && callback();
			},
			state.templates.main
		);
	},

	renderMessages: function(messages, callback){
		var tool = this;
		var state = this.state;

		if (Q.isEmpty(messages)) {
			return Q.Template.render(
				'Streams/chat/Streams_chat_noMessages', 
				function(error, html){
					if (error) { return error; }
					tool.$('.Streams_chat_messages').html(html);
				},
				state.templates.Streams_chat_noMessages
			);
		}
		
		function _processMessage(ordinal, message) {
			// TODO: in the future, render stream players inside message template
			// according to the instructions in the message
			Q.Template.render(
				'Streams/chat/message/bubble',
				message,
				p.fill(ordinal)
			);
			ordinals.push(ordinal);
		}
		var p = new Q.Pipe();
		var ordinals = [];
		Q.each(messages, _processMessage, {ascending: true, numeric: true});
		p.add(ordinals, 1, function (params) {
			var snippets = {};
			for (var ordinal in params) {
				var $html = $(params[ordinal][1]);
				$('.Streams_chat_avatar', $html).each(function () {
					Q.Tool.setUpElement(this, 'Users/avatar', {
						userId: $(this).attr('data-byUserId'),
						short: true
					}, null, tool.prefix);
				});
				$('.Streams_chat_timestamp', $html).each(function () {
					Q.Tool.setUpElement(this, 'Q/timestamp', {
						time: $(this).attr('data-time')
					}, null, tool.prefix);
				});
				snippets[ordinal] = $html;
			}
			callback(snippets, messages);
		}).run();
	},

	renderNotification: function(message){
		var tool = this;
		var state = tool.state;
		Q.Streams.Avatar.get(message.byUserId, function (err, avatar) {
			message.displayName = avatar.displayName();
			message.time = Date.now() / 1000;

			Q.Template.render(
				'Streams/chat/message/notification', 
				message, 
				function(error, html){
					if (error) { return error }
					
					tool.$('.Streams_chat_noMessages').remove();
					tool.$('.Streams_chat_messages').append(html);
				},
				state.templates.message.notification
			);
		});
	},

	renderError: function(msg, err, data){
		var tool = this;
		var state = tool.state;

		if (!msg) return;
		var fields = {
			errorText: msg,
			time: Date.now() / 1000
		};

		Q.Template.render(
			'Streams/chat/message/error', 
			fields, 
			function(error, html){
				if (error) { return error; }
    	
				tool.$('.Streams_chat_noMessages').remove();
				tool.$('.Streams_chat_messages').append(html);
    	
				tool.findMessage('last')
					.find('.Streams_chat_timestamp')
					.html(Q.Tool.setUpElement('div', 'Q/timestamp', data.date))
					.activate();
			},
			state.templates.message.error
		);
	},

	more: function(callback){
		var tool = this;
		var state = tool.state;
		var params = {
			max  : state.earliest ? state.earliest - 1 : -1,
			limit: state.messagesToLoad,
			type: "Streams/chat/message"
		};

		Q.Streams.Message.get(state.publisherId, state.streamName, params,
		function(err, messages){
			if (err) {
				return Q.handle(state.onError, this, [err]);
			}
			Q.each(messages, function (ordinal) {
				state.earliest = ordinal;
				return false;
			}, {ascending: true, numeric: true});
			callback.call(tool, messages);
		});
	},

	addEvents: function(){
		var tool    = this,
			state   = this.state,
			blocked = false;

		/*
		 * get more messages
		 */
		function _renderMore(messages) {
			messages = tool.prepareMessages(messages);
			var $more = tool.$('.Streams_chat_more');
			if (Q.isEmpty(messages)) {
				return $more.hide();
			};
			var $scm = tool.$('.Streams_chat_messages');
			tool.renderMessages(messages, function (snippets) {
				tool.$('.Streams_chat_noMessages').remove();
				var least = 1000;
				var totalHeight = 0;
				Q.each(snippets, function (ordinal, $html) {
					$html.prependTo($scm).activate();
					least = ordinal;
					totalHeight += ($html.outerHeight(true) + $html.outerHeight())/2;
				}, {ascending: false});
				$more.prependTo($scm);
				$scm.scrollTop(totalHeight);
				if (least <= 1) {
					return $more.hide();
				}
				tool.processDOM();
			});
		};

		if (state.more.isClick) {
			tool.$('.Streams_chat_more').click(function(){
				tool.more(_renderMore);
			});
		} else {
			this.niceScroll(function(){
				tool.more(_renderMore);
			});
		}

		$(tool.element).on(Q.Pointer.click, '.Streams_chat_message',
		function(e) {
			var $element = $(this);
			if (!$element.is('.Streams_chat_message')) {
				$element = $element.parents('.Streams_chat_message');
			}
			if (!$element[0].isOverflowed()) return;
			
			var $container = $element.parents('.Streams_chat_item');
			var displayName   = $('.Users_avatar_name', $container).text();

			if ($container.data('byuserid') === Q.Users.loggedInUserId()) {
				displayName = 'me';
			}

			Q.Dialogs.push({
				title  : 'Message from ' + displayName,
				content: '<div class="Streams_popup_content">' + $(e.target).html() + '</div>'
			});
		});

		// new message arrived
		Q.Streams.Stream.onMessage(state.publisherId, state.streamName, 'Streams/chat/message')
		.set(function(stream, message) {
			tool.renderMessages(tool.prepareMessages(message), function (snippets) {
				tool.$('.Streams_chat_noMessages').remove();
				var $scm = tool.$('.Streams_chat_messages'); 
				Q.each(snippets, function (key, $html) {
					$html.appendTo($scm).activate();
				}, {ascending: true});
				tool.processDOM();
			});
			tool.scrollToBottom();
		}, 'Streams/chat');

		// new user joined
		Q.Streams.Stream.onMessage(state.publisherId, state.streamName, 'Streams/join')
		.set(function(stream, message) {
			var messages = tool.prepareMessages(message, 'join');
			tool.renderNotification(Q.first(messages));
		}, 'Streams/chat');

		// new user left
		Q.Streams.Stream.onMessage(state.publisherId, state.streamName, 'Streams/leave')
		.set(function(stream, message) {
			var messages = tool.prepareMessages(message, 'leave');
			tool.renderNotification(Q.first(messages));
		}, 'Streams/chat');

		/*
		 * activate the composer
		 */
		tool.$('.Streams_chat_composer textarea')
		.plugin('Q/autogrow', {
			maxWidth: $(tool.element).width() 
		}, function () {
			this.plugin('Q/placeholders', {}, function () {
				if (!Q.info.isTouchscreen) {
					this.plugin('Q/clickfocus');
				}
			});
		}).keypress(function(event) {
			if (event.keyCode != 13) {
				return;
			}
			if (blocked) {
				return false;
			}
			var $this = $(this);
			var content = $this.val().trim();
			if (content.length == 0) {
				return false;
			}
			
			state.hadFocus = true;

			blocked = true;	
			$this.attr('disabled', 'disabled');
			
			if (Q.Users.loggedInUser) {
				_postMessage();
			} else {
				tool.element.setAttribute('data-Q-retain', '');
				Q.Users.login({
					onSuccess: { "Streams/chat": _postMessage },
					onCancel: { "Streams/chat": function () {
						if (!Q.info.isTouchscreen && state.hadFocus) {
							$this.plugin('Q/clickfocus');
						}
						state.hadFocus = false;
					}},
					onResult: { "Streams/chat": function () {
						blocked = false;
						$this.removeAttr('disabled');
					}},
					successUrl: window.location,
					calledBy: tool
				});
			}
			
			function _postMessage() {
				Q.Streams.Message.post({
					'publisherId': state.publisherId,
					'streamName' : state.streamName,
					'type'       : 'Streams/chat/message',
					'content'    : content
				}, function(err, args) {
					blocked = false;
					$this.removeAttr('disabled');
					if (err) {
						tool.renderError(err, args[0], args[1]);
						tool.scrollToBottom();
						return;
					}
					state.stream.refresh(null, {
						messages: true, 
						unlessSocket: true
					});
					$this.val('');
					if (!Q.info.isTouchscreen && state.hadFocus) {
						$this.plugin('Q/clickfocus');
					}
					if (Q.info.isTouchscreen) {
						$this.blur();
					}
					state.hadFocus = false;
				});
			}

			return false;
		});
	},

	niceScroll: function(callback) {
		if (Q.info.formFactor === 'desktop') {
			return false;
		}

		// TODO - when user scrolled in message container not running this function
		var isScrollNow = false,
			startY      = null;

		function touchstart(event){
			isScrollNow = true;
			startY      = event.originalEvent.touches[0].pageY;
		};

		function touchend(event){
			isScrollNow = false;
			startY      = null;
		};

		$(document.body)
			.bind('touchstart', touchstart)
			.bind('touchend', touchend)
			.bind('touchmove', function(event){

			if (isScrollNow && event.originalEvent.touches[0].pageY > startY) {
				// isset scollbar in window
				if (0 > $(window).height() - $(document.body).height()) {
					$(document.body)
						.unbind('touchstart')
						.unbind('touchend')
						.unbind('touchmove');

					tool.$('.Streams_chat_messages').scroll(function(event){
						if ($(this).scrollToTop() == 0) {
							callback && callback();
						}
					});
				} else {
					callback && callback();
				}
			}
		});
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
	* @return {String|null} data attribute or null
	*/
	findMessageData: function(action, byParam){
		var message = this.findMessage(action, byParam);
		return message ? message.data() : null;
	},

	findMessage: function(action, byParam) {
		var tool = this,
			query = '.Streams_chat_item';

		byParam = (byParam ? '['+byParam+']' : '');

		if (!action && byParam) {
			return tool.$(query+byParam);
		}

		if (typeof(action) == 'string') {
			switch(action){
				case 'first':
				case 'last':
					return tool.$(query+':'+action+byParam);
			}
		} else if (typeof(action) == 'number') {
			var messages = tool.$(query+byParam);
			return messages.length <= action ? $(messages.get(action)) : null;
		}

		return null;
	},

	scrollToBottom: function() {
		var state = this.state;
		var $scm = this.$('.Streams_chat_messages');
		var overflow = $scm.css('overflow-y');
		if (['scroll', 'auto'].indexOf(overflow) >= 0) {
			state.$scrolling = $scm;
		}
		if (!state.$scrolling) {
			var $element = $('body');
			$scm.parents().each(function () {
				var $this = $(this);
				var overflow = $this.css('overflow-y');
				if (['scroll', 'auto'].indexOf(overflow) >= 0) {
					$element = $this;
					return false;
				}
			});
			state.$scrolling = $element;
		}
		var top = $scm.offset().top - state.$scrolling.offset().top;
		state.$scrolling.animate({ 
			scrollTop: state.$scrolling[0].scrollHeight
		}, this.state.animations.duration);
	},

	scrollToTop: function() {
		$scm = this.$('.Streams_chat_messages');
		$scm.animate({ scrollTop: 0 }, this.state.animations.duration);
	},

	processDOM: function() {
		var state = this.state;
		this.$('.Streams_chat_message').each(function () {
			if (this.isOverflowed()) {
				this.style.cursor = 'pointer';
			}
		});
		if (!Q.info.isTouchscreen && state.hadFocus) {
			$(this.state.$inputElement).plugin('Q/clickfocus');
		}
		state.hadFocus = false;
	},
	
	refresh: function (callback) {
		
		var tool = this;
		var state = tool.state;
		
		function _render(messages) {
			Q.each(messages, function (ordinal) {
				state.earliest = ordinal;
				return false;
			}, {ascending: true, numeric: true});
		
			tool.render(function() {
				tool.renderMessages(
					tool.prepareMessages(messages), 
					function (snippets) {
						Q.each(snippets, function (key, $html) {
							tool.$('.Streams_chat_noMessages').remove();
							var $scm = tool.$('.Streams_chat_messages'); 
							$html.appendTo($scm).activate();
							$scm.off('scroll.Streams_chat')
							.on('scroll.Streams_chat', function () {
								state.lastScrollTop = $scm.scrollTop();
							});
						});
					}
				);
				
				Q.handle(callback, tool);
				tool.processDOM();
				tool.addEvents();
				
				Q.handle(state.onRefresh, tool);
			});
		
		}
		
		var p = new Q.Pipe();
		p.add(['stream', 'messages'], function (params, subjects) {
			state.stream = subjects.stream;
			_render.apply(subjects.messages, params.messages);
		});
		Q.Streams.retainWith(this)
		.get(state.publisherId, state.streamName, p.fill('stream'));
		tool.more(p.fill('messages'));
	}
});

Q.Template.set('Streams/chat/message/bubble',
	'<div class="Streams_chat_item {{classes}}" '+
			'data-byUserId="{{byUserId}}" '+
			'data-ordinal="{{ordinal}}">'+
		'<div class="Streams_chat_avatar" data-byUserId="{{byUserId}}"></div>'+
		'<div class="Streams_chat_timestamp" data-time="{{time}}"></div>'+
		'<div class="Streams_chat_bubble">'+
			'<div class="Streams_chat_tick"></div>'+
			'<div class="Streams_chat_message">{{content}}</div>'+
			'<div class="Q_clear"></div>'+
			'<div class="Q_clear"></div>'+
		'</div>'+
		'<div class="Q_clear"></div>'+
	'</div>'
);

Q.Template.set('Streams/chat/message/notification', 
	'<div class="Streams_chat_notification>'+
		'<div class="Streams_chat_timestamp" data-time="{{time}}"></div>'+
		'{{#visit}}'+
			'<b>{{displayName}}</b> visited'+
		'{{/visit}}'+
		'{{#join}}'+
			'<b>{{displayName}}</b> joined'+
		'{{/join}}'+
		'{{#leave}}'+
			'<b>{{displayName}}</b> left'+
		'{{/leave}}'+
	'</div>'
);

Q.Template.set('Streams/chat/message/error',
	'<div class="Streams_chat_item Q_error">'+
		'<div class="Streams_chat_container">'+
			'<div class="Streams_chat_timestamp" data-time="{{time}}"></div>'+
			'<div class="Streams_chat_error">'+
				'{{errorText}}'+
			'</div>'+
		'</div>'+
		'<div class="Q_clear"></div>'+
	'</div>'
);

Q.Template.set('Streams/chat/Streams_chat_noMessages', '<i class="Streams_chat_noMessages">No one has said anything</i>');

Q.Template.set('Streams/chat/main', 
	'<div class="Q_clear"></div>'+
	'<div class="Streams_chat_messages">'+
		'{{#isClick}}'+
			'<div class="Streams_chat_more">earlier comments</div>'+
		'{{/isClick}}'+
		'<!-- messages -->'+
	'</div>'+
	'<div class="Streams_chat_composer">'+
		'<textarea placeholder="{{placeholder}}"></textarea>'+
	'</div>'+
	'<hr />'+
	'<div class="Q_clear"></div>'
);

})(Q, jQuery);