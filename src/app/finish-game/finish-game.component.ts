import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RpsServiceService } from '../rps-service.service';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.css']
})
export class FinishGameComponent implements OnInit {

  constructor(private rpsServiceService: RpsServiceService, private router: Router) { }

  ngOnInit() {
  }

  calculateGameResult(): string {
    return this.rpsServiceService.calculateGameResult();
  }

  calculateHumanWins() : number {
    return this.rpsServiceService.calculateHumanWins();
  }

  calculateHumanLost() : number {
    return this.rpsServiceService.calculateHumanLost();
  }

  reset() {
    this.rpsServiceService.reset();
  }

  nextPage() {
    this.reset();
    this.router.navigateByUrl('/StartGameComponent');
  }

}
