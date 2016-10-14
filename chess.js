var outputDiv;
var tickerDiv;
var player;
var pieceTracker;
var currentPiece;
var currentPieceIndex;
var squareOne;
var squareTwo;
var blackPlayerPieceCount;
var whitePlayerPieceCount;
var isIllegalMove;

gameStart();

outputMessage("This is chess - White goes first...");

function outputMessage(message) {

	outputDiv.innerHTML = message;

}

function gameStart() {
		
	isIllegalMove = false;
	tickerDiv = document.getElementById("chessticker");
	outputDiv = document.getElementById("outputdiv");
	pieceTracker = [];
	
	var imageFolder = "ChessPieceImages/";
	
	//Each player has 16 pieces at the start
	//16 white:
	//8 pawns:
	pieceTracker.push(new square(0, 1, "WhitePlayer", "zeroOne", imageFolder + "P1Pawn.png"));
	pieceTracker.push(new square(1, 1, "WhitePlayer", "oneOne", imageFolder + "P1Pawn.png"));
	pieceTracker.push(new square(2, 1, "WhitePlayer", "twoOne", imageFolder + "P1Pawn.png"));
	pieceTracker.push(new square(3, 1, "WhitePlayer", "threeOne", imageFolder + "P1Pawn.png"));
	pieceTracker.push(new square(4, 1, "WhitePlayer", "fourOne", imageFolder + "P1Pawn.png"));
	pieceTracker.push(new square(5, 1, "WhitePlayer", "fiveOne", imageFolder + "P1Pawn.png"));
	pieceTracker.push(new square(6, 1, "WhitePlayer", "sixOne", imageFolder + "P1Pawn.png"));
	pieceTracker.push(new square(7, 1, "WhitePlayer", "sevenOne", imageFolder + "P1Pawn.png"));
	
	for(i = 0; i < 8; i++)
	{
		pieceTracker[i].isPawn = true;
	}
		
	//White back row:
	pieceTracker.push(new square(0, 0, "WhitePlayer", "zeroZero", imageFolder + "P1Rook.png"));
	pieceTracker[8].isRook = true;
	pieceTracker.push(new square(1, 0, "WhitePlayer", "oneZero", imageFolder + "P1Bishop.png"));
	pieceTracker[9].isBishop = true;
	pieceTracker.push(new square(2, 0, "WhitePlayer", "twoZero", imageFolder + "P1Knight.png"));
	pieceTracker[10].isKnight = true;
	pieceTracker.push(new square(3, 0, "WhitePlayer", "threeZero", imageFolder + "P1Queen.png"));
	pieceTracker[11].isQueen = true;
	pieceTracker.push(new square(4, 0, "WhitePlayer", "fourZero", imageFolder + "P1King.png"));
	pieceTracker[12].isKing = true;
	pieceTracker.push(new square(5, 0, "WhitePlayer", "fiveZero", imageFolder + "P1Knight.png"));
	pieceTracker[13].isKnight = true;
	pieceTracker.push(new square(6, 0, "WhitePlayer", "sixZero", imageFolder + "P1Bishop.png"));
	pieceTracker[14].isBishop = true;
	pieceTracker.push(new square(7, 0, "WhitePlayer", "sevenZero", imageFolder + "P1Rook.png"));
	pieceTracker[15].isRook = true;
	
	//16 black
	//8 pawns:
	pieceTracker.push(new square(0, 6, "BlackPlayer", "zeroSix", imageFolder + "P2Pawn.png"));
	pieceTracker.push(new square(1, 6, "BlackPlayer", "oneSix", imageFolder + "P2Pawn.png"));
	pieceTracker.push(new square(2, 6, "BlackPlayer", "twoSix", imageFolder + "P2Pawn.png"));
	pieceTracker.push(new square(3, 6, "BlackPlayer", "threeSix", imageFolder + "P2Pawn.png"));
	pieceTracker.push(new square(4, 6, "BlackPlayer", "fourSix", imageFolder + "P2Pawn.png"));
	pieceTracker.push(new square(5, 6, "BlackPlayer", "fiveSix", imageFolder + "P2Pawn.png"));
	pieceTracker.push(new square(6, 6, "BlackPlayer", "sixSix", imageFolder + "P2Pawn.png"));
	pieceTracker.push(new square(7, 6, "BlackPlayer", "sevemSix", imageFolder + "P2Pawn.png"));
	
	for(i = 16; i < 24; i++)
	{
		pieceTracker[i].isPawn = true;
	}
	
	//Black back row:
	pieceTracker.push(new square(0, 7, "BlackPlayer", "zeroSeven", imageFolder + "P2Rook.png"));
	pieceTracker[24].isRook = true;
	pieceTracker.push(new square(1, 7, "BlackPlayer", "oneSeven", imageFolder + "P2Bishop.png"));
	pieceTracker[25].isBishop = true;
	pieceTracker.push(new square(2, 7, "BlackPlayer", "twoSeven", imageFolder + "P2Knight.png"));
	pieceTracker[26].isKnight = true;
	pieceTracker.push(new square(3, 7, "BlackPlayer", "threeSeven", imageFolder + "P2Queen.png"));
	pieceTracker[27].isQueen = true;
	pieceTracker.push(new square(4, 7, "BlackPlayer", "fourSeven", imageFolder + "P2King.png"));
	pieceTracker[28].isKing = true;
	pieceTracker.push(new square(5, 7, "BlackPlayer", "fiveSeven", imageFolder + "P2Knight.png"));
	pieceTracker[29].isKnight = true;
	pieceTracker.push(new square(6, 7, "BlackPlayer", "sixSeven", imageFolder + "P2Bishop.png"));
	pieceTracker[30].isBishop = true;
	pieceTracker.push(new square(7, 7, "BlackPlayer", "sevenSeven", imageFolder + "P2Rook.png"));
	pieceTracker[31].isRook = true;
	
	player = "WhitePlayer";
	
	getPlayerPieceCounts();
	OutputTickerInformation();
		
}

