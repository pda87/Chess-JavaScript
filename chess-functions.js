function checkCheck() {
	
	checkedKing = "";


	if(isCheck)
	{
		//'isCheck' is sticking on, so even if it WAS in Check, if the next move gets it out of Check, it still thinks it is in Check
		isCheck = false;
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
		var ownKingPiece;
		
		//Get the opponent's King Piece into opponentKingPiece
		if(tempPiece.player == "WhitePlayer")
		{
			opponentKingPiece = pieceTracker[28];
			ownKingPiece = pieceTracker[12];
		}
		else if(tempPiece.player == "BlackPlayer")
		{
			opponentKingPiece = pieceTracker[12];
			ownKingPiece = pieceTracker[28];
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
			checkedKing = opponentKingPiece.player;
			break;
		}
		
	}
	//End of for loop
	isForCheckingCheck = false;
}

function checkCheckmate() {

//todo...

}

function Coordinate(xCoordinate, yCoordinate) {
	this.xCoordinate = xCoordinate;
	this.yCoordinate = yCoordinate;
}