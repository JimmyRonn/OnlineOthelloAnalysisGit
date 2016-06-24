/**
 * 
 */

var dir_mask = [
  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
  0,  81,  81,  87,  87,  87,  87,  22,  22,   0,
  0,  81,  81,  87,  87,  87,  87,  22,  22,   0,
  0, 121, 121, 255, 255, 255, 255, 182, 182,   0,
  0, 121, 121, 255, 255, 255, 255, 182, 182,   0,
  0, 121, 121, 255, 255, 255, 255, 182, 182,   0,
  0, 121, 121, 255, 255, 255, 255, 182, 182,   0,
  0,  41,  41, 171, 171, 171, 171, 162, 162,   0,
  0,  41,  41, 171, 171, 171, 171, 162, 162,   0,
  0,   0,   0,   0,   0,   0,   0,   0,   0,   0 
 ];
var move_offset = [ 1, -1, 9, -9, 10, -10, 11, -11 ];


function valid_move( move, side_to_move ) 
{
	var i;
	var pos;
	var count;

	if ( (move < 11) || (move > 88) || (board[move] != EMPTY) )
		return 0;

	for ( i = 0; i < 8; i++ )
	{
		if ( dir_mask[move] & (1 << i) ) 
		{
			for ( pos = move + move_offset[i], count = 0; 
			board[pos] == OPP( side_to_move ); 
			pos += move_offset[i], count++ )
				;
			if ( board[pos] == side_to_move ) {
				if ( count >= 1 )
				{
					return 1;
				}
			}
		}
	}

  return 0;
}

function update_valid_moves()
{
	var valid_moves_found = 0;
	for ( i = 1; i <= 8; i++ )
	{
		for ( j = 10 * i + 1; j <= 10 * i + 8; j++ )
    	{
			if ( board[j] == EMPTY )
			{
				if( valid_move(j, side_to_move) )
				{
					valid_moves[valid_moves_found] = j;
					valid_moves_found++;
				}
			}
		}
	}

	for( ; valid_moves_found < num_valid_moves; valid_moves_found++ )
	{
		valid_moves[valid_moves_found] = 0;
	}
	num_valid_moves = valid_moves_found;
}