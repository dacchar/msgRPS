import { Injectable } from '@angular/core';
import {Leader} from './leader';

@Injectable({
  providedIn: 'root'
})
export class RpsServiceService {

  maxHits: number = 5;
  humanHits: number[] = [];
  aiHits: number[] = [];

  leaders: Leader[] = [
    new Leader( 1, 'Simeon', false),
    new Leader( 2, 'Hendrik', false),
    new Leader( 3, 'Max', false)
  ];

  constructor() {
  }

  init() {
  }

  getLeaders(): Leader[] {
    return this.leaders;
  }

  resetLeaders() {
    for (const leaderIndex in this.leaders) {
      this.leaders[leaderIndex].activ = false;
    }
  }

  setLeaderActiv(i: number) {
      this.leaders[i].activ = false;
  }

  getLeaderActiv(i: number): boolean {
    return this.leaders[i].getActiv();
  }
}
