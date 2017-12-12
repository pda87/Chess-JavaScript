var chessMovesModule = {
	illegalMove: function() {
		
		if(chessModule.$isForCheckingCheck)
		{
			return;			
		}
		
		chessModule.$isIllegalMove = true;
		chessModule.outputMessage(chessModule.$player + " illegal move");
		chessModule.resetSquareVariables();
	},
	identifyPiece: function() {
		
		if(chessModule.$currentPiece.player != chessModule.$player && !chessModule.$isForCheckingCheck)
		{
			chessMovesModule.illegalMove();
			return;
		}
		else if(chessModule.$currentPiece.isPawn)
		{
			chessMovesModule.checkPawnMove();
		}
		else if(chessModule.$currentPiece.isRook)
		{
			chessMovesModule.checkRookMove();
		}
		else if(chessModule.$currentPiece.isKnight)
		{
			chessMovesModule.checkKnightMove();
		}
		else if(chessModule.$currentPiece.isBishop)
		{
			chessMovesModule.checkBishopMove();
		}
		else if(chessModule.$currentPiece.isKing)
		{
			chessMovesModule.checkKingMove();
		}
		else if(chessModule.$currentPiece.isQueen)
		{
			chessMovesModule.checkQueenMove();
		}
	},
	checkPawnMove: function() {
		
			if(chessModule.$player == "WhitePlayer")
			{	
				if(!chessModule.$currentPiece.pawnHadFirstMove && (chessModule.$squareTwo.yCoordinate - chessModule.$squareOne.yCoordinate == 2))
				{
					chessMovesModule.completePawnMove(-2);
					
					if(chessModule.$outputDiv.val() == "WhitePlayer illegal move")
					{
						chessMovesModule.completePawnMove(-1);	
					}
					
					chessModule.$currentPiece.pawnHadFirstMove = true;
				}
				else
				{
					chessMovesModule.completePawnMove(-1);
				}
			}
			
			else if (chessModule.$player == "BlackPlayer")
			{		
				if(!chessModule.$currentPiece.pawnHadFirstMove && (chessModule.$squareOne.yCoordinate - chessModule.$squareTwo.yCoordinate == 2))
				{
					chessMovesModule.completePawnMove(2);
					chessModule.$currentPiece.pawnHadFirstMove = true;
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
		
		if(chessModule.getIndexOfPiece(chessModule.$squareTwo.xCoordinate, chessModule.$squareTwo.yCoordinate) > -1)
		{
			if(chessModule.$pieceTracker[chessModule.getIndexOfPiece(chessModule.$squareTwo.xCoordinate, chessModule.$squareTwo.yCoordinate)].isKing)
			{
				chessMovesModule.illegalMove();
				return;
			}
		}
		
		if(chessModule.$squareTwo.yCoordinate + increment == chessModule.$squareOne.yCoordinate
		&& chessModule.$squareTwo.xCoordinate == chessModule.$squareOne.xCoordinate
		&& chessModule.getIndexOfPiece(chessModule.$squareTwo.xCoordinate, chessModule.$squareTwo.yCoordinate) > -1)
		{
			chessMovesModule.illegalMove();
		}
		
		else if(chessModule.$squareTwo.yCoordinate + increment == chessModule.$squareOne.yCoordinate
		&& chessModule.$squareTwo.yCoordinate + increment == chessModule.$squareOne.yCoordinate
		&& chessModule.getIndexOfPiece(chessModule.$squareTwo.xCoordinate, chessModule.$squareTwo.yCoordinate) > -1)
		{
			chessMovesModule.completeTakingMove();
		}
		
		else if(chessModule.$squareTwo.yCoordinate + increment == chessModule.$squareOne.yCoordinate
		&& chessModule.$squareTwo.xCoordinate == chessModule.$squareOne.xCoordinate)
		{
			chessMovesModule.completeMove();
		}
		
		else if(chessModule.$squareTwo.yCoordinate + increment == chessModule.$squareOne.yCoordinate
		&& chessModule.$squareTwo.xCoordinate == chessModule.$squareOne.xCoordinate)
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
		(chessModule.$squareOne.xCoordinate + 1 == chessModule.$squareTwo.xCoordinate && chessModule.$squareOne.yCoordinate + 2 == chessModule.$squareTwo.yCoordinate)
		//2 to the right and up 1
		|| (chessModule.$squareOne.xCoordinate + 2 == chessModule.$squareTwo.xCoordinate && chessModule.$squareOne.yCoordinate + 1 == chessModule.$squareTwo.yCoordinate)
		//1 to the left and up 2
		|| (chessModule.$squareOne.xCoordinate - 1 == chessModule.$squareTwo.xCoordinate && chessModule.$squareOne.yCoordinate + 2 == chessModule.$squareTwo.yCoordinate)
		//2 to the left and up 1
		|| (chessModule.$squareOne.xCoordinate - 2 == chessModule.$squareTwo.xCoordinate && chessModule.$squareOne.yCoordinate + 1 == chessModule.$squareTwo.yCoordinate)
		//1 to the left and down 2
		|| (chessModule.$squareOne.xCoordinate - 1 == chessModule.$squareTwo.xCoordinate && chessModule.$squareOne.yCoordinate - 2 == chessModule.$squareTwo.yCoordinate)
		//1 to the right and down 2
		|| (chessModule.$squareOne.xCoordinate + 1 == chessModule.$squareTwo.xCoordinate && chessModule.$squareOne.yCoordinate - 2 == chessModule.$squareTwo.yCoordinate)
		//1 down and 2 to the left
		|| (chessModule.$squareOne.xCoordinate - 2 == chessModule.$squareTwo.xCoordinate && chessModule.$squareOne.yCoordinate - 1 == chessModule.$squareTwo.yCoordinate)
		//1 down and 2 to the right
		|| (chessModule.$squareOne.xCoordinate + 2 == chessModule.$squareTwo.xCoordinate && chessModule.$squareOne.yCoordinate - 1 == chessModule.$squareTwo.yCoordinate)
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
		if(chessModule.$squareTwo.yCoordinate == chessModule.$squareOne.yCoordinate)
		{
			var tempX;
			var tempY = chessModule.$squareOne.yCoordinate;
			var validMove = true;
			
			if(chessModule.$squareTwo.xCoordinate > chessModule.$squareOne.xCoordinate)
			{
				tempX = chessModule.$squareTwo.xCoordinate - 1;
				
				while(tempX > chessModule.$squareOne.xCoordinate)
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
				tempX = chessModule.$squareTwo.xCoordinate + 1;
				
				while(tempX < chessModule.$squareOne.xCoordinate)
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
		else if(chessModule.$squareTwo.xCoordinate == chessModule.$squareOne.xCoordinate)
		{
			var tempX = chessModule.$squareTwo.xCoordinate;
			var tempY;
			var validMove = true;
			
			if(chessModule.$squareTwo.yCoordinate > chessModule.$squareOne.yCoordinate)
			{
				 tempY = chessModule.$squareTwo.yCoordinate - 1;
				 
				while(tempY > chessModule.$squareOne.yCoordinate)
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
				tempY = chessModule.$squareTwo.yCoordinate + 1;
				
				while(tempY < chessModule.$squareOne.yCoordinate)
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
		if(chessModule.$squareTwo.xCoordinate - chessModule.$squareOne.xCoordinate == chessModule.$squareTwo.yCoordinate - chessModule.$squareOne.yCoordinate)
		{
			//Right and up
			if(chessModule.$squareTwo.xCoordinate > chessModule.$squareOne.xCoordinate && chessModule.$squareTwo.yCoordinate > chessModule.$squareOne.yCoordinate)
			{	
				var tempX;
				var tempY;
				var validMove = true;		

				tempX = chessModule.$squareTwo.xCoordinate - 1;
				tempY = chessModule.$squareTwo.yCoordinate - 1;
				
				while(tempX > chessModule.$squareOne.xCoordinate && tempY > chessModule.$squareOne.yCoordinate)
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

				tempX = chessModule.$squareTwo.xCoordinate + 1;
				tempY = chessModule.$squareTwo.yCoordinate + 1;
				
				while(tempX < chessModule.$squareOne.xCoordinate && tempY < chessModule.$squareOne.yCoordinate)
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
		else if(chessModule.$squareOne.xCoordinate - chessModule.$squareTwo.xCoordinate == chessModule.$squareTwo.yCoordinate - chessModule.$squareOne.yCoordinate)
		{
			//Left and up
			if(chessModule.$squareTwo.xCoordinate < chessModule.$squareOne.xCoordinate)
			{
				var tempX;
				var tempY;
				var validMove = true;		

				tempX = chessModule.$squareTwo.xCoordinate + 1;
				tempY = chessModule.$squareTwo.yCoordinate - 1;
				
				while(tempX < chessModule.$squareOne.xCoordinate && tempY > chessModule.$squareOne.yCoordinate)
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
			else if(chessModule.$squareTwo.xCoordinate > chessModule.$squareOne.xCoordinate)
			{
				var tempX;
				var tempY;
				var validMove = true;		

				tempX = chessModule.$squareTwo.xCoordinate - 1;
				tempY = chessModule.$squareTwo.yCoordinate + 1;
				
				while(tempX > chessModule.$squareOne.xCoordinate && tempY < chessModule.$squareOne.yCoordinate)
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
		
		if(chessModule.$isIllegalMove)
		{
			chessMovesModule.checkBishopMove();
		}
	},
	checkKingMove: function() {
		//King is the same as Queen, but can only move 1 in each direction
		if(chessModule.$squareTwo.xCoordinate - chessModule.$squareOne.xCoordinate > 1 || chessModule.$squareTwo.yCoordinate - chessModule.$squareOne.yCoordinate > 1
			|| chessModule.$squareOne.xCoordinate - chessModule.$squareTwo.xCoordinate > 1 || chessModule.$squareOne.yCoordinate - chessModule.$squareTwo.yCoordinate > 1)
		{
			chessMovesModule.illegalMove();
		}
		else
		{
			chessMovesModule.checkQueenMove();
		}
	},
	completeTakingMove: function() {
		var pieceIndex2 = chessModule.getIndexOfPiece(chessModule.$squareTwo.xCoordinate, chessModule.$squareTwo.yCoordinate);
		
		if(chessModule.$pieceTracker[pieceIndex2].player == chessModule.$player)
		{
			chessMovesModule.illegalMove();
			return;
		}
		
		chessModule.$pieceTracker[pieceIndex2].pieceIsAlive = false;
	
		chessModule.$pieceTracker[pieceIndex2].xCoordinate = -1;
		chessModule.$pieceTracker[pieceIndex2].yCoordinate = -1;
	
		chessModule.$currentPiece.xCoordinate = chessModule.$squareTwo.xCoordinate;
		chessModule.$currentPiece.yCoordinate = chessModule.$squareTwo.yCoordinate;
		chessModule.$currentPiece.divName = chessModule.$squareTwo.divName;
		
		chessModule.displayPieceImage();
	},
	completeMove: function() {
		if(chessModule.$isForCheckingCheck)
		{
			chessModule.$isCheck = true;
			//Return because don't want to change any coordinates for a 'simulated' move
			return;
		}
		
		//Before you complete the move, you need to check if the current move is going to result in the current player's King being in Check
		//This is an illegal move
		
		//Store the move information before simulating the move and either completing the move or resetting things
		//if it is illegal
		var currentPieceSquareOne = chessModule.$squareOne;
		var currentPieceSquareTwo = chessModule.$squareTwo;
		var currentPieceDivName = chessModule.$currentPiece.divName;
		
		//At this point, the move has already been verified as illegal, as in, according the movement of the piece, 
		//so it is fine to go ahead
		//So, set the second square of the current piece:
		chessModule.$currentPiece.xCoordinate = chessModule.$squareTwo.xCoordinate;
		chessModule.$currentPiece.yCoordinate = chessModule.$squareTwo.yCoordinate;
		chessModule.$currentPiece.divName = chessModule.$squareTwo.divName;
		
		//Now check for Check with the piece in its new location:
		chessFunctionsModule.checkCheck();
		
		if(chessModule.$isCheck && chessModule.$checkedKing == chessModule.$player)
		{
			//Hoorah! This is an illegal move - you cannot move into Check
			//Reset the piece information to back the way it was before the simulated move:
			chessModule.$currentPiece.xCoordinate = currentPieceSquareOne.xCoordinate;
			chessModule.$currentPiece.yCoordinate = currentPieceSquareOne.yCoordinate;
			chessModule.$currentPiece.divName = currentPieceDivName;
			//Do chessMovesModule.illegalMove() stuff:
			chessMovesModule.illegalMove();
			//return because this move will not be going ahead!
			alert("You cannot move into Check!");
			return;	
		}
		
		//Reset the piece information to back the way it was before the simulated move:
		chessModule.$currentPiece.xCoordinate = currentPieceSquareOne.xCoordinate;
		chessModule.$currentPiece.yCoordinate = currentPieceSquareOne.yCoordinate;
		chessModule.$currentPiece.divName = currentPieceDivName;
			
		if(chessModule.pieceTrackerContainsPiece(chessModule.$squareTwo.xCoordinate, chessModule.$squareTwo.yCoordinate))
		{
			chessMovesModule.completeTakingMove();
		}
		else
		{
			var pieceIndex2 = chessModule.getIndexOfPiece(chessModule.$squareTwo.xCoordinate, chessModule.$squareTwo.yCoordinate);
			
			chessModule.$currentPiece.xCoordinate = chessModule.$squareTwo.xCoordinate;
			chessModule.$currentPiece.yCoordinate = chessModule.$squareTwo.yCoordinate;
			chessModule.$currentPiece.divName = chessModule.$squareTwo.divName;
			
			chessModule.displayPieceImage();
		}
	}
}