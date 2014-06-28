flow-min
========

Transform stream which returns the minimum value from a stream of numeric data.


## Installation

``` bash
$ npm install flow-min
```


## Examples

``` javascript
var // Flow min stream generator:
	mStream = require( 'flow-min' );

var data = new Array( 1000 ),
	stream;

// Create some data...
for ( var i = 0; i < 1000; i++ ) {
	data[ i ] = Math.random();
}

// Create a new stream:
stream = mStream().stream();

// Add a listener:
stream.on( 'data', function( min ) {
	console.log( 'Min: ' + min );
});

// Write the data to the stream...
for ( var j = 0; j < data.length; j++ ) {
	stream.write( data[ j ] );
}
stream.end();
```

## Tests

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

