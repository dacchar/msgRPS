import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import config from '../assets/config.json';

export interface Time {
  datetime: string;
}

export interface GamepadHit {
  timestamp: number;
  hit: number;
}

@Injectable({
  providedIn: 'root'
})
export class GamepadServiceService {

  url = config.gamepadUrl;

  constructor(private httpClient: HttpClient) { }

  getTime(): Observable<Time> {
    return this.httpClient.get<Time>(this.url);
  }

  public getJSON(): Observable<any> {
    return this.httpClient.get('./assets/mydata.json');
  }

  public getGamepadHit(): Observable<GamepadHit> {
    return this.httpClient.get<GamepadHit>(config.gamepadUrl2);
  }
}
