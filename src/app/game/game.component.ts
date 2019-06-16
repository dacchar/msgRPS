import { Component, OnInit } from '@angular/core';
import { RpsServiceService } from '../rps-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  currentHit: number = -1;
  currentAiHit: number = -1;
  hitIndex: number = 0;

  constructor(private rpsServiceService: RpsServiceService, private router: Router) { }

  ngOnInit() {
  }

  getLeaderActiv(i: number): boolean {
    return this.rpsServiceService.getLeaderActiv(i);
  }

  getMaxHits(): number {
    return this.rpsServiceService.maxHits;
  }

  addRock() {
    this.humanHit(0);
  }

  addPaper() {
    this.humanHit(1);
  }

  addScissors() {
    this.humanHit(2);
  }

  increaseHit() {
    this.hitIndex++;
    this.aiHit();
    if ( this.hitIndex === this.getMaxHits() ) {
      this.router.navigateByUrl( '/FinishGameComponent' );
    }
  }

  humanHit(hit: number) {
    console.log(hit);
    this.currentHit = hit;
    this.rpsServiceService.humanHits.push(hit);
    this.increaseHit();
  }

  aiHit() {
    this.currentAiHit = 1;
    this.rpsServiceService.aiHits.push(this.currentAiHit);
  }

  getBackgroundColor(): string {
    return 'green';
    /*
    if(this.results[i]==='WIN') {
      return 'green';
    } else if(this.results[i]==='LOSE') {
      return 'red';
    } else {
      return 'yellow';
    }

     */
  }

}
