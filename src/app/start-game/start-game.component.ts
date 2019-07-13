import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RpsServiceService } from '../rps-service.service';
import { MLServiceService } from '../mlservice.service';
import { ImageServiceService } from '../image-service.service';
import { Leader } from '../leader';
import config from '../../assets/config.json';

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
  mode: string;
  trainerName: string;
  trainerNameInvalid = false;

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
    this.mode = config.mode;
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
    this.rpsServiceService.gameId = Date.now();
    console.log('Game id: ' + this.rpsServiceService.gameId);
    this.sendToML();
    this.router.navigateByUrl('/game');
  }

  startGameAsTrainer(trainerData) {
    this.rpsServiceService.gameId = Date.now();
    console.log('Game id: ' + this.rpsServiceService.gameId);
    console.log('Trainer: ' + trainerData.form.value.trainerName);
    if ( trainerData.form.value.trainerName === '' ) {
      this.trainerNameInvalid = true;
      return;
    }

    this.rpsServiceService.trainerName = trainerData.form.value.trainerName;
    this.sendToML();
    this.router.navigateByUrl('/game');
  }

  sendToML(): void {
    if (config.mode === 'playing') {
      this.mlService.send2(
        {
          gameId: this.rpsServiceService.gameId,
          leaderId: this.rpsServiceService.activeLeaderIndex,
          leaderName: this.rpsServiceService.leaders[this.rpsServiceService.activeLeaderIndex].name,
          status: 'begin',
          hit: -1,
          mode: config.mode
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
    } else if(config.mode === 'training') {
      this.mlService.send2(
        {
          gameId: this.rpsServiceService.gameId,
          leaderId: -1,
          leaderName: this.rpsServiceService.trainerName,
          status: 'begin',
          hit: -1,
          mode: config.mode
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

    }
  }
}
