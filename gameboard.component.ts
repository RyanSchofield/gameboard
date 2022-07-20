import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Alliance } from './alliance.enum';
import { King } from './pieces/king/king.component';
import { Bishop } from './pieces/bishop/bishop.component';
import { Rook } from './pieces/rook/rook.component';
import { Knight } from './pieces/knight/knight.component';
import { Queen } from './pieces/queen/queen.component';
import { Pawn } from './pieces/pawn/pawn.component';

// import { Graveyard } from './graveyard/graveyard.component';

// import { io } from "socket.io-client";

 
@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  	public tiles?: any;

  	public currentTurn: Alliance;

	public highlightedTiles: any[][];

	private _unhighlightedTiles : any[][];

	private _whiteReserve?: any[];

	private _blackReserve?: any[];

	public whiteGraveyard?: any[];
	
	public blackGraveyard?: any[];

	public message: string = '';

	private socket: any;

	public currentPlayerColor?: Alliance;

  constructor( ) { this.currentTurn = Alliance.WHITE; this.highlightedTiles = this._noHighlightedTiles(); this._unhighlightedTiles = this._noHighlightedTiles()}

  ngOnInit(): void {
	// this.socket= io("http://192.168.1.2:3000");

	// this.socket.on("setPlayerColor", (data:any) => {
	// 	this.currentPlayerColor = data ? Alliance.WHITE : Alliance.BLACK;
	// 	console.log(this.currentPlayerColor);
	// })

	// this.socket.on("moveUpdate", (data: any) => {
	// 	console.log('moveUpdate');
	// 	// this.tiles = data.tiles;
	// 	this.currentTurn = data.currentTurn;
	// 	// this.whiteGraveyard = data.whiteGraveyard;
	// 	// this.blackGraveyard = data.blackGraveyard;
	// 	// this._whiteReserve = data.whiteReserve;
	// 	// this._blackReserve = data.blackReserve;
	// })

	this._whiteReserve = [
		new Rook(Alliance.WHITE),
		new Knight(Alliance.WHITE),
		new Bishop(Alliance.WHITE),
		// new King(Alliance.WHITE),
		new Queen(Alliance.WHITE),
		new Bishop(Alliance.WHITE),
		new Knight(Alliance.WHITE),
		new Rook(Alliance.WHITE),
		new Pawn(Alliance.WHITE),
		new Pawn(Alliance.WHITE),
		new Pawn(Alliance.WHITE),
		new Pawn(Alliance.WHITE),
		new Pawn(Alliance.WHITE),
		new Pawn(Alliance.WHITE),
		new Pawn(Alliance.WHITE),
		new Pawn(Alliance.WHITE),
	];

	this._blackReserve = [
		new Rook(Alliance.BLACK),
		new Knight(Alliance.BLACK),
		new Bishop(Alliance.BLACK),
		// new King(Alliance.BLACK),
		new Queen(Alliance.BLACK),
		new Bishop(Alliance.BLACK),
		new Knight(Alliance.BLACK),
		new Rook(Alliance.BLACK),
		new Pawn(Alliance.BLACK),
		new Pawn(Alliance.BLACK),
		new Pawn(Alliance.BLACK),
		new Pawn(Alliance.BLACK),
		new Pawn(Alliance.BLACK),
		new Pawn(Alliance.BLACK),
		new Pawn(Alliance.BLACK),
		new Pawn(Alliance.BLACK),
	];

	this._whiteReserve = this._whiteReserve
  		.map(value => ({ value, sort: Math.random() }))
  		.sort((a, b) => a.sort - b.sort)
  		.map(({ value }) => value);

	this._blackReserve = this._blackReserve
  		.map(value => ({ value, sort: Math.random() }))
  		.sort((a, b) => a.sort - b.sort)
  		.map(({ value }) => value);

	// this._whiteGraveyard = new Graveyard();
	// this._blackGraveyard = new Graveyard();

	// let test = new Pawn(Alliance.BLACK);
	// console.log(test.isRevealed);
	// test.makeMysterious();
	// this.whiteGraveyard = [test];
	this.blackGraveyard = [];
	this.whiteGraveyard = [];
	
    this.tiles = [];
    for (let i = 0; i < 8; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < 8; j++) {
        this.tiles[i][j] = {
          'color': (i + j) % 2 ? '#5F9EA0' : 'white',
		  'highlightedColor': (i + j) % 2 ? '#2F6E70' : 'gray',
		  'x': i,
		  'y': j
        }
      }
    }
    this._unhighlightedTiles = this._noHighlightedTiles();
    this.highlightedTiles = this._noHighlightedTiles();

	this.tiles[0][0].piece = new Rook(Alliance.WHITE);
	this.tiles[0][1].piece = new Knight(Alliance.WHITE);
	this.tiles[0][2].piece = new Bishop(Alliance.WHITE);
	this.tiles[0][3].piece = new King(Alliance.WHITE);
	this.tiles[0][4].piece = new Queen(Alliance.WHITE);
	this.tiles[0][5].piece = new Bishop(Alliance.WHITE);
	this.tiles[0][6].piece = new Knight(Alliance.WHITE);
	this.tiles[0][7].piece = new Rook(Alliance.WHITE);

	this.tiles[1][0].piece = new Pawn(Alliance.WHITE);
	this.tiles[1][1].piece = new Pawn(Alliance.WHITE);
	this.tiles[1][2].piece = new Pawn(Alliance.WHITE);
	this.tiles[1][3].piece = new Pawn(Alliance.WHITE);
	this.tiles[1][4].piece = new Pawn(Alliance.WHITE);
	this.tiles[1][5].piece = new Pawn(Alliance.WHITE);
	this.tiles[1][6].piece = new Pawn(Alliance.WHITE);
	this.tiles[1][7].piece = new Pawn(Alliance.WHITE);

	this.tiles[7][0].piece = new Rook(Alliance.BLACK);
	this.tiles[7][1].piece = new Knight(Alliance.BLACK);
	this.tiles[7][2].piece = new Bishop(Alliance.BLACK);
	this.tiles[7][3].piece = new King(Alliance.BLACK);
	this.tiles[7][4].piece = new Queen(Alliance.BLACK);
	this.tiles[7][5].piece = new Bishop(Alliance.BLACK);
	this.tiles[7][6].piece = new Knight(Alliance.BLACK);
	this.tiles[7][7].piece = new Rook(Alliance.BLACK);

	this.tiles[6][0].piece = new Pawn(Alliance.BLACK);
	this.tiles[6][1].piece = new Pawn(Alliance.BLACK);
	this.tiles[6][2].piece = new Pawn(Alliance.BLACK);
	this.tiles[6][3].piece = new Pawn(Alliance.BLACK);
	this.tiles[6][4].piece = new Pawn(Alliance.BLACK);
	this.tiles[6][5].piece = new Pawn(Alliance.BLACK);
	this.tiles[6][6].piece = new Pawn(Alliance.BLACK);
	this.tiles[6][7].piece = new Pawn(Alliance.BLACK);
	
	
	this.tiles[0][0].piece.makeMysterious();
	this.tiles[0][1].piece.makeMysterious();
	this.tiles[0][2].piece.makeMysterious();
	// this.tiles[0][3].piece.makeMysterious();
	this.tiles[0][4].piece.makeMysterious();
	this.tiles[0][5].piece.makeMysterious();
	this.tiles[0][6].piece.makeMysterious();
	this.tiles[0][7].piece.makeMysterious();
	this.tiles[1][0].piece.makeMysterious();
	this.tiles[1][1].piece.makeMysterious();
	this.tiles[1][2].piece.makeMysterious();
	this.tiles[1][3].piece.makeMysterious();
	this.tiles[1][4].piece.makeMysterious();
	this.tiles[1][5].piece.makeMysterious();
	this.tiles[1][6].piece.makeMysterious();
	this.tiles[1][7].piece.makeMysterious();
	this.tiles[7][0].piece.makeMysterious();
	this.tiles[7][1].piece.makeMysterious();
	this.tiles[7][2].piece.makeMysterious();
	// this.tiles[7][3].piece.makeMysterious();
	this.tiles[7][4].piece.makeMysterious();
	this.tiles[7][5].piece.makeMysterious();
	this.tiles[7][6].piece.makeMysterious();
	this.tiles[7][7].piece.makeMysterious();
	this.tiles[6][0].piece.makeMysterious();
	this.tiles[6][1].piece.makeMysterious();
	this.tiles[6][2].piece.makeMysterious();
	this.tiles[6][3].piece.makeMysterious();
	this.tiles[6][4].piece.makeMysterious();
	this.tiles[6][5].piece.makeMysterious();
	this.tiles[6][6].piece.makeMysterious();
	this.tiles[6][7].piece.makeMysterious();
	//   console.log(this.tiles);

	// let shuffled = unshuffled
	//   .map(value => ({ value, sort: Math.random() }))
	//   .sort((a, b) => a.sort - b.sort)
	//   .map(({ value }) => value)
  }

	drop(event: CdkDragDrop<any>) {
		// console.log('move attempted');
		// console.log(event);
		//moveItemInArray(this.tiles, event.previousIndex, event.currentIndex);
		this.message = '';

		let target = {x: event.container.data.x, y: event.container.data.y};
		let origin = {x: event.item.data.x, y: event.item.data.y};

		if (!this._sameCoordinates(origin, target) && event.item.data.piece.validateMove(origin, target, this.tiles)) {
		
			if (this._tileHasEnemy(target, this.tiles, event.item.data.piece.alliance)) {
				if (this.tiles[target.x][target.y].piece.alliance === Alliance.WHITE) { //target is white
					if (this.tiles[target.x][target.y].piece.isMysterious) {
						let deadPiece = this._whiteReserve?.pop();
						deadPiece.makeMysterious();
						this.whiteGraveyard?.push(deadPiece);
					} else {
						this.whiteGraveyard?.push(this.tiles[target.x][target.y].piece);
					}
					console.log(this.whiteGraveyard);
				} else { // target is black
					if (this.tiles[target.x][target.y].piece.isMysterious) {
						let deadPiece = this._blackReserve?.pop();
						deadPiece.makeMysterious();
						this.blackGraveyard?.push(deadPiece);
					} else {
						this.blackGraveyard?.push(this.tiles[target.x][target.y].piece);
					}
				}
			
			}
			this.tiles[target.x][target.y].piece = event.item.data.piece;
			this.tiles[origin.x][origin.y].piece = null;

			if (this.tiles[target.x][target.y].piece.isMysterious) {
				if (this.tiles[target.x][target.y].piece.alliance === Alliance.WHITE) {
					console.log(this.tiles[target.x][target.y].piece.alliance);
					this.tiles[target.x][target.y].piece = this._whiteReserve?.pop();
				} else {
					this.tiles[target.x][target.y].piece = this._blackReserve?.pop();
				}
			}

			if (event.item.data.piece.typeDisplay === 'pawn' 
				&& event.item.data.piece.alliance === Alliance.WHITE 
				&& target.x === 7
			) {
				this.tiles[target.x][target.y].piece = new Queen(Alliance.WHITE);
				this.message = 'Pawn promoted';
			}

			if (event.item.data.piece.typeDisplay === 'pawn' 
				&& event.item.data.piece.alliance === Alliance.BLACK 
				&& target.x === 0
			) {
				this.tiles[target.x][target.y].piece = new Queen(Alliance.BLACK);
				this.message = 'Pawn promoted';
			}

			
			this.currentTurn = this.currentTurn === Alliance.WHITE ? Alliance.BLACK : Alliance.WHITE;
			// console.log('moved piece');
			console.log(this.currentTurn ? 'white to move' : 'black to move');
			// this.socket.emit("move",  {
			// 	tiles: this.tiles,
			// 	currentTurn: this.currentTurn,
			// 	whiteReserve: this._whiteReserve,
			// 	blackResrve: this._blackReserve,
			// 	whiteGraveyard: this.whiteGraveyard,
			// 	blackGraveyard: this.blackGraveyard
			// });
		}
		this.highlightedTiles = this._unhighlightedTiles;
    
	}

	private _sameCoordinates(origin: any, target: any) {
		return origin.x === target.x && origin.y === target.y;
	}

	drag(event: any) {
		// console.log('moving piece');
		// console.log(event.source);
		this.highlightedTiles = event.source.data.piece.getValidMoveTiles({x: event.source.data.x, y: event.source.data.y}, this.tiles);
		
	}

	private _noHighlightedTiles() {
		let tiles: any = [];
	    for (let i = 0; i < 8; i++) {
	            tiles[i] = [];
 	     	    for (let j = 0; j < 8; j++) {
     		         tiles[i][j] = false;
           	 }
	    }
	    return tiles;
	}

	private _tileHasEnemy(tile: any, boardTiles: any[][], movedPieceAlliance: boolean) : boolean {
		if (!boardTiles[tile.x][tile.y].piece) return false;
		if (boardTiles[tile.x][tile.y].piece.alliance !== movedPieceAlliance) {
		  return true;
		}
	
		return false;
	}
}

