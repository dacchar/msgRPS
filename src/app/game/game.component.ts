import { Component, OnInit } from '@angular/core';
import { RpsServiceService } from '../rps-service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  currentHit: number;

  constructor(private rpsServiceService:RpsServiceService) { }

  ngOnInit() {
  }

  getLeaderActiv(i: number): boolean {
    return this.rpsServiceService.getLeaderActiv(i);
  }

  addRock() {
    this.currentHit = 0;
  }

  addPaper(){
    this.currentHit = 1;
  }

  addScissors(){
    this.currentHit = 2;
  }
}
