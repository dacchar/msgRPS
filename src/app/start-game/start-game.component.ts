import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RpsServiceService } from '../rps-service.service';
import { MLServiceService } from '../mlservice.service';
import {Leader} from '../leader';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {

  isLeaderChoosen: boolean;

  /*
  leader = new Leader(1, 'Simeon', true);
  errorMessage: string;

   */

  constructor(private rpsServiceService: RpsServiceService, private router: Router, private mlService: MLServiceService) { }

  ngOnInit() {
    this.rpsServiceService.init();
  }

  chooseImage(i: number) {
    this.rpsServiceService.activeLeaderIndex = i;
    this.rpsServiceService.resetLeaders();
    this.rpsServiceService.getLeaders()[i].activ = true;
    this.isLeaderChoosen = true;
  }

  getLeaderActiv(i: number): boolean {
    return this.rpsServiceService.getLeaderActiv(i);
  }

  setLeaderActiv(i: number) {
    this.rpsServiceService.setLeaderActiv(i);
  }

  getLeaders(): Leader[] {
    return this.rpsServiceService.getLeaders();
  }

  startGame() {
    this.sendToML();
    this.router.navigateByUrl('/game');
  }

  sendToML(): void {
    this.mlService.send(
      {
        leaderId:  this.rpsServiceService.activeLeaderIndex,
        leaderName: this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name,
        status: 'begin',
        hit: -1
      }
    );

    /*
    this.mlService.startGame();
     */

    /*
    this.mlService.startGame(this.leader)
      .subscribe( leader => {
        },
        error => this.errorMessage = <any> error);

     */
  }
}
