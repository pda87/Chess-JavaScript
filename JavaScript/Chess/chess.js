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
		this.$blackPlayerPieceCount = 0;
		this.$whitePlayerPieceCount = 0;
		this.$isCheck = false;
		this.$isCheckmate = false;

		this.$isIllegalMove = false;
		this.$isForCheckingCheck = false;

		this.$currentPieceIndex = -1;

		this.$checkedKing = "";
		
		//This tracks the coordinates, player and image of each piece
		this.$pieceTracker = [];
		
		this.$currentPiece = "";

		this.$squareOne = null
		this.$squareTwo = null;

		this.$imageFolder = "Images/ChessPieceImages/";
		this.setSquareXYValues();
		this.setImgIDs();
		this.bindEvents();
	
		this.outputMessage("This is chess - White goes first...");
	
		this.setupStartPieces();
		
		this.$player = "WhitePlayer";
		
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
		//Each player has 16 pieces at the start
		//16 white:
		//8 pawns:
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(0, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(1, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(2, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(3, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(4, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(5, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(6, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(7, 1, "WhitePlayer", this.$imageFolder + "P1Pawn.png"));
		
		for(i = 0; i < 8; i++)
		{
			chessModule.$pieceTracker[i].isPawn = true;
		}
			
		//White back row:
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(0, 0, "WhitePlayer", this.$imageFolder + "P1Rook.png"));
		chessModule.$pieceTracker[8].isRook = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(1, 0, "WhitePlayer", this.$imageFolder + "P1Bishop.png"));
		chessModule.$pieceTracker[9].isBishop = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(2, 0, "WhitePlayer", this.$imageFolder + "P1Knight.png"));
		chessModule.$pieceTracker[10].isKnight = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(3, 0, "WhitePlayer", this.$imageFolder + "P1Queen.png"));
		chessModule.$pieceTracker[11].isQueen = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(4, 0, "WhitePlayer", this.$imageFolder + "P1King.png"));
		chessModule.$pieceTracker[12].isKing = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(5, 0, "WhitePlayer", this.$imageFolder + "P1Knight.png"));
		chessModule.$pieceTracker[13].isKnight = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(6, 0, "WhitePlayer", this.$imageFolder + "P1Bishop.png"));
		chessModule.$pieceTracker[14].isBishop = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(7, 0, "WhitePlayer", this.$imageFolder + "P1Rook.png"));
		chessModule.$pieceTracker[15].isRook = true;
		
		//16 black
		//8 pawns:
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(0, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(1, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(2, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(3, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(4, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(5, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(6, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(7, 6, "BlackPlayer", this.$imageFolder + "P2Pawn.png"));
		
		for(i = 16; i < 24; i++)
		{
			chessModule.$pieceTracker[i].isPawn = true;
		}
		
		//Black back row:
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(0, 7, "BlackPlayer", this.$imageFolder + "P2Rook.png"));
		chessModule.$pieceTracker[24].isRook = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(1, 7, "BlackPlayer", this.$imageFolder + "P2Bishop.png"));
		chessModule.$pieceTracker[25].isBishop = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(2, 7, "BlackPlayer", this.$imageFolder + "P2Knight.png"));
		chessModule.$pieceTracker[26].isKnight = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(3, 7, "BlackPlayer", this.$imageFolder + "P2Queen.png"));
		chessModule.$pieceTracker[27].isQueen = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(4, 7, "BlackPlayer", this.$imageFolder + "P2King.png"));
		chessModule.$pieceTracker[28].isKing = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(5, 7, "BlackPlayer", this.$imageFolder + "P2Knight.png"));
		chessModule.$pieceTracker[29].isKnight = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(6, 7, "BlackPlayer", this.$imageFolder + "P2Bishop.png"));
		chessModule.$pieceTracker[30].isBishop = true;
		chessModule.$pieceTracker.push(new chessFunctionsModule.square(7, 7, "BlackPlayer", this.$imageFolder + "P2Rook.png"));
		chessModule.$pieceTracker[31].isRook = true;
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

		if(chessModule.$squareOne == null)
		{
			chessModule.$squareOne = new chessFunctionsModule.square(xCoordinate, yCoordinate, chessModule.$player);
			chessModule.outputMessage(chessModule.$player + " first square selected");
			chessModule.setSquareAsClicked(clickedSquare);
			return;
		}
		
		if(chessModule.$squareOne != null)
		{
			chessModule.$squareTwo = new chessFunctionsModule.square(xCoordinate, yCoordinate, chessModule.$player);
			chessModule.setSquareAsClicked(clickedSquare);
		}

		if(chessModule.$squareOne.divName == chessModule.$squareTwo.divName)
		{
			chessMovesModule.illegalMove();
			return;
		}
		
		chessModule.$currentPieceIndex = chessModule.getIndexOfPiece(chessModule.$squareOne.xCoordinate, chessModule.$squareOne.yCoordinate);
			
		if(chessModule.$currentPieceIndex == -1)
		{
			chessModule.outputMessage(" ");
		}
		else
		{
			chessModule.$currentPiece = chessModule.$pieceTracker[chessModule.$currentPieceIndex];	
		}

		chessMovesModule.identifyPiece();
			
		chessModule.resetSquareVariables();
		chessModule.getPlayerPieceCounts();
		chessModule.OutputTickerInformation();
		
		if(chessModule.$isCheck)
		{
			//I needed a timeout here or otherwise the "I think we have a 'Check' situation" text was popping up BEFORE the
			//complete move was shown
			setTimeout(function(){
				alert("I think we have a 'Check' situation?!");
			}, 100);
		}
		
		if(chessModule.$isCheck)
		{
			chessFunctionsModule.checkCheckmate();
		}
	},
	OutputTickerInformation: function() {
		var whiteCount = 0;
		var blackCount = 0;
		var pieceCount = chessModule.$pieceTracker.length;
		
		for(i = 0; i < pieceCount; i++)
		{
			if(chessModule.$pieceTracker[i].player == "WhitePlayer" && chessModule.$pieceTracker[i].pieceIsAlive)
				whiteCount++;
			
			if(chessModule.$pieceTracker[i].player == "BlackPlayer" && chessModule.$pieceTracker[i].pieceIsAlive)
				blackCount++;
		}
	
		this.$tickerDiv.html("There are " + pieceCount + " pieces left on the board:<BR>" +
		"WhitePlayer: " + whiteCount + "<BR>" +
		"BlackPlayer: " + blackCount + "<BR>");
	},
	displayPieceImage: function() {
		var squareOneDiv = chessModule.$chess.find(chessModule.$squareOne.divName);
		var squareTwoDiv = chessModule.$chess.find(chessModule.$squareTwo.divName);

		squareOneDiv.prop("src", "");
		squareOneDiv.removeProp("src");
		squareOneDiv.removeAttr("src");
		squareTwoDiv.prop("src",chessModule.$currentPiece.image);
		
		if(chessModule.$player == "WhitePlayer")
		{
			chessModule.$player = "BlackPlayer";
		}
		else if(chessModule.$player == "BlackPlayer")
		{
			chessModule.$player = "WhitePlayer";
		}
		else
		{
			alert("displayPieceImage() - Unknown player?!");
		}
		
		this.outputMessage("Successful move - " + chessModule.$player + " turn.");
	},
	getIndexOfPiece: function(xCoordinate, yCoordinate){
		
		var pieceIndex = -1;
			
		for(var i = 0; i < chessModule.$pieceTracker.length; i++)
		{
			if(chessModule.$pieceTracker[i].xCoordinate == xCoordinate
			&& chessModule.$pieceTracker[i].yCoordinate == yCoordinate
			&& chessModule.$pieceTracker[i].pieceIsAlive)
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
		chessModule.resetSquareColor(chessModule.$squareOne);
		chessModule.resetSquareColor(chessModule.$squareTwo);

		chessModule.$squareOne = null;
		chessModule.$squareTwo = null;
		chessModule.$currentPiece = -1;
		chessModule.$isIllegalMove = false;
	},
	getPlayerPieceCounts: function() {
		
		chessModule.$blackPlayerPieceCount = 0;
		chessModule.$whitePlayerPieceCount = 0;
			
		for(i = 0; i < chessModule.$pieceTracker.length; i++)
		{
			if(chessModule.$pieceTracker[i].pieceIsAlive)
			{
				if(chessModule.$pieceTracker[i].player == "BlackPlayer")
				{
					chessModule.$blackPlayerPieceCount++;
				}
				
				else if(chessModule.$pieceTracker[i].player == "WhitePlayer")
				{
					chessModule.$whitePlayerPieceCount++;
				}
				
				else
				{
					alert("getPlayerPieceCounts function - neither black nor white?!");
				}
				
			}
		}
	}
}