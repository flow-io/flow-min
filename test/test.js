
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Stream spec:
	spec = require( 'stream-spec' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	mStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'min', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( mStream ).to.be.a( 'function' );
	});

	it( 'should provide a method to get the initial accumulator value', function test() {
		var rStream = mStream();
		expect( rStream.value() ).to.be.a( 'number' );
	});

	it( 'should provide a method to set the initial accumulator value', function test() {
		var rStream = mStream();
		rStream.value( 5 );
		assert.strictEqual( rStream.value(), 5 );
	});

	it( 'should not allow a non-numeric initial accumulator value', function test() {
		var rStream = mStream();
		
		expect( badValue( '5' ) ).to.throw( Error );
		expect( badValue( [] ) ).to.throw( Error );
		expect( badValue( {} ) ).to.throw( Error );
		expect( badValue( null ) ).to.throw( Error );
		expect( badValue( undefined ) ).to.throw( Error );
		expect( badValue( NaN ) ).to.throw( Error );
		expect( badValue( function(){} ) ).to.throw( Error );

		function badValue( value ) {
			return function() {
				rStream.value( value );
			};
		}
	});

	it( 'should return the minimum value of piped data', function test( done ) {
		var data, rStream, s, MIN = 1;

		// Simulate some data...
		data = [ 4, 3, 5, 9, 4, 4, 5, 2, 6, MIN, 5, 6 ];

		// Create a new min stream:
		rStream = mStream().stream();

		// Create the stream spec:
		s = spec( rStream )
			.through();

		// Mock reading from the stream:
		utils.readStream( rStream, onRead );

		// Validate the stream when the stream closes:
		rStream.on( 'close', s.validate );

		// Mock piping a data to the stream:
		utils.writeStream( data, rStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;
			assert.deepEqual( actual[ 0 ], MIN );
			done();
		} // end FUNCTION onRead()
	});

	it( 'should find the min using an arbitrary starting value', function test( done ) {
		var data, reducer, rStream,
			MIN = -1;

		// Simulate some data...
		data = [ 4, 3, 5, 9, 4, 4, 5, 2, 6, 1, 5, 6 ];

		// Create a new min stream generator:
		reducer = mStream();

		// Set the initial min and create a new stream:
		rStream = reducer
			.value( MIN )
			.stream();

		// Mock reading from the stream:
		utils.readStream( rStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, rStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;
			assert.deepEqual( actual[ 0 ], MIN );
			done();
		} // end FUNCTION onRead()
	});

});