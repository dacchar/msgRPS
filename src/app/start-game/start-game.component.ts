import { Component, OnInit } from '@angular/core';
import { RpsServiceService } from '../rps-service.service';
import {Leader} from '../leader';
/*
import {Leader} from './leader';

 */

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {

  isLeaderChoosen: boolean;

  constructor(private rpsServiceService:RpsServiceService) { }

  ngOnInit() {
    this.rpsServiceService.init();
  }

  chooseImage(i: number) {
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

}
