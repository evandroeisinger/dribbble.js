/*!
 * Dribbble JavaScript Library v1.0.0
 * http://evandroeisinger.com/dribbble
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Evandro Eisinger
 * http://evandroeisinger.com
 */

Dribbble = (function() {

	// api paths
	var paths = {
		shots:     'shots',
		rebounds:  'rebounds',
		following: 'following',
		players:   'players',
		followers: 'followers',
		draftees:  'draftees',
		comments:  'comments',
		likes:     'likes'
	},

	// callback function flow
	callback = function( data ){

		// create generic callback function name
		var time 	 = new Date().getTime(),
			callback = 'dribbble' + time.toString(),
			call     = data;

		// callback is encapsulated into the generic function
	 	window[callback] = function( response ){
	 		
	 		// remove json request
	 		var script = document.getElementById( callback );
	 			script.parentNode.removeChild( script );

	 		// call function
	 		return call( response );
	 		
	 	}

	 	// return the encapsulated callback function name
	 	return callback;
		
	},

	// error function
	error = function( message ){
	
		throw message;
	
	}

	return {

		// send request specified by data arguments
		get : function( data ) {
			
			// url args
			var url = {
				base : 'http://api.dribbble.com',
				path : '',
				options : ''
			}

			// parse request path
			for ( var arg in data.path ) {
		    	url.path += [ '/', data.path[ arg ] ].join( '' );
		 	}

		 	// set the jsonp encapsulated function
		 	data.options.callback = callback( data.callback );

		 	// parse request options
		 	for ( var option in data.options ) {
		    	url.options += [ url.options.length == 0 ? '?' : '&' , [ option , data.options[ option ] ].join( '=' ) ].join( '' );
		 	}

		 	// set request url
		 	var request = url.base + url.path + url.options;

		 	// create json request script
		 	var json = document.createElement( 'script' );
			    json.src = request;
			    json.id  = data.options.callback;
			
			// send request
			document.getElementsByTagName( 'head' )[0].appendChild( json );

		},

		// returns the specified list of shots
		list : function( category, callback, per_page, page ) {

			var data = {};
				data.path = {};

				// verify and set the category of the list to retrive
				data.path.get = paths.shots;
				category && typeof category === 'string' ? data.path.category = category : error('Category is required: debuts, everyone, popular. The category must to be a String.');
				
				// verify and set the callback function
				callback && typeof callback === 'function' ? data.callback = callback : error('Callback is required and must to be a Function.');

				// verify and set options
				data.options = {};
				per_page ? typeof per_page === 'number' ? data.options.per_page = per_page : error('The page limit must to be a Number.') : false;
				page ? typeof page === 'number' ? data.options.page = page : error('The page must to be a Number.') : false;
			
			// get the request		
			this.get( data );

		},

		// returns details of a specified shot
		shot : function( id, callback ) {
			
			var data = {};
				data.path = {};

				// verify and set the id of the shot to retrive
				data.path.type = paths.shots;
				id && typeof id === 'number' ? data.path.id = id : error('Shot id is required and must to be a Number.');
				
				// verify and set the callback function
				callback && typeof callback === 'function' ? data.callback = callback : error('Callback is required and must to be a Function.');

			// get the request		
			this.get( data );

		},

		// returns the set of comments of a specified shot
		comments : function( id, callback, per_page, page ) {

			var data = {};
				data.path = {};

				// verify and set the shot id of the comments to retrive
				data.path.get = paths.shots;
				id && typeof id === 'number' ? data.path.id = id : error('Shot id is required and must to be a Number.');
				data.path.object = paths.comments;

				// verify and set the callback function
				callback && typeof callback === 'function' ? data.callback = callback : error('Callback is required and must to be a Function.');

				// verify and set options
				data.options = {};
				per_page ? typeof per_page === 'number' ? data.options.per_page = per_page : error('The page limit must to be a Number.') : false;
				page ? typeof page === 'number' ? data.options.page = page : error('The page must to be a Number.') : false;
			
			// get the request		
			this.get( data );

		},

		// returns the set of rebounds (shots in response to a shot) of a specified shot
		rebounds : function( id, callback, per_page, page ) {

			var data = {};
				data.path = {};

				// verify and set the shot id of the rebounds to retrive
				data.path.get = paths.shots;
				id && typeof id === 'number' ? data.path.id = id : error('Shot id is required and must to be a Number.');
				data.path.object = paths.rebounds;

				// verify and set the callback function
				callback && typeof callback === 'function' ? data.callback = callback : error('Callback is required and must to be a Function.');

				// verify and set options
				data.options = {};
				per_page ? typeof per_page === 'number' ? data.options.per_page = per_page : error('The page limit must to be a Number.') : false;
				page ? typeof page === 'number' ? data.options.page = page : error('The page must to be a Number.') : false;
			
			// get the request		
			this.get( data );

		},

		// returns shots liked of a specified player
		likes : function( id, callback, per_page, page ) {

			var data = {};
				data.path = {};

				// verify and set the id of the player to retrive his likes
				data.path.type = paths.players;
				id && typeof id === 'number' || typeof id === 'string' ? data.path.id = id : error('Player id is required and must to be a Number or a String.');
				data.path.object = paths.shots;
				data.path.filter = paths.likes;

				// verify and set the callback function
				callback && typeof callback === 'function' ? data.callback = callback : error('Callback is required and must to be a Function.');

				// verify and set options
				data.options = {};
				per_page ? typeof per_page === 'number' ? data.options.per_page = per_page : error('The page limit must to be a Number.') : false;
				page ? typeof page === 'number' ? data.options.page = page : error('The page must to be a Number.') : false;
			
			// get the request		
			this.get( data );

		},

		// returns the profile of a specified player
		player : function( id, callback ) {

			var data = {};
				data.path = {};

				// verify and set the id of the player profile to retrive
				data.path.type = paths.players;
				id && typeof id === 'number' || typeof id === 'string' ? data.path.id = id : error('Player id is required and must to be a Number or a String.');
				
				// verify and set the callback function
				callback && typeof callback === 'function' ? data.callback = callback : error('Callback is required and must to be a Function.');

			// get the request		
			this.get( data );
			
		},

		// returns the most recent shots of a specified player
		shots : function( id, callback, per_page, page ) {

			var data = {};
				data.path = {};

				// verify and set the id of the player shots to retrive
				data.path.type = paths.players;
				id && typeof id === 'number' || typeof id === 'string' ? data.path.id = id : error('Player id is required and must to be a Number or a String.');
				data.path.object = paths.shots;

				// verify and set the callback function
				callback && typeof callback === 'function' ? data.callback = callback : error('Callback is required and must to be a Function.');

				// verify and set options
				data.options = {};
				per_page ? typeof per_page === 'number' ? data.options.per_page = per_page : error('The page limit must to be a Number.') : false;
				page ? typeof page === 'number' ? data.options.page = page : error('The page must to be a Number.') : false;
			
			// get the request		
			this.get( data );
			
		},

		// returns the followers of a specified playe
		followers : function( id, callback, per_page, page ) {

			var data = {};
				data.path = {};

				// verify and set the id of the player followers to retrive
				data.path.type = paths.players;
				id && typeof id === 'number' || typeof id === 'string' ? data.path.id = id : error('Player id is required and must to be a Number or a String.');
				data.path.object = paths.followers;

				// verify and set the callback function
				callback && typeof callback === 'function' ? data.callback = callback : error('Callback is required and must to be a Function.');

				// verify and set options
				data.options = {};
				per_page ? typeof per_page === 'number' ? data.options.per_page = per_page : error('The page limit must to be a Number.') : false;
				page ? typeof page === 'number' ? data.options.page = page : error('The page must to be a Number.') : false;
			
			// get the request		
			this.get( data );
			
		},

		// returns the following players of a specified player or the most recent shots published by those the player is following
		following : function( id, shots, callback, per_page, page ) {

			var data = {};
				data.path = {};

				// verify and set the id of the player 
				data.path.type = paths.players;
				id && typeof id === 'number' || typeof id === 'string' ? data.path.id = id : error('Player id is required and must to be a Number or a String.');
				shots ? data.path.filter = paths.shots : false;
				data.path.object = paths.following;

				// verify and set the callback function
				callback && typeof callback === 'function' ? data.callback = callback : error('Callback is required and must to be a Function.');

				// verify and set options
				data.options = {};
				per_page ? typeof per_page === 'number' ? data.options.per_page = per_page : error('The page limit must to be a Number.') : false;
				page ? typeof page === 'number' ? data.options.page = page : error('The page must to be a Number.') : false;
			
			// get the request		
			this.get( data );

		},

		// returns the list of players drafted by the specified player
		draftees : function( id, callback, per_page, page ) {

			var data = {};
				data.path = {};

				// verify and set the id of the player draftees to retrive
				data.path.type = paths.players;
				id && typeof id === 'number' || typeof id === 'string' ? data.path.id = id : error('Player id is required and must to be a Number or a String.');
				data.path.object = paths.draftees;

				// verify and set the callback function
				callback && typeof callback === 'function' ? data.callback = callback : error('Callback is required and must to be a Function.');

				// verify and set options
				data.options = {};
				per_page ? typeof per_page === 'number' ? data.options.per_page = per_page : error('The page limit must to be a Number.') : false;
				page ? typeof page === 'number' ? data.options.page = page : error('The page must to be a Number.') : false;
			
			// get the request		
			this.get( data );
			
		}
	}

}());