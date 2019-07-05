import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RpsServiceService } from '../rps-service.service';
import { MLServiceService } from '../mlservice.service';
import { ImageServiceService } from '../image-service.service';
import config from '../../assets/config.json';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.css']
})
export class FinishGameComponent implements OnInit {

  msgLogo: string;

  constructor(
    private rpsServiceService: RpsServiceService,
    private router: Router,
    private mlService: MLServiceService,
    private imageServiceService: ImageServiceService
  ) {
  }

  ngOnInit() {
    this.msgLogo = this.imageServiceService.msgLogo;
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

    var leaderIdCurrent: number;
    var leaderNameCurrent: string;
    if (config.mode === 'playing') {
      leaderIdCurrent = this.rpsServiceService.activeLeaderIndex;
      leaderNameCurrent = this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name;
    } else {
      leaderIdCurrent = -1;
      leaderNameCurrent = this.rpsServiceService.trainerName;
    }

    this.mlService.send2(
      {
        leaderId: leaderIdCurrent,
        leaderName: leaderNameCurrent,
        status: 'end',
        hit: -1
      }
    ).subscribe(
      data => {
        console.log(data);
        /*
        this.status = status;
         */
      }
    );


    /*
    this.mlService.send(
      {
        leaderId: this.rpsServiceService.activeLeaderIndex,
        leaderName: this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name,
        status: 'end',
        hit: -1
      }
    );
     */
  }
}
