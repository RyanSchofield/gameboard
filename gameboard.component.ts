import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Alliance } from './alliance.enum';
import { King } from './pieces/king/king.component';
import { Bishop } from './pieces/bishop/bishop.component';
import { Rook } from './pieces/rook/rook.component';
import { Knight } from './pieces/knight/knight.component';
import { Queen } from './pieces/queen/queen.component';
import { Pawn } from './pieces/pawn/pawn.component';

import { Graveyard } from './graveyard/graveyard.component';


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

  constructor( ) { this.currentTurn = Alliance.WHITE; this.highlightedTiles = this._noHighlightedTiles(); this._unhighlightedTiles = this._noHighlightedTiles()}

  ngOnInit(): void {
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

	this.whiteGraveyard = [new Pawn(Alliance.WHITE)];
	this.blackGraveyard = [];
	
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

		let target = {x: event.container.data.x, y: event.container.data.y};
		let origin = {x: event.item.data.x, y: event.item.data.y};

		if (!this._sameCoordinates(origin, target) && event.item.data.piece.validateMove(origin, target, this.tiles)) {
		
			if (this._tileHasEnemy(target, this.tiles, event.item.data.piece.alliance)) {
				if (this.tiles[target.x][target.y].piece.alliance === Alliance.WHITE) {
					this.whiteGraveyard?.push(this.tiles[target.x][target.y].piece);
					console.log(this.whiteGraveyard);
				} else {
					this.blackGraveyard?.push(this.tiles[target.x][target.y].piece);
					console.log(this.blackGraveyard);
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

			this.currentTurn = this.currentTurn === Alliance.WHITE ? Alliance.BLACK : Alliance.WHITE;
			// console.log('moved piece');
			console.log(this.currentTurn ? 'white to move' : 'black to move');
			
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
