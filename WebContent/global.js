/**
 * 
 */

var ILLEGAL = -1;
var BLACKSQ = 0;
var EMPTY = 1;
var WHITESQ = 2;
var OUTSIDE = 3;

var side_to_move = BLACKSQ;
var board = new Uint8Array(128);
var valid_moves = new Array(60);
var num_valid_moves = 0;
for( i = 0; i < 60; i++ ) 
{ 
	valid_moves[i] = 0; 
}

var show_valid_moves = 0;