var chessMovesModule = {
	illegalMove: function() {
		
		if(isForCheckingCheck)
		{
			return;			
		}
		
		isIllegalMove = true;
		chessModule.outputMessage(player + " illegal move");
		chessModule.resetSquareVariables();
	},
	identifyPiece: function() {
		
		if(currentPiece.player != player && !isForCheckingCheck)
		{
			chessMovesModule.illegalMove();
			return;
		}
		else if(currentPiece.isPawn)
		{
			chessMovesModule.checkPawnMove();
		}
		else if(currentPiece.isRook)
		{
			chessMovesModule.checkRookMove();
		}
		else if(currentPiece.isKnight)
		{
			chessMovesModule.checkKnightMove();
		}
		else if(currentPiece.isBishop)
		{
			chessMovesModule.checkBishopMove();
		}
		else if(currentPiece.isKing)
		{
			chessMovesModule.checkKingMove();
		}
		else if(currentPiece.isQueen)
		{
			chessMovesModule.checkQueenMove();
		}
	},
	checkPawnMove: function() {
		
			if(player == "WhitePlayer")
			{	
				if(!currentPiece.pawnHadFirstMove && (squareTwo.yCoordinate - squareOne.yCoordinate == 2))
				{
					chessMovesModule.completePawnMove(-2);
					
					if(chessModule.$outputDiv.val() == "WhitePlayer illegal move")
					{
						chessMovesModule.completePawnMove(-1);	
					}
					
					currentPiece.pawnHadFirstMove = true;
				}
				else
				{
					chessMovesModule.completePawnMove(-1);
				}
			}
			
			else if (player == "BlackPlayer")
			{		
				if(!currentPiece.pawnHadFirstMove && (squareOne.yCoordinate - squareTwo.yCoordinate == 2))
				{
					chessMovesModule.completePawnMove(2);
					currentPiece.pawnHadFirstMove = true;
				}
				
				else
				{
					chessMovesModule.completePawnMove(1);
				}
			}
			else
			{
				alert("Neither WhitePlayer nor BlackPlayer?!");
			}
	},
	completePawnMove: function(increment) {		
		
		if(chessModule.getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate) > -1)
		{
			if(pieceTracker[chessModule.getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate)].isKing)
			{
				chessMovesModule.illegalMove();
				return;
			}
		}
		
		if(squareTwo.yCoordinate + increment == squareOne.yCoordinate
		&& squareTwo.xCoordinate == squareOne.xCoordinate
		&& chessModule.getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate) > -1)
		{
			chessMovesModule.illegalMove();
		}
		
		else if(squareTwo.yCoordinate + increment == squareOne.yCoordinate
		&& squareTwo.yCoordinate + increment == squareOne.yCoordinate
		&& chessModule.getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate) > -1)
		{
			chessMovesModule.completeTakingMove();
		}
		
		else if(squareTwo.yCoordinate + increment == squareOne.yCoordinate
		&& squareTwo.xCoordinate == squareOne.xCoordinate)
		{
			chessMovesModule.completeMove();
		}
		
		else if(squareTwo.yCoordinate + increment == squareOne.yCoordinate
		&& squareTwo.xCoordinate == squareOne.xCoordinate)
		{
			chessMovesModule.completeMove();
		}
		
		else
		{
			chessMovesModule.illegalMove();
		}

	},
	checkKnightMove: function() {
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
			chessMovesModule.completeMove();
		}
		else
		{
			chessMovesModule.illegalMove();
		}
	},
	checkRookMove: function() {
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
					if(chessModule.getIndexOfPiece(tempX, tempY) > -1)
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
					if(chessModule.getIndexOfPiece(tempX, tempY) > -1)
					{
						validMove = false;
						break;
					}
					
					tempX++;
				}
			}
			
			if(validMove)
			{
				chessMovesModule.completeMove();
			}
			
			else
			{
				chessMovesModule.illegalMove();
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
					if(chessModule.getIndexOfPiece(tempX, tempY) > -1)
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
					if(chessModule.getIndexOfPiece(tempX, tempY) > -1)
					{
						validMove = false;
						break;
					}
					
					tempY++;
				}
	
				
			}
			
			if(validMove)
			{
				chessMovesModule.completeMove();
			}
			else
			{
				chessMovesModule.illegalMove();
			}
			
		}
		else
		{
			chessMovesModule.illegalMove();
		}
	},
	checkBishopMove: function() {
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
					if(chessModule.getIndexOfPiece(tempX, tempY) > -1)
					{
						validMove = false;
						break;
					}
					
					tempX--;
					tempY--;
				}
					
				if(validMove)
				{
					chessMovesModule.completeMove();
				}
				else
				{
					chessMovesModule.illegalMove();
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
					if(chessModule.getIndexOfPiece(tempX, tempY) > -1)
					{
						validMove = false;
						break;
					}
					
					tempX++;
					tempY++;
				}
					
				if(validMove)
				{
					chessMovesModule.completeMove();
				}
				else
				{
					chessMovesModule.illegalMove();
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
					if(chessModule.getIndexOfPiece(tempX, tempY) > -1)
					{
						validMove = false;
						break;
					}
						tempX++;
						tempY--;	
				}
					
				if(validMove)
				{
					chessMovesModule.completeMove();
				}
				else
				{
					chessMovesModule.illegalMove();
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
					if(chessModule.getIndexOfPiece(tempX, tempY) > -1)
					{
						validMove = false;
						break;
					}
						tempX--;
						tempY++;	
				}
					
				if(validMove)
				{
					chessMovesModule.completeMove();
				}
				else
				{
					chessMovesModule.illegalMove();
				}	
			}
			else
			{
				console.log("Unhandled Bishop move...");
			}
		}
		else
		{
			chessMovesModule.illegalMove();
		}
	},
	checkQueenMove: function() {
		//Queen = Bishop + Rook
		chessMovesModule.checkRookMove();
		
		if(isIllegalMove)
		{
			chessMovesModule.checkBishopMove();
		}
	},
	checkKingMove: function() {
		//King is the same as Queen, but can only move 1 in each direction
		if(squareTwo.xCoordinate - squareOne.xCoordinate > 1 || squareTwo.yCoordinate - squareOne.yCoordinate > 1
			|| squareOne.xCoordinate - squareTwo.xCoordinate > 1 || squareOne.yCoordinate - squareTwo.yCoordinate > 1)
		{
			chessMovesModule.illegalMove();
		}
		else
		{
			chessMovesModule.checkQueenMove();
		}
	},
	completeTakingMove: function() {
		var pieceIndex2 = chessModule.getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate);
		
		if(pieceTracker[pieceIndex2].player == player)
		{
			chessMovesModule.illegalMove();
			return;
		}
		
		pieceTracker[pieceIndex2].pieceIsAlive = false;
	
		pieceTracker[pieceIndex2].xCoordinate = -1;
		pieceTracker[pieceIndex2].yCoordinate = -1;
	
		currentPiece.xCoordinate = squareTwo.xCoordinate;
		currentPiece.yCoordinate = squareTwo.yCoordinate;
		currentPiece.divName = squareTwo.divName;
		
		chessModule.displayPieceImage();
	},
	completeMove: function() {
		if(isForCheckingCheck)
		{
			isCheck = true;
			//Return because don't want to change any coordinates for a 'simulated' move
			return;
		}
		
		//Before you complete the move, you need to check if the current move is going to result in the current player's King being in Check
		//This is an illegal move
		
		//Store the move information before simulating the move and either completing the move or resetting things
		//if it is illegal
		var currentPieceSquareOne = squareOne;
		var currentPieceSquareTwo = squareTwo;
		var currentPieceDivName = currentPiece.divName;
		
		//At this point, the move has already been verified as illegal, as in, according the movement of the piece, 
		//so it is fine to go ahead
		//So, set the second square of the current piece:
		currentPiece.xCoordinate = squareTwo.xCoordinate;
		currentPiece.yCoordinate = squareTwo.yCoordinate;
		currentPiece.divName = squareTwo.divName;
		
		//Now check for Check with the piece in its new location:
		chessFunctionsModule.checkCheck();
		
		if(isCheck && checkedKing == player)
		{
			//Hoorah! This is an illegal move - you cannot move into Check
			//Reset the piece information to back the way it was before the simulated move:
			currentPiece.xCoordinate = currentPieceSquareOne.xCoordinate;
			currentPiece.yCoordinate = currentPieceSquareOne.yCoordinate;
			currentPiece.divName = currentPieceDivName;
			//Do chessMovesModule.illegalMove() stuff:
			chessMovesModule.illegalMove();
			//return because this move will not be going ahead!
			alert("You cannot move into Check!");
			return;	
		}
		
		//Reset the piece information to back the way it was before the simulated move:
		currentPiece.xCoordinate = currentPieceSquareOne.xCoordinate;
		currentPiece.yCoordinate = currentPieceSquareOne.yCoordinate;
		currentPiece.divName = currentPieceDivName;
			
		if(chessModule.pieceTrackerContainsPiece(squareTwo.xCoordinate, squareTwo.yCoordinate))
		{
			chessMovesModule.completeTakingMove();
		}
		else
		{
			var pieceIndex2 = chessModule.getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate);
			
			currentPiece.xCoordinate = squareTwo.xCoordinate;
			currentPiece.yCoordinate = squareTwo.yCoordinate;
			currentPiece.divName = squareTwo.divName;
			
			chessModule.displayPieceImage();
		}
	}
}