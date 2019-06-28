import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/*
import { Observable } from 'rxjs/Observable';

 */
import { HttpHeaders } from '@angular/common/http';
import {Leader} from './leader';


/*
import { Headers, RequestOptions } from '@angular/common/http';
import { Http, Response } from '@angular/common/http';
*/

/*
import { Observable } from 'rxjs';

 */

/*
import {Leader} from '../leader';
 */


export interface GameStatus {
  leaderId: number;
  leaderName: string;
  hit: number;
  status: string;
}


export interface Resp {
  status: string;
}


@Injectable({
  providedIn: 'root'
})
export class MLServiceService {

  url = 'http://127.0.0.1:5000/sendStatus';
  urlGetAIHit = 'http://127.0.0.1:5000/getAIHit';
  hit = -1;

  /*
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

   */

  constructor(private httpClient: HttpClient) { }

  async getAIHit2() {
    return await this.httpClient.get(this.urlGetAIHit).toPromise();
  }

  async getAsyncData() {
    /*
    var asyncResult = await this.httpClient.get(this.urlGetAIHit).toPromise();
    console.log('No issues, I will wait until promise is resolved..');
    console.log('Result:');
    console.log(asyncResult.hit);
    this.hit = asyncResult.hit;

     */
  }

  send2(gameStatus: GameStatus): Observable<GameStatus> {
    return this.httpClient.post<GameStatus>(this.url, gameStatus);
  }

  send(leader: Leader) {
    this.httpClient.put( this.url, Leader )
      .subscribe(
        data  => {
          console.log('PUT Request is successful.', data);
        },
        error  => {
          console.log('Error', error);
        }
      );
  }

  /*
  public getItem<T>(): Promise<T> {
    return this.httpClient.get<T>(this.urlGetAIHit);
  }

  getAIHit(): Observable<Object> {
    return this.httpClient.get( this.urlGetAIHit );
  }

   */

  getAIHit() {
    this.httpClient.get( this.urlGetAIHit )
      .subscribe(
        data  => {
          console.log('GET Request is successful.', data);
        },
        error  => {
          console.log('Error', error);
        }
      );
  }


  startGame() {
    /*
    this.httpClient.put( this.url,
      {
        id:  '007',
        name:  'newcustomer001@email.com',
        activ:  true
      });
     */

    /*
    this.httpClient.put( this.url,
      {
        id:  '007',
        name:  'newcustomer001@email.com',
        active:  true
      }).pipe();

     */


    this.httpClient.put( this.url,
{
        'id':  '007',
        'name':  'newcustomer001@email.com'
      })
      .subscribe(
        data  => {
          console.log("PUT Request is successful ", data);
        },
        error  => {
          console.log("Error", error);
        }
      );

  }

/*
  startGame2 (hero: Leader): Observable<Leader> {
    return this.http.post<Leader>(this.url, hero, this.httpOptions)
      .pipe(
        catchError(this.handleError('addHero', hero))
      );
  }

 */

/*
  startGame(book: Leader): Observable<Leader> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, book, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }




  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

 */

}
