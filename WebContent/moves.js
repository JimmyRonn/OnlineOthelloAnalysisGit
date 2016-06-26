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


var board_region = [
  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
  0,   1,   1,   2,   2,   2,   2,   3,   3,   0,
  0,   1,   1,   2,   2,   2,   2,   3,   3,   0,
  0,   4,   4,   5,   5,   5,   5,   6,   6,   0,
  0,   4,   4,   5,   5,   5,   5,   6,   6,   0,
  0,   4,   4,   5,   5,   5,   5,   6,   6,   0,
  0,   4,   4,   5,   5,   5,   5,   6,   6,   0,
  0,   7,   7,   8,   8,   8,   8,   9,   9,   0,
  0,   7,   7,   8,   8,   8,   8,   9,   9,   0,
  0,   0,   0,   0,   0,   0,   0,   0,   0,   0
];



function DrctnlFlips_six( sq, inc, color, oppcol ) {
	var move = sq + inc;

	if ( board[move] == oppcol ) {
		move += inc;
		if ( board[move] == oppcol ) {
			move += inc;
			if ( board[move] == oppcol ) {
				move += inc;
				if ( board[move] == oppcol ) {
					move += inc;
					if ( board[move] == oppcol ) {
						move += inc;
						if ( board[move] == oppcol )
							move += inc;
					}
				}
			}
		}
		if ( board[move] == color ) {
			move -= inc;
			while ( move != sq ) {
				board[move] = color;
				//*(t_flip_stack++) = pt;
				move -= inc;
			};
		}
	}
}


function DrctnlFlips_four( sq, inc, color, oppcol ) {
	var move = sq + inc;

	if ( board[move] == oppcol ) {
		move += inc;
		if ( board[move] == oppcol ) {
			move += inc;
			if ( board[move] == oppcol ) {
				move += inc;
				if ( board[move] == oppcol ) {
					pt += inc;
				}
			}
		}
		if ( board[move] == color ) {
			move -= inc;
			while( move != sq ) {
				board[move] = color;
				//*(t_flip_stack++) = pt;
				move -= inc;
			};
		}
	}
}


function DoFlips_no_hash( sqnum, color ) {
	var opp_color = OPP( color );
	var sq = sqnum;
	// int **old_flip_stack, **t_flip_stack;

	// old_flip_stack = t_flip_stack = flip_stack;
	// sq = &board[sqnum];

	switch ( board_region[sqnum] ) {
	case 1:
		DrctnlFlips_six( sq, 1, color, opp_color );
		DrctnlFlips_six( sq, 11, color, opp_color );
		DrctnlFlips_six( sq, 10, color, opp_color );
		break;
	case 2:
		DrctnlFlips_four( sq, 1, color, opp_color );
		DrctnlFlips_four( sq, 11, color, opp_color );
		DrctnlFlips_six( sq, 10, color, opp_color );
		DrctnlFlips_four( sq, 9, color, opp_color );
		DrctnlFlips_four( sq, -1, color, opp_color );
		break;
	case 3:
		DrctnlFlips_six( sq, 10, color, opp_color );
		DrctnlFlips_six( sq, 9, color, opp_color );
		DrctnlFlips_six( sq, -1, color, opp_color );
		break;
	case 4:
		DrctnlFlips_four( sq, -10, color, opp_color );
		DrctnlFlips_four( sq, -9, color, opp_color );
		DrctnlFlips_six( sq, 1, color, opp_color );
		DrctnlFlips_four( sq, 11, color, opp_color );
		DrctnlFlips_four( sq, 10, color, opp_color );
		break;
	case 5:
		DrctnlFlips_four( sq, -11, color, opp_color );
		DrctnlFlips_four( sq, -10, color, opp_color );
		DrctnlFlips_four( sq, -9, color, opp_color );
		DrctnlFlips_four( sq, 1, color, opp_color );
		DrctnlFlips_four( sq, 11, color, opp_color );
		DrctnlFlips_four( sq, 10, color, opp_color );
		DrctnlFlips_four( sq, 9, color, opp_color );
		DrctnlFlips_four( sq, -1, color, opp_color );
		break;
	case 6:
		DrctnlFlips_four( sq, -10, color, opp_color );
		DrctnlFlips_four( sq, -11, color, opp_color );
		DrctnlFlips_six( sq, -1, color, opp_color );
		DrctnlFlips_four( sq, 9, color, opp_color );
		DrctnlFlips_four( sq, 10, color, opp_color );
		break;
	case 7:
		DrctnlFlips_six( sq, -10, color, opp_color );
		DrctnlFlips_six( sq, -9, color, opp_color );
		DrctnlFlips_six( sq, 1, color, opp_color );
		break;
	case 8:
		DrctnlFlips_four( sq, -1, color, opp_color );
		DrctnlFlips_four( sq, -11, color, opp_color );
		DrctnlFlips_six( sq, -10, color, opp_color );
		DrctnlFlips_four( sq, -9, color, opp_color );
		DrctnlFlips_four( sq, 1, color, opp_color );
		break;
	case 9:
		DrctnlFlips_six( sq, -10, color, opp_color );
		DrctnlFlips_six( sq, -11, color, opp_color );
		DrctnlFlips_six( sq, -1, color, opp_color );
		break;
	default:
		break;
	}

	// flip_stack = t_flip_stack;
	// return t_flip_stack - old_flip_stack;
}

function make_move( side_to_move, move ) {
	var flipped;
	var diff1;
	var diff2;

	// TODO: Implememnt DoFlips_no_hash
    flipped = DoFlips_no_hash( move, side_to_move );
    //if ( flipped == 0 )
    //	return 0;
    //hash_stored1[disks_played] = hash1;
    //hash_stored2[disks_played] = hash2;
	
    //flip_count[disks_played] = flipped;

    board[move] = side_to_move;

    /**
    if ( side_to_move == BLACKSQ ) {
    	piece_count[BLACKSQ][disks_played + 1] = 
    		piece_count[BLACKSQ][disks_played] + flipped + 1;
	    piece_count[WHITESQ][disks_played + 1] = 
	    	piece_count[WHITESQ][disks_played] - flipped;
    }
    else {
    	piece_count[WHITESQ][disks_played + 1] = 
    		piece_count[WHITESQ][disks_played] + flipped + 1;
	    piece_count[BLACKSQ][disks_played + 1] =
	    	piece_count[BLACKSQ][disks_played] - flipped;
	  }
	*/

    //disks_played++;
    return flipped;
}

function valid_move_array_contains(move)
{
	var i = valid_moves.length;
	while (i--) {
		if (valid_moves[i] === move) {
			return true;
		}
	}
	return false;
}

function move(sq)
{
	var move_to_do = sq*1;
	if( valid_move_array_contains(move_to_do) )
	{
		make_move( side_to_move, sq*1 );
		side_to_move = OPP( side_to_move );
		update_count();
		update_valid_moves();
		render_board();
	}
}