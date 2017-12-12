var chessFunctionsModule = {
	checkCheck: function() {
		chessModule.$checkedKing = "";
		
		if(chessModule.$isCheck)
		{
			//'isCheck' is sticking on, so even if it WAS in Check, if the next move gets it out of Check, it still thinks it is in Check
			chessModule.$isCheck = false;
		}
		
		chessModule.$isForCheckingCheck = true;
		
		// Ok, to check if the game is in a 'Check' state:
		// - Check if every piece in the pieceTracker list is able to move to the King in one legal move
		// - If any piece can, the player owner of this piece is NOT in Check - the other player is in Check
		// - Got it?
		
		//Kinda cheating, but this will never change
		//White King index = 12
		//Black King index = 28
		
		//Store the original 'currentPiece' in a variable for use later
		var originalCurrentPiece = chessModule.$currentPiece;
		
		//Start of for loop
		for(i = 0; i < chessModule.$pieceTracker.length; i++)
		{
			if(i == 12 || i == 28)
			{
				continue;
			}
			
			//Store old 'square' information
			var oldSquareOne = chessModule.$squareOne;
			var oldSquareTwo = chessModule.$squareTwo;
			
			//THIS piece from 'i'
			var tempPiece = chessModule.$pieceTracker[i];
			
			//Pawns cannot check the King;
			if(tempPiece.isPawn)
			{
				continue;
			}
			
			//Populate the values of the 'squares' normally read in by clicking - these will be used to simulate moves and check for 'Check'
			chessModule.$squareOne = new chessFunctionsModule.square(tempPiece.xCoordinate, tempPiece.yCoordinate, tempPiece.player);
					
			var opponentKingPiece;
			var ownKingPiece;
			
			//Get the opponent's King Piece into opponentKingPiece
			if(tempPiece.player == "WhitePlayer")
			{
				opponentKingPiece = chessModule.$pieceTracker[28];
				ownKingPiece = chessModule.$pieceTracker[12];
			}
			else if(tempPiece.player == "BlackPlayer")
			{
				opponentKingPiece = chessModule.$pieceTracker[12];
				ownKingPiece = chessModule.$pieceTracker[28];
			}
			else
			{
				alert("Neither WhitePlayer or BlackPlayer?!");
			}
			
			//Set squareTwo to be the coordinates of the opponent's King
			chessModule.$squareTwo = new chessFunctionsModule.square(opponentKingPiece.xCoordinate, opponentKingPiece.yCoordinate, tempPiece.player);
			
			//Now just need to check the move and if it is a legal move, the game is in 'Check'
			chessModule.$currentPiece = tempPiece;
			
			chessMovesModule.identifyPiece();
			
			//If identify piece came back and bool isCheck is now set, then your work here is done
			//Reset everything and then break out of this loop		
			chessModule.$currentPiece = originalCurrentPiece;
			chessModule.$squareOne = oldSquareOne;
			chessModule.$squareTwo = oldSquareTwo;
			
			if(chessModule.$isCheck)
			{
				chessModule.$checkedKing = opponentKingPiece.player;
				break;
			}
			
		}
		//End of for loop
		chessModule.$isForCheckingCheck = false;		
	},
	checkCheckmate: function() {
		//todo...
		console.log("checkCheckmate: todo");
	},
	square: function(xCoordinate, yCoordinate, player, image) {
		this.xCoordinate = xCoordinate;
		this.yCoordinate = yCoordinate;
		this.player = player;
		this.image = image;
	  
		this.divName = "#" + this.xCoordinate + "_" + this.yCoordinate;
	  
		this.pieceIsAlive = true;
		this.pieceIsPawn = false;
		this.pawnHadFirstMove = false;
		this.pieceIsRook = false;
		this.pieceIsBishop = false;
		this.pieceIsKnight = false;
		this.pieceIsKing = false;
		this.pieceIsQueen = false;			
	  }
}