function clickSquare(xCoordinate, yCoordinate, squareToChange) {

	if(squareOne == null)
	{
		squareOne = new square(xCoordinate, yCoordinate, player, squareToChange);
		outputMessage(player + " first square selected");
		return;
	}
	
	if(squareOne != null)
	{
		squareTwo = new square(xCoordinate, yCoordinate, player, squareToChange);
	}
	
	if(squareOne == squareTwo)
	{
		illegalMove();
		return;
	}
	
	currentPieceIndex = getIndexOfPiece(squareOne.xCoordinate, squareOne.yCoordinate);
		
	if(currentPieceIndex == -1)
	{
		outputMessage(" ");
	}
	else
	{
		currentPiece = pieceTracker[currentPieceIndex];	
	}
	
	identifyPiece();
		
	resetSquareVariables();
	getPlayerPieceCounts();
	OutputTickerInformation();
	
}

function OutputTickerInformation() {
	
	var whiteCount = 0;
	var blackCount = 0;
	var pieceCount = pieceTracker.length;
	
	for(i = 0; i < pieceCount; i++)
	{
		if(pieceTracker[i].player == "WhitePlayer" && pieceTracker[i].pieceIsAlive)
			whiteCount++;
		
		if(pieceTracker[i].player == "BlackPlayer" && pieceTracker[i].pieceIsAlive)
			blackCount++;
	}
	
	tickerDiv.innerHTML = "There are " + pieceCount + " pieces left on the board:<BR>";
	tickerDiv.innerHTML += "WhitePlayer: " + whiteCount + "<BR>";
	tickerDiv.innerHTML += "BlackPlayer: " + blackCount + "<BR>";
}

function identifyPiece() {
	
	if(currentPiece.player != player)
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
		completeKnightMove();
	}
	
	else
	{
		illegalMove();
	}
}

