Dribbble.js
========

A simple pure javascript library created to help develop applications using Dribbble API.

* Source: [https://github.com/evandroeisinger/dribbble](https://github.com/evandroeisinger/dribbble)
* Homepage: [http://evandroeisinger.com/dribbble](http://evandroeisinger.com/dribbble)

### Require

``` js
<script type="text/javascript" src="js/dribbble.js"></script>
```

### Usage

``` js

// get the most popular shots
Dribbble.list( 'popular', function( response ){
	
	// code here

});

// get player profile
Dribbble.player( 'fguth', function( response ){
	
	// code here

});

// get list of players followed by a player 
Dribbble.following( 'fguth', false, function( response ){
	
	// code here

});

// get shots of the players followed by a player 
Dribbble.following( 'fguth', true, function( response ){
	
	// code here

});

```

----

<table>
  <tr>
    <td><strong>Method</strong></td>
    <td><strong>Description</strong></td>
    <td><strong>Pagination</strong></td>
  </tr>
  <tr>
    <td>Dribbble.list( String, Function )</td>
    <td>Returns the specified list of shots of the following values: debuts, everyone, popular.</td>
    <td>True</td>
  </tr>
  <tr>
    <td>Dribbble.player( Number/String, Function )</td>
    <td>Returns profile details for a player specified by id or nickname.</td>
    <td>False</td>
  </tr>
  <tr>
    <td>Dribbble.shots( Number/String, Function )</td>
    <td>Returns the most recent shots for the player specified by id or nickname.</td>
    <td>True</td>
  </tr>
  <tr>
    <td>Dribbble.shot( Number, Function )</td>
    <td>Returns details for a shot specified by id.</td>
    <td>False</td>
  </tr>
  <tr>
    <td>Dribbble.comments( Number, Function )</td>
    <td>Returns the set of comments for the shot specified by id.</td>
    <td>True</td>
  </tr>
  <tr>
    <td>Dribbble.likes( Number/String, Function )</td>
    <td>Returns shots liked by the player specified by id or nickname.</td>
    <td>True</td>
  </tr>
  <tr>
    <td>Dribbble.draftees( Number/String, Function )</td>
    <td>Returns the list of players drafted by the player specified by id or nickname.</td>
    <td>True</td>
  </tr>
  <tr>
    <td>Dribbble.followers( Number/String, Function )</td>
    <td>Returns the list of followers for a player specified by id or nickname.</td>
    <td>True</td>
  </tr>
   <tr>
    <td>Dribbble.following( Number/String, Boolean,Function )</td>
    <td>Returns the list of players followed by the player specified by id or nickname or the most recent shots published by those the player is following.</td>
    <td>True</td>
  </tr>
   <tr>
    <td>Dribbble.rebounds( Number, Function )</td>
    <td>Returns the set of rebounds (shots in response to a shot) for the shot specified by id.</td>
    <td>True</td>
  </tr>
</table>

#### Callback

All methods Dribbble.js methods require a callback function.

``` js

// callback method to view the response data
var view = function( data ) {
	console.log( data )
}

// get the most 10 popular shots
Dribbble.list( 'popular', view );

```

### Pagination

API calls that return a pageable list share standard paging parameters. Paging may be limited, both in the total number of pages and the number of results per page.

``` js

// get the most 10 popular shots
Dribbble.list( 'popular', callback, 10 );

// get the second page of most popular shots
Dribbble.list( 'popular', callback, 10, 2 );

```

## Browser Support

All browsers (Firefox, Chrome, Safari, Opera, IE7+) should be supported. Please [open an issue](https://github.com/evandroeisinger/dribbble/issues) if Dribbble.js doesn't work on a particular browser.

## Contributing

Anyone and everyone is welcome to [contribute](https://github.com/evandroeisinger/dribbble/fork).

----

[Licensed under the MIT license.](http://www.opensource.org/licenses/mit-license.php)

Copyright © 2012 [Evandro Eisinger](http://evandroeisinger.com)