import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
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
  userForm: any;

  trainerForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    private rpsServiceService: RpsServiceService,
    private router: Router,
    private mlService: MLServiceService,
    private imageServiceService: ImageServiceService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.rpsServiceService.init();
    this.okImage = this.imageServiceService.okImage;
    this.anonymImage = this.imageServiceService.anonymImage;
    this.msgLogo = this.imageServiceService.msgLogo;
    this.mode = config.mode;
    this.userForm = this.formBuilder.group({
      trainerName: ['']
    });
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
    console.log(this.trainerForm.value.name);
    this.rpsServiceService.trainerName = this.trainerForm.value.name;
    this.sendToML();
    this.router.navigateByUrl('/game');
  }

  sendToML(): void {
    if(config.mode === 'playing') {
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
    } else if(config.mode === 'training') {
      this.mlService.send2(
        {
          leaderId: -1,
          leaderName: this.trainerForm.value.name,
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

    }
  }
}
