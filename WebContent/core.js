/**
 * 
 */

var board = new Uint8Array(128);
var ILLEGAL = -1;
var BLACKSQ = 0;
var EMPTY = 1;
var WHITESQ = 2;
var OUTSIDE = 3;

function setup_board()
{
	for ( i = 0; i < 10; i++ )
	{
		for ( j = 0; j < 10; j++ ) {
			pos = 10 * i + j;
			if ( (i == 0) || (i == 9) || (j == 0) || (j == 9) )
			{
				board[pos] = OUTSIDE;
			}
			else
			{
				board[pos] = EMPTY;
			}
		}
	}
	board[22] = WHITESQ;
	
	board[44] = WHITESQ;
	board[45] = BLACKSQ;
	board[54] = BLACKSQ;
	board[55] = WHITESQ;
}

function render_board()
{
	for ( i = 1; i <= 8; i++ )
	{
		for ( j = 1; j <= 8; j++ ) {
			pos = 10 * i + j;
			if( board[pos] == EMPTY )
			{
				document.getElementById(pos.toString()).setAttribute('src', 'ee.gif');
			}
			else if( board[pos] == BLACKSQ )
			{
				document.getElementById(pos.toString()).setAttribute('src', 'bb.gif');
			}
			else if( board[pos] == WHITESQ )
			{
				document.getElementById(pos.toString()).setAttribute('src', 'ww.gif');
			}
		}
	}
}

function update_count()
{
	document.getElementById('black_count').innerHTML = "Black: " + disc_count(BLACKSQ).toString();
	document.getElementById('white_count').innerHTML = "White: " + disc_count(WHITESQ).toString();
}

function disc_count( side_to_move ) {
	var sum = 0;

	for ( i = 1; i <= 8; i++ )
	{
		for ( j = 10 * i + 1; j <= 10 * i + 8; j++ )
    	{
			if ( board[j] == side_to_move )
			{
				sum += 1;
			}
		}
	}
	
	return sum;
}
