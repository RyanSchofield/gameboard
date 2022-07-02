import { Component, OnInit } from '@angular/core';
import { Alliance } from '../../alliance.enum';

@Component({
  selector: 'app-king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.css']
})
export class King implements OnInit {
  
  public typeDisplay = 'king';
  public alliance: Alliance;

	constructor(alliance: Alliance) {
		this.alliance = alliance;
	}

  ngOnInit(): void {
  }

  public validateMove(origin: any, target: any) {
    return Math.abs(origin.x - target.x) <= 1 && Math.abs(origin.y - target.y) <= 1;
  }

  public getValidMovePositions(target: any) {
    let validMoves = [];
    
    if (target.x + 1 < 8 && target.y + 1 < 8) {
      validMoves.push(5);
    }
  }
}
