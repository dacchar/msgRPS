import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import config from '../assets/config.json';

export interface GameStatus {
  leaderId: number;
  leaderName: string;
  hit: number;
  status: string;
  mode: string;
}

@Injectable({
  providedIn: 'root'
})
export class MLServiceService {

  url = config.url;

  constructor(private httpClient: HttpClient) { }

  send2(gameStatus: GameStatus): Observable<GameStatus> {
    return this.httpClient.post<GameStatus>(this.url, gameStatus);
  }
}
