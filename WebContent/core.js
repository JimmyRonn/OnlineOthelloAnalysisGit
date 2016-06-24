/**
 * 
 */

function OPP( color )
{
	return (BLACKSQ + WHITESQ) - color;
}

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
	
	board[44] = WHITESQ;
	board[45] = BLACKSQ;
	board[54] = BLACKSQ;
	board[55] = WHITESQ;
}

function update_count()
{
	document.getElementById('count').innerHTML = "B" + disc_count(BLACKSQ).toString() + " - W" + disc_count(WHITESQ).toString();
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
