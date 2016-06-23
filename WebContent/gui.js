/**
 * 
 */
function render_board()
{
	for ( i = 1; i <= 8; i++ )
	{
		for ( j = 1; j <= 8; j++ ) {
			pos = 10 * i + j;
			if( board[pos] == EMPTY )
			{
				document.getElementById(pos.toString()).setAttribute('src', './img/ee.gif');
			}
			else if( board[pos] == BLACKSQ )
			{
				document.getElementById(pos.toString()).setAttribute('src', './img/bb.gif');
			}
			else if( board[pos] == WHITESQ )
			{
				document.getElementById(pos.toString()).setAttribute('src', './img/ww.gif');
			}
		}
	}
	
	if( show_valid_moves == 1 )
	{
		for( i = 0; i < num_valid_moves; i++ )
		{		
			document.getElementById(valid_moves[i].toString()).setAttribute('src', './img/pp.gif');
		}
	}
}

function toggle_show_valid_moves()
{
	if( show_valid_moves == 0 )
		show_valid_moves = 1;
	else
		show_valid_moves = 0;
	
	update_valid_moves();
	render_board();
}