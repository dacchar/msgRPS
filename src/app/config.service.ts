import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  gameLength: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }
}
