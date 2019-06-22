import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RpsServiceService } from '../rps-service.service';
import { MLServiceService } from '../mlservice.service';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.css']
})
export class FinishGameComponent implements OnInit {

  constructor(private rpsServiceService: RpsServiceService, private router: Router, private mlService: MLServiceService) {
  }

  ngOnInit() {
  }

  calculateGameResult(): string {
    return this.rpsServiceService.calculateGameResult();
  }

  calculateHumanWins(): number {
    return this.rpsServiceService.calculateHumanWins();
  }

  calculateHumanLost(): number {
    return this.rpsServiceService.calculateHumanLost();
  }

  reset() {
    this.rpsServiceService.reset();
  }

  nextPage() {
    this.sendToML();
    this.reset();
    this.router.navigateByUrl('/StartGameComponent');
  }

  sendToML(): void {
    this.mlService.send(
      {
        leaderId: this.rpsServiceService.activeLeaderIndex,
        leaderName: this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name,
        status: 'end',
        hit: -1
      }
    );
  }
}
