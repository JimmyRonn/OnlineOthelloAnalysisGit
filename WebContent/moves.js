/**
 * 
 */

/*
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
*/

function update_valid_moves()
{
	valid_moves[0] = 11;
	valid_moves[1] = 12;
	valid_moves[2] = 21;
	num_valid_moves = 3;
}