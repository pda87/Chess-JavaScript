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