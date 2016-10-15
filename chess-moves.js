function identifyPiece() {
	
	if(currentPiece.player != player && !isForCheckingCheck)
	{
		illegalMove();
		return;
	}
	else if(currentPiece.isPawn)
	{
		checkPawnMove();
	}
	else if(currentPiece.isRook)
	{
		checkRookMove();
	}
	else if(currentPiece.isKnight)
	{
		checkKnightMove();
	}
	else if(currentPiece.isBishop)
	{
		checkBishopMove();
	}
	else if(currentPiece.isKing)
	{
		checkKingMove();
	}
	else if(currentPiece.isQueen)
	{
		checkQueenMove();
	}
}

function checkKnightMove() {
	if(
	//1 to the right and up 2
	(squareOne.xCoordinate + 1 == squareTwo.xCoordinate && squareOne.yCoordinate + 2 == squareTwo.yCoordinate)
	//2 to the right and up 1
	|| (squareOne.xCoordinate + 2 == squareTwo.xCoordinate && squareOne.yCoordinate + 1 == squareTwo.yCoordinate)
	//1 to the left and up 2
	|| (squareOne.xCoordinate - 1 == squareTwo.xCoordinate && squareOne.yCoordinate + 2 == squareTwo.yCoordinate)
	//2 to the left and up 1
	|| (squareOne.xCoordinate - 2 == squareTwo.xCoordinate && squareOne.yCoordinate + 1 == squareTwo.yCoordinate)
	//1 to the left and down 2
	|| (squareOne.xCoordinate - 1 == squareTwo.xCoordinate && squareOne.yCoordinate - 2 == squareTwo.yCoordinate)
	//1 to the right and down 2
	|| (squareOne.xCoordinate + 1 == squareTwo.xCoordinate && squareOne.yCoordinate - 2 == squareTwo.yCoordinate)
	//1 down and 2 to the left
	|| (squareOne.xCoordinate - 2 == squareTwo.xCoordinate && squareOne.yCoordinate - 1 == squareTwo.yCoordinate)
	//1 down and 2 to the right
	|| (squareOne.xCoordinate + 2 == squareTwo.xCoordinate && squareOne.yCoordinate - 1 == squareTwo.yCoordinate)
	)
	{
		completeMove();
	}
	else
	{
		illegalMove();
	}
}

function checkRookMove() {

	if(squareTwo.yCoordinate == squareOne.yCoordinate)
	{
		var tempX;
		var tempY = squareOne.yCoordinate;
		var validMove = true;
		
		if(squareTwo.xCoordinate > squareOne.xCoordinate)
		{
			tempX = squareTwo.xCoordinate - 1;
			
			while(tempX > squareOne.xCoordinate)
			{
				if(getIndexOfPiece(tempX, tempY) > -1)
				{
					validMove = false;
					break;
				}
				
				tempX--;
			}
		}
		else
		{
			tempX = squareTwo.xCoordinate + 1;
			
			while(tempX < squareOne.xCoordinate)
			{
				if(getIndexOfPiece(tempX, tempY) > -1)
				{
					validMove = false;
					break;
				}
				
				tempX++;
			}
		}
		
		if(validMove)
		{
			completeMove();
		}
		
		else
		{
			illegalMove();
		}
		
	}
	else if(squareTwo.xCoordinate == squareOne.xCoordinate)
	{
		var tempX = squareTwo.xCoordinate;
		var tempY;
		var validMove = true;
		
		if(squareTwo.yCoordinate > squareOne.yCoordinate)
		{
			 tempY = squareTwo.yCoordinate - 1;
			 
			while(tempY > squareOne.yCoordinate)
			{
				if(getIndexOfPiece(tempX, tempY) > -1)
				{
					validMove = false;
					break;
				}
				
				tempY--;
			}
			 
		}
		else
		{
			tempY = squareTwo.yCoordinate + 1;
			
			while(tempY < squareOne.yCoordinate)
			{
				if(getIndexOfPiece(tempX, tempY) > -1)
				{
					validMove = false;
					break;
				}
				
				tempY++;
			}

			
		}
		
		if(validMove)
		{
			completeMove();
		}
		else
		{
			illegalMove();
		}
		
	}
	else
	{
		illegalMove();
	}
}

