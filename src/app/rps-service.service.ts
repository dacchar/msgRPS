import { Injectable } from '@angular/core';
import {Leader} from './leader';
import config from '../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class RpsServiceService {

  gameId = 0;
  maxHits = config.gameLength;
  humanHits: number[] = [];
  aiHits: number[] = [];
  results: string[] = [];

  activeLeaderIndex = -1;

  leaders: Leader[] = [
    new Leader( 1, 'Simeon', false),
    new Leader( 2, 'Hendrik', false),
    new Leader( 3, 'Helge', false)
  ];

  trainerName: string;

  constructor() {
  }

  init() {
  }

  getLeaders(): Leader[] {
    return this.leaders;
  }

  resetLeaders() {
    for (const leader of this.leaders) {
      leader.activ = false;
    }
  }

  setLeaderActiv(i: number) {
      this.leaders[i].activ = false;
  }

  getLeaderActiv(i: number): boolean {
    return this.leaders[i].getActiv();
  }

  calculateHumanWins(): number {
    return this.calculateHumanPoints('WIN');
  }

  calculateHumanLost(): number {
    return this.calculateHumanPoints('LOSE');
  }

  calculateHumanPoints(what: string): number {
    let count = 0;
    for (const result of this.results) {
      if (result === what) {
        count++;
      }
    }
    return count;
  }

  calculateGameResult(): string {
    let winHumanCount = 0;
    let winAiCount = 0;

    for (const result of this.results) {
      if (result === 'WIN') {
        winHumanCount++;
      } else if (result === 'LOSE') {
        winAiCount++;
      }
    }

    if (winHumanCount > winAiCount) {
      return 'WIN';
    } else if (winHumanCount < winAiCount) {
      return 'LOSE';
    } else {
      return 'DRAW';
    }

  }

  reset() {
    this.humanHits = [];
    this.aiHits = [];
    this.results = [];
  }
}
