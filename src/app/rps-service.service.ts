import { Injectable } from '@angular/core';
import {Leader} from './leader';

@Injectable({
  providedIn: 'root'
})
export class RpsServiceService {

  maxHits: number = 5;
  humanHits: number[] = [];
  aiHits: number[] = [];
  results: string[] = [];

  activeLeaderIndex: number;

  leaders: Leader[] = [
    new Leader( 1, 'Simeon', false),
    new Leader( 2, 'Hendrik', false),
    new Leader( 3, 'Helge', false)
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

  calculateHumanWins(): number {
    return this.calculateHumanPoints('WIN');
  }

  calculateHumanLost(): number {
    return this.calculateHumanPoints('LOSE');
  }

  calculateHumanPoints(what: string): number {
    let count = 0;
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i] === what) {
        count++;
      }
    }
    return count;
  }

  calculateGameResult(): string {
    let winHumanCount = 0;
    let winAiCount = 0;

    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i] === 'WIN') {
        winHumanCount++;
      } else if (this.results[i] === 'LOSE') {
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