function completeKnightMove() {
	
	if(pieceTrackerContainsPiece(squareTwo.xCoordinate, squareTwo.yCoordinate))
	{
		completeTakingMove();
	}
	
	else
	{
		completeMove();
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
			completeRookMove();
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
			completeRookMove();
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

function completeRookMove() {

	if(pieceTrackerContainsPiece(squareTwo.xCoordinate, squareTwo.yCoordinate))
	{
		completeTakingMove();
	}
	
	else
	{		
		completeMove();
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
				completeBishopMove();
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
				completeBishopMove();
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
				completeBishopMove();
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
				completeBishopMove();
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

function completeBishopMove(){
	if(pieceTrackerContainsPiece(squareTwo.xCoordinate, squareTwo.yCoordinate))
	{
		completeTakingMove();
	}
	
	else
	{		
		completeMove();
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
	
	var pieceIndex2 = getIndexOfPiece(squareTwo.xCoordinate, squareTwo.yCoordinate);
	
	currentPiece.xCoordinate = squareTwo.xCoordinate;
	currentPiece.yCoordinate = squareTwo.yCoordinate;
	currentPiece.divName = squareTwo.divName;
	
	displayPieceImage();

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

function displayPieceImage() {
		
	var squareOneDiv = document.getElementById(squareOne.divName);
	var squareTwoDiv = document.getElementById(squareTwo.divName);
	squareOneDiv.src="";
	
	squareTwoDiv.src = currentPiece.image;
	
	if(player == "WhitePlayer")
	{
		player = "BlackPlayer";
	}
	
	else if(player == "BlackPlayer")
	{
		player = "WhitePlayer";
	}
	
	else
	{
		alert("displayPieceImage() - Unknown player?!");
	}
	
	outputMessage("Successful move - " + player + " turn.");
		
}

function getIndexOfPiece(xCoordinate, yCoordinate){
	
	var pieceIndex = -1;
		
	for(var i = 0; i < pieceTracker.length; i++)
	{
		if(pieceTracker[i].xCoordinate == xCoordinate
		&& pieceTracker[i].yCoordinate == yCoordinate
		&& pieceTracker[i].pieceIsAlive)
		{
			pieceIndex = i;
			break;
		}
		
	}
	
	return pieceIndex;
	
}

function pieceTrackerContainsPiece(xCoordinate, yCoordinate) {
	
	var containsPiece = false;
	
	var index = getIndexOfPiece(xCoordinate, yCoordinate);
	
	if(index > -1)
	{
		containsPiece = true;
	}
	
	
	return containsPiece;
	
}

function illegalMove() {
	isIllegalMove = true;
	outputMessage(player + " illegal move");

}

function resetSquareVariables() {
	
	squareOne = null;
	squareTwo = null;
	currentPiece = -1;
	isIllegalMove = false;
}

function square(xCoordinate, yCoordinate, player, divName, image) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.player = player;
  this.image = image;
  this.divName = divName;
  this.pieceIsAlive = true;
  this.pieceIsPawn = false;
  this.pawnHadFirstMove = false;
  this.pieceIsRook = false;
  this.pieceIsBishop = false;
  this.pieceIsKnight = false;
  this.pieceIsKing = false;
  this.pieceIsQueen = false;			
}

function getPlayerPieceCounts() {
		
		blackPlayerPieceCount = 0;
		whitePlayerPieceCount = 0;
			
		for(i = 0; i < pieceTracker.length; i++)
		{
			if(pieceTracker[i].pieceIsAlive)
			{
				if(pieceTracker[i].player == "BlackPlayer")
				{
					blackPlayerPieceCount++;
				}
				
				else if(pieceTracker[i].player == "WhitePlayer")
				{
					whitePlayerPieceCount++;
				}
				
				else
				{
					alert("getPlayerPieceCounts function - neither black nor white?!");
				}
				
			}
		}
	
}