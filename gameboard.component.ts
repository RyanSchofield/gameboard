import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { King } from './pieces/king/king.component';

import { Alliance } from './alliance.enum';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  public tiles?: any;

  public currentTurn: Alliance;


  constructor( ) { this.currentTurn = Alliance.WHITE }

  ngOnInit(): void {
    this.tiles = [];
    for (let i = 0; i < 8; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < 8; j++) {
        this.tiles[i][j] = {
          'color': (i + j) % 2 ? '#5F9EA0' : 'white',
        }
      }
    }
    

	  this.tiles[1][1].piece = new King(Alliance.WHITE);
	  this.tiles[5][5].piece = new King(Alliance.BLACK);
	  console.log(this.tiles);
  }

	drop(event: CdkDragDrop<any>) {
		console.log(event);
		//moveItemInArray(this.tiles, event.previousIndex, event.currentIndex);

		let target = {x: event.container.data.x, y: event.container.data.y};
		let origin = {x: event.item.data.x, y: event.item.data.y};

		if (!this._sameCoordinates(origin, target) && event.item.data.piece.validateMove(origin, target)) {
		  this.tiles[target.x][target.y].piece = event.item.data.piece;
		  this.tiles[origin.x][origin.y].piece = null;

			this.currentTurn = this.currentTurn === Alliance.WHITE ? Alliance.BLACK : Alliance.WHITE;
			console.log(this.currentTurn);
		}
		console.log('move attempted');
    
	}

	private _sameCoordinates(origin: any, target: any) {
		return origin.x === target.x && origin.y === target.y;
	}

}
