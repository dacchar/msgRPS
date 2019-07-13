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

  url = config.gamepad.url;

  constructor(private httpClient: HttpClient) { }

  getTime(): Observable<Time> {
    return this.httpClient.get<Time>(this.url);
  }

  public getGamepadHit(): Observable<GamepadHit> {
    return this.httpClient.get<GamepadHit>(config.gamepad.urlGetHit);
  }

  public clearGamepad(): Observable<GamepadHit> {
    return this.httpClient.get<GamepadHit>(config.gamepad.urlClear);
  }

}
