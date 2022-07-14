import { Component, OnInit } from '@angular/core';
import { Alliance } from '../../alliance.enum';

@Component({
  selector: 'app-knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.css']
})
export class Knight implements OnInit {
  
  public typeDisplay = 'knight';
  public alliance: Alliance;
  public image: string;
  public isMysterious?: boolean = false;

	constructor(alliance: Alliance) {
		this.alliance = alliance;
    this.image = this.alliance === Alliance.WHITE ? 'assets/white-knight.png' : 'assets/black-knight.png';
	}

  ngOnInit(): void {
  }

  public makeMysterious() {
    this.isMysterious = true;
  }

  public validateMove(origin: any, target: any, tiles: boolean[][]) {
    return this.getValidMoveTiles(origin, tiles)[target.x][target.y];
  }

  public getValidMoveTiles(origin: any, tiles: any[]): any[][] {
    let validMoves: any[][] = [];
    console.log('getting valid moves');

	  for (let i = 0; i < tiles.length; i++) {
	    validMoves[i] = [];
    }
    
    //right up
    if (origin.x + 2 < 8 && origin.y + 1 < 8) {
      if (!this._tileHasAlly(tiles[origin.x + 2][origin.y + 1], tiles)) {
        console.log('tile has ally');
        validMoves[origin.x + 2][origin.y + 1] = true;
      } 

      if (this._tileHasEnemy(tiles[origin.x + 2][origin.y + 1], tiles)) {
      }
    }

    //up right
    if (origin.x + 1 < 8 && origin.y + 2 < 8) {
      if (!this._tileHasAlly(tiles[origin.x + 1][origin.y + 2], tiles)) {
        console.log('tile has ally');
        validMoves[origin.x + 1][origin.y + 2] = true;
      } 

      if (this._tileHasEnemy(tiles[origin.x + 1][origin.y + 2], tiles)) {
      }
    }

    //up left
    if (origin.x - 1 > -1 && origin.y + 2 < 8) {
      if (!this._tileHasAlly(tiles[origin.x - 1][origin.y + 2], tiles)) {
        console.log('tile has ally');
        validMoves[origin.x - 1][origin.y + 2] = true;
      } 

      if (this._tileHasEnemy(tiles[origin.x - 1][origin.y + 2], tiles)) {
      }
    }

    //left up
    if (origin.x - 2 > -1 && origin.y + 1 < 8) {
      if (!this._tileHasAlly(tiles[origin.x - 2][origin.y + 1], tiles)) {
        console.log('tile has ally');
        validMoves[origin.x - 2][origin.y + 1] = true;
      } 

      if (this._tileHasEnemy(tiles[origin.x - 2][origin.y + 1], tiles)) {
      }
    }

    //right down
    if (origin.x + 2 < 7 && origin.y - 1 > - 1) {
      if (!this._tileHasAlly(tiles[origin.x + 2][origin.y - 1], tiles)) {
        console.log('tile has ally');
        validMoves[origin.x + 2][origin.y - 1] = true;
      } 

      if (this._tileHasEnemy(tiles[origin.x + 2][origin.y - 1], tiles)) {
      }
    }

    //down right
    if (origin.x + 1 < 7 && origin.y - 2 > -1) {
      if (!this._tileHasAlly(tiles[origin.x + 1][origin.y - 2], tiles)) {
        console.log('tile has ally');
        validMoves[origin.x + 1][origin.y - 2] = true;
      } 

      if (this._tileHasEnemy(tiles[origin.x + 1][origin.y - 2], tiles)) {
      }
    }

    //up left
    if (origin.x - 1 > -1 && origin.y - 2 > -1) {
      if (!this._tileHasAlly(tiles[origin.x - 1][origin.y - 2], tiles)) {
        console.log('tile has ally');
        validMoves[origin.x - 1][origin.y - 2] = true;
      } 

      if (this._tileHasEnemy(tiles[origin.x - 1][origin.y - 2], tiles)) {
      }
    }

    //left down
    if (origin.x - 2 > -1 && origin.y - 1 > -1) {
      if (!this._tileHasAlly(tiles[origin.x - 2][origin.y - 1], tiles)) {
        console.log('tile has ally');
        validMoves[origin.x - 2][origin.y - 1] = true;
      } 

      if (this._tileHasEnemy(tiles[origin.x - 2][origin.y - 1], tiles)) {
      }
    }

    return validMoves;
  }

  private _tileHasAlly(tile: any, boardTiles: any[][]) : boolean {
    // if (boardTiles[tile.x][tile.y] === undefined) return false;
    if (boardTiles[tile.x][tile.y].piece?.alliance === this.alliance) {
      return true;
    }

    return false;
  }

  private _tileHasEnemy(tile: any, boardTiles: any[][]) : boolean {
    if (!boardTiles[tile.x][tile.y].piece) return false;
    if (boardTiles[tile.x][tile.y].piece.alliance !== this.alliance) {
      return true;
    }

    return false;
  }
}
