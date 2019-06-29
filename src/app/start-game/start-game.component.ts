import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RpsServiceService } from '../rps-service.service';
import { MLServiceService } from '../mlservice.service';
import { ImageServiceService } from '../image-service.service';
import {Leader} from '../leader';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {

  isLeaderChoosen: boolean;

  okImage: string;
  anonymImage: string;
  msgLogo: string;

  status: string;

  /*
  leader = new Leader(1, 'Simeon', true);
  errorMessage: string;

   */

  constructor(
    private rpsServiceService: RpsServiceService,
    private router: Router,
    private mlService: MLServiceService,
    private imageServiceService: ImageServiceService) {
  }

  ngOnInit() {
    this.rpsServiceService.init();
    this.okImage = this.imageServiceService.okImage;
    this.anonymImage = this.imageServiceService.anonymImage;
    this.msgLogo = this.imageServiceService.msgLogo;
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
    this.mlService.send2(
      {
        leaderId: this.rpsServiceService.activeLeaderIndex,
        leaderName: this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name,
        status: 'begin',
        hit: -1
      }
    ).subscribe(
      data => {
            console.log(data);
          },
      error => {
              console.log('Observer got an error: ', error);
              this.router.navigateByUrl('/error');
          }
    );


    /*
    this.mlService.send(
      {
        leaderId:  this.rpsServiceService.activeLeaderIndex,
        leaderName: this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name,
        status: 'begin',
        hit: -1
      }
    );
     */


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
