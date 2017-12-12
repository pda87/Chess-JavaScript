var player;
var pieceTracker;
var currentPiece;
var currentPieceIndex;
var squareOne;
var squareTwo;
var blackPlayerPieceCount;
var whitePlayerPieceCount;
var isIllegalMove;
var isForCheckingCheck;
var isCheck;
var checkedKing;
var isCheckmate;

var chessModule  = {
	init: function() {
		this.cacheDOM();

        this.chessGameStart();

        this.$chess.fadeIn();
        this.setSquareHeights();
	},
	cacheDOM: function() {
		this.$chess = $("#chess");
		this.$chessBoard = this.$chess.find("#chess-board");
        this.$chessSquare = this.$chessBoard.find(".chess-square");
		this.$tickerDiv = this.$chess.find("#chessticker");
		this.$outputDiv = this.$chess.find("#outputdiv");
		this.$chessRows = this.$chess.find(".chess-row");
	},
	setSquareHeights: function() {
        this.$chessSquare.css("height", this.$chessSquare.css("width"));
    },
	outputMessage: function(message) {
		this.$outputDiv.html(message);
	},
	chessGameStart: function() {
		//Setup
		this.$imageFolder = "Images/ChessPieceImages/";
		this.setSquareXYValues();
		this.setImgIDs();
		this.bindEvents();

		isIllegalMove = false;
		isForCheckingCheck = false;
		isCheck = false;
		isCheckmate = false;
	
		this.outputMessage("This is chess - White goes first...");
	
		this.setupStartPieces();
		
		player = "WhitePlayer";
		
		this.getPlayerPieceCounts();
		this.OutputTickerInformation();
	},
	setSquareXYValues: function() {
		var y = 7;
		this.$chessRows.each(function(index, value) {
			var row = $(value);
			row.prop("id", y.toString());
			y = y - 1;

			var x = 0;
			var squares = $(value).find(".chess-square");
			squares.each(function(squareIndex, squareValue) {
				var square = $(squareValue);
				square.attr("data-x", x.toString());
				x = x + 1;

				if(square.hasClass("chess-square-white")) {
					square.addClass("white");
				}
				else {
					square.addClass("green");
				}
			});
		});
	},
	setImgIDs: function() {
		//Set IMG IDs
		this.$chess.find(".chessimage").each(function(index, value) {
			var img = $(value);
			//First parent is x-coordinate from square div
			//Second parent is y-coordinate from row div
			var imgID = img.parent().data().x + "_" + img.parent().parent().prop("id");
			img.prop("id", imgID);
		});
	},
	bindEvents: function() {
		//Bind square clicks
		this.$chessSquares = this.$chess.find(".chess-square");
		this.$chessSquares.on("click", chessModule.clickSquare);
	},
	setupStartPieces: function() {
		pieceTracker = [];
		
		//Each player has 16 pieces at the start
		//16 white:
		//8 pawns:
		pieceTracker.push(new chessFunctionsModule.square(0, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(1, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(2, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(3, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(4, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(5, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(6, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(7, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		
		for(i = 0; i < 8; i++)
		{
			pieceTracker[i].isPawn = true;
		}
			
		//White back row:
		pieceTracker.push(new chessFunctionsModule.square(0, 0, "WhitePlayer", this.$imageFolder + "P1Rook.png"));
		pieceTracker[8].isRook = true;
		pieceTracker.push(new chessFunctionsModule.square(1, 0, "WhitePlayer", this.$imageFolder + "P1Bishop.png"));
		pieceTracker[9].isBishop = true;
		pieceTracker.push(new chessFunctionsModule.square(2, 0, "WhitePlayer", this.$imageFolder + "P1Knight.png"));
		pieceTracker[10].isKnight = true;
		pieceTracker.push(new chessFunctionsModule.square(3, 0, "WhitePlayer", this.$imageFolder + "P1Queen.png"));
		pieceTracker[11].isQueen = true;
		pieceTracker.push(new chessFunctionsModule.square(4, 0, "WhitePlayer", this.$imageFolder + "P1King.png"));
		pieceTracker[12].isKing = true;
		pieceTracker.push(new chessFunctionsModule.square(5, 0, "WhitePlayer", this.$imageFolder + "P1Knight.png"));
		pieceTracker[13].isKnight = true;
		pieceTracker.push(new chessFunctionsModule.square(6, 0, "WhitePlayer", this.$imageFolder + "P1Bishop.png"));
		pieceTracker[14].isBishop = true;
		pieceTracker.push(new chessFunctionsModule.square(7, 0, "WhitePlayer", this.$imageFolder + "P1Rook.png"));
		pieceTracker[15].isRook = true;
		
		//16 black
		//8 pawns:
		pieceTracker.push(new chessFunctionsModule.square(0, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(1, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(2, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(3, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(4, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(5, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(6, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		pieceTracker.push(new chessFunctionsModule.square(7, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		
		for(i = 16; i < 24; i++)
		{
			pieceTracker[i].isPawn = true;
		}
		
		//Black back row:
		pieceTracker.push(new chessFunctionsModule.square(0, 7, "BlackPlayer", this.$imageFolder + "P2Rook.png"));
		pieceTracker[24].isRook = true;
		pieceTracker.push(new chessFunctionsModule.square(1, 7, "BlackPlayer", this.$imageFolder + "P2Bishop.png"));
		pieceTracker[25].isBishop = true;
		pieceTracker.push(new chessFunctionsModule.square(2, 7, "BlackPlayer", this.$imageFolder + "P2Knight.png"));
		pieceTracker[26].isKnight = true;
		pieceTracker.push(new chessFunctionsModule.square(3, 7, "BlackPlayer", this.$imageFolder + "P2Queen.png"));
		pieceTracker[27].isQueen = true;
		pieceTracker.push(new chessFunctionsModule.square(4, 7, "BlackPlayer", this.$imageFolder + "P2King.png"));
		pieceTracker[28].isKing = true;
		pieceTracker.push(new chessFunctionsModule.square(5, 7, "BlackPlayer", this.$imageFolder + "P2Knight.png"));
		pieceTracker[29].isKnight = true;
		pieceTracker.push(new chessFunctionsModule.square(6, 7, "BlackPlayer", this.$imageFolder + "P2Bishop.png"));
		pieceTracker[30].isBishop = true;
		pieceTracker.push(new chessFunctionsModule.square(7, 7, "BlackPlayer", this.$imageFolder + "P2Rook.png"));
		pieceTracker[31].isRook = true;
	},
	setSquareAsClicked: function(square) {
		square.css("background-color", "red");
	},
	resetSquareColor: function(square) {
		if(!square){
			return;
		}

		var selector = $(square.divName);
		var parentDiv = selector.parent();

		var backgroundColor;

		if(parentDiv.hasClass("green")) {
			backgroundColor = "green";
		}
		else {
			backgroundColor = "white";
		}

		setTimeout(function() {
			parentDiv.css("background-color", backgroundColor);
		}, 500)
	},
	clickSquare: function() {
		var clickedSquare = $(this);

		var xCoordinate = clickedSquare.data().x;
		var yCoordinate = Number.parseInt(clickedSquare.parent().prop("id"));
		var squareToChange = clickedSquare.find("img").prop("id");

		if(squareOne == null)
		{
			squareOne = new chessFunctionsModule.square(xCoordinate, yCoordinate, player);
			chessModule.outputMessage(player + " first square selected");
			chessModule.setSquareAsClicked(clickedSquare);
			return;
		}
		
		if(squareOne != null)
		{
			squareTwo = new chessFunctionsModule.square(xCoordinate, yCoordinate, player);
			chessModule.setSquareAsClicked(clickedSquare);
		}

		if(squareOne.divName == squareTwo.divName)
		{
			chessMovesModule.illegalMove();
			return;
		}
		
		currentPieceIndex = chessModule.getIndexOfPiece(squareOne.xCoordinate, squareOne.yCoordinate);
			
		if(currentPieceIndex == -1)
		{
			chessModule.outputMessage(" ");
		}
		else
		{
			currentPiece = pieceTracker[currentPieceIndex];	
		}

		chessMovesModule.identifyPiece();
			
		chessModule.resetSquareVariables();
		chessModule.getPlayerPieceCounts();
		chessModule.OutputTickerInformation();
		
		if(isCheck)
		{
			//I needed a timeout here or otherwise the "I think we have a 'Check' situation" text was popping up BEFORE the
			//complete move was shown
			setTimeout(function(){
				alert("I think we have a 'Check' situation?!");
			}, 100);
		}
		
		if(isCheck)
		{
			chessFunctionsModule.checkCheckmate();
		}
	},
	OutputTickerInformation: function() {
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
	
		this.$tickerDiv.html("There are " + pieceCount + " pieces left on the board:<BR>" +
		"WhitePlayer: " + whiteCount + "<BR>" +
		"BlackPlayer: " + blackCount + "<BR>");
	},
	displayPieceImage: function() {
		var squareOneDiv = chessModule.$chess.find(squareOne.divName);
		var squareTwoDiv = chessModule.$chess.find(squareTwo.divName);;

		squareOneDiv.prop("src", "");
		squareOneDiv.removeProp("src");
		squareOneDiv.removeAttr("src");
		squareTwoDiv.prop("src",currentPiece.image);
		
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
		
		this.outputMessage("Successful move - " + player + " turn.");
	},
	getIndexOfPiece: function(xCoordinate, yCoordinate){
		
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
		
	},
	pieceTrackerContainsPiece: function(xCoordinate, yCoordinate) {
		
		var containsPiece = false;
		
		var index = this.getIndexOfPiece(xCoordinate, yCoordinate);
		
		if(index > -1)
		{
			containsPiece = true;
		}
		
		
		return containsPiece;
		
	},
	resetSquareVariables: function () {
		chessModule.resetSquareColor(squareOne);
		chessModule.resetSquareColor(squareTwo);

		squareOne = null;
		squareTwo = null;
		currentPiece = -1;
		isIllegalMove = false;
	},
	getPlayerPieceCounts: function() {
		
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
}