function checkPawnMove() {

	if(player == "WhitePlayer")
	{	
		if(!currentPiece.pawnHadFirstMove && (squareTwo.yCoordinate - squareOne.yCoordinate == 2))
		{
			completePawnMove(-2);
			
			if(outputDiv.innerHTML == "WhitePlayer illegal move")
			{
				completePawnMove(-1);	
			}
			
			currentPiece.pawnHadFirstMove = true;
		}
		else
		{
			completePawnMove(-1);
		}
	}
	
	else if (player == "BlackPlayer")
	{		
		if(!currentPiece.pawnHadFirstMove && (squareOne.yCoordinate - squareTwo.yCoordinate == 2))
		{
			completePawnMove(2);
			currentPiece.pawnHadFirstMove = true;
		}
		
		else
		{
			completePawnMove(1);
		}
	}
	else
	{
		alert("Neither WhitePlayer nor BlackPlayer?!");
	}

}

function completePawnMove(increment) {		
		
		if(getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate) > -1)
		{
			if(pieceTracker[getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate)].isKing)
			{
				illegalMove();
				return;
			}
		}
		
		if(squareTwo.yCoordinate + increment == squareOne.yCoordinate
		&& squareTwo.xCoordinate == squareOne.xCoordinate
		&& getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate) > -1)
		{
			illegalMove();
		}
		
		else if(squareTwo.yCoordinate + increment == squareOne.yCoordinate
		&& squareTwo.yCoordinate + increment == squareOne.yCoordinate
		&& getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate) > -1)
		{
			completeTakingMove();
		}
		
		else if(squareTwo.yCoordinate + increment == squareOne.yCoordinate
		&& squareTwo.xCoordinate == squareOne.xCoordinate)
		{
			completeMove();
		}
		
		else if(squareTwo.yCoordinate + increment == squareOne.yCoordinate
		&& squareTwo.xCoordinate == squareOne.xCoordinate)
		{
			completeMove();
		}
		
		else
		{
			illegalMove();
		}

}

function checkBishopMove() {
	
	//Right and up OR left and down
	if(squareTwo.xCoordinate - squareOne.xCoordinate == squareTwo.yCoordinate - squareOne.yCoordinate)
	{
		//Right and up
		if(squareTwo.xCoordinate > squareOne.xCoordinate && squareTwo.yCoordinate > squareOne.yCoordinate)
		{	
			var tempX;
			var tempY;
			var validMove = true;		

			tempX = squareTwo.xCoordinate - 1;
			tempY = squareTwo.yCoordinate - 1;
			
			while(tempX > squareOne.xCoordinate && tempY > squareOne.yCoordinate)
			{
				if(getIndexOfPiece(tempX, tempY) > -1)
				{
					validMove = false;
					break;
				}
				
				tempX--;
				tempY--;
			}
				
			if(validMove)
			{
				completeMove();
			}
			else
			{
				illegalMove();
			}	
		}
		//Down and left
		else
		{
			var tempX;
			var tempY;
			var validMove = true;		

			tempX = squareTwo.xCoordinate + 1;
			tempY = squareTwo.yCoordinate + 1;
			
			while(tempX < squareOne.xCoordinate && tempY < squareOne.yCoordinate)
			{
				if(getIndexOfPiece(tempX, tempY) > -1)
				{
					validMove = false;
					break;
				}
				
				tempX++;
				tempY++;
			}
				
			if(validMove)
			{
				completeMove();
			}
			else
			{
				illegalMove();
			}
			
		}

	}
	// //Left and up OR right and down
	else if(squareOne.xCoordinate - squareTwo.xCoordinate == squareTwo.yCoordinate - squareOne.yCoordinate)
	{
		//Left and up
		if(squareTwo.xCoordinate < squareOne.xCoordinate)
		{
			var tempX;
			var tempY;
			var validMove = true;		

			tempX = squareTwo.xCoordinate + 1;
			tempY = squareTwo.yCoordinate - 1;
			
			while(tempX < squareOne.xCoordinate && tempY > squareOne.yCoordinate)
			{
				if(getIndexOfPiece(tempX, tempY) > -1)
				{
					validMove = false;
					break;
				}
					tempX++;
					tempY--;	
			}
				
			if(validMove)
			{
				completeMove();
			}
			else
			{
				illegalMove();
			}	
		}
		//Right and down
		else if(squareTwo.xCoordinate > squareOne.xCoordinate)
		{
			var tempX;
			var tempY;
			var validMove = true;		

			tempX = squareTwo.xCoordinate - 1;
			tempY = squareTwo.yCoordinate + 1;
			
			while(tempX > squareOne.xCoordinate && tempY < squareOne.yCoordinate)
			{
				if(getIndexOfPiece(tempX, tempY) > -1)
				{
					validMove = false;
					break;
				}
					tempX--;
					tempY++;	
			}
				
			if(validMove)
			{
				completeMove();
			}
			else
			{
				illegalMove();
			}	
		}
		else
		{
			console.log("Unhandled Bishop move...");
		}
	}
	else
	{
		illegalMove();
	}	
}