//socket logic.
// first step. display data on connection.
/**
 * on the back end, have a player one, player two and spectator arrays with all the sockets
 * when a socket connects, set player one, two, and spectators in that priority.
 * 
 * store a two dimensional array for tiles on the backend, initialized to initial conditions of chess?
 * 
 * emit the player color, current turn color, tiles and spectator status to each new connection. on the client side, 
 * accept these as inputs and set them on the gameboard instance.  
 * 
 * client side changes:
 * Only allow nonspectators to move if currentPlayerAlliance is equal to current turn color
 * in move update event. i. e. disable cdkDrag for spectators. spectators can have white player color by default.
 * change client side so that black has pieces close to them, and inverted from whites point of view.
 * Don't allow enemy's hidden graveyard pieces to be revealed.
 * 
 * On moving a piece in the client, emit a move event to the socket. Change the current turn variable to prevent a move.
 * 
 * On the backend, when an emitted move event occurs, send a moveUpdate event to all the connections with the updated tiles and current turn.
 * 
 * on the client side, set tiles and current turn from app component when it recieves moveUpdate.
 * implement game end logic, and when the game ends emit a gameEnd event. 
 * 
 * on the back end, when a gameEnd event is recieved, emit blank tiles to all sockets.
 * 
 * on the back end, when disconnect even is received, unset the corresponding socket variable.
 * 
 * 
 * enhancement: 
 * when opening the page, display a question asking if they want to play local or online.
 * 
 * enhancement: 
 * implement a refresh somehow (button, route?), that calls a method on gameboard, sending a moveUpdate with initial condition tiles.
 * 
 * enhancement:
 * create a chatbox element where all sockets can emit sendMessage events from client, and on server emit messageReceived events to clients updating 
 * the chat messages. Chat messages can be stored on the client and server as an array. On the client component, just display the user: message for each
 * message in the array. have a text input which emits the sendMessage event, pushing the message data to serverside array when the event is registered.
 * have a clear messages button, which events a clearMessage event, reseeting the serverside array and senging that in a moveReceieved event to the client.
 * 
 * idea:
 * listen for disconnect events and reset the tiles when all the sockets are unset.
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * have origin and target be the only data transmitted.
 * on socket connection, send the current state (tiles, graveyards, reserves) from server.
 * implement a method on the client to receive those data and set the board.
 * on moving a piece, emit a socket event with target coordinates.
 * when the server receives the move event, emit a moveUpdate event to all sockets.
 * when the client receives a moveUpdate event, call a method which moves a piece (this method may need to be implemented, and refactor existing)
 * 
 */