function checkQueenMove() {
	
	//Queen = Bishop + Rook
	checkRookMove();
	
	if(isIllegalMove)
	{
		checkBishopMove();
	}
		
}

function checkKingMove() {
	
	//King is the same as Queen, but can only move 1 in each direction
	if(squareTwo.xCoordinate - squareOne.xCoordinate > 1 || squareTwo.yCoordinate - squareOne.yCoordinate > 1
	|| squareOne.xCoordinate - squareTwo.xCoordinate > 1 || squareOne.yCoordinate - squareTwo.yCoordinate > 1)
	{
		illegalMove();
	}
	else
	{
		checkQueenMove();
	}
}

function completeMove() {
	
	if(isForCheckingCheck)
	{
		isCheck = true;
		//Return because don't want to change any coordinates for a 'simulated' move
		return;
	}
	
	if(pieceTrackerContainsPiece(squareTwo.xCoordinate, squareTwo.yCoordinate))
	{
		completeTakingMove();
	}
	else
	{
		var pieceIndex2 = getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate);
		
		currentPiece.xCoordinate = squareTwo.xCoordinate;
		currentPiece.yCoordinate = squareTwo.yCoordinate;
		currentPiece.divName = squareTwo.divName;
		
		displayPieceImage();
	}
}

function completeTakingMove() {
	
	var pieceIndex2 = getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate);
	
	if(pieceTracker[pieceIndex2].player == player)
	{
		illegalMove();
		return;
	}
	
	pieceTracker[pieceIndex2].pieceIsAlive = false;

	pieceTracker[pieceIndex2].xCoordinate = -1;
	pieceTracker[pieceIndex2].yCoordinate = -1;

	currentPiece.xCoordinate = squareTwo.xCoordinate;
	currentPiece.yCoordinate = squareTwo.yCoordinate;
	currentPiece.divName = squareTwo.divName;
	
	displayPieceImage();		
}

function illegalMove() {
	
	if(isForCheckingCheck)
	{
		return;			
	}
	
	isIllegalMove = true;
	outputMessage(player + " illegal move");
}

function checkCheck() {
	
	if(currentPiece.isPawn)
	{
		return;
	}
	
	isForCheckingCheck = true;
	
	// Ok, to check if the game is in a 'Check' state:
	// - Check if every piece in the pieceTracker list is able to move to the King in one legal move
	// - If any piece can, the player owner of this piece is NOT in Check - the other player is in Check
	// - Got it?
	
	//Kinda cheating, but this will never change
	//White King index = 12
	//Black King index = 28
	
	//Store the original 'currentPiece' in a variable for use later
	var originalCurrentPiece = currentPiece;
	
	//Start of for loop
	for(i = 0; i < pieceTracker.length; i++)
	{
		if(i == 12 || i == 28)
		{
			continue;
		}
		
		//Store old 'square' information
		var oldSquareOne = squareOne;
		var oldSquareTwo = squareTwo;
		
		//THIS piece from 'i'
		var tempPiece = pieceTracker[i];
		
		//Pawns cannot check the King;
		if(tempPiece.isPawn)
		{
			continue;
		}
				
		//Populate the values of the 'squares' normally read in by clicking - these will be used to simulate moves and check for 'Check'
		squareOne = new square(tempPiece.xCoordinate, tempPiece.yCoordinate, tempPiece.player);
				
		var opponentKingPiece;
		
		//Get the opponent's King Piece into opponentKingPiece
		if(tempPiece.player == "WhitePlayer")
		{
			opponentKingPiece = pieceTracker[28];
		}
		else if(tempPiece.player == "BlackPlayer")
		{
			opponentKingPiece = pieceTracker[12];
		}
		else
		{
			alert("Neither WhitePlayer or BlackPlayer?!");
		}
		
		//Set squareTwo to be the coordinates of the opponent's King
		// squareTwo = new square(opponentKingPiece.xCoordinate, opponentKingPiece.yCoordinate, opponentKingPiece.player);
		squareTwo = new square(opponentKingPiece.xCoordinate, opponentKingPiece.yCoordinate, tempPiece.player);
		
		//Now just need to check the move and if it is a legal move, the game is in 'Check'
		currentPiece = tempPiece;
		
		identifyPiece();
		
		//If identify piece came back and bool isCheck is now set, then your work here is done
		//Reset everything and then break out of this loop		
		currentPiece = originalCurrentPiece;
		squareOne = oldSquareOne;
		squareTwo = oldSquareTwo;
		
		if(isCheck)
		{
			break;
		}
	}
	//End of for loop
	isForCheckingCheck = false;
}