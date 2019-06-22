import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
/*
import { Headers, RequestOptions } from '@angular/common/http';
import { Http, Response } from '@angular/common/http';
*/

import { Observable } from 'rxjs';
import {Leader} from '../leader';

@Injectable({
  providedIn: 'root'
})
export class MLServiceService {

  url = 'http://127.0.0.1:5000/sendStatus';

  /*
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

   */

  constructor(private httpClient: HttpClient) { }

  send(leader: Leader) {
    this.httpClient.put( this.url, leader )
      .subscribe(
        data  => {
          console.log("PUT Request is successful ", data);
        },
        error  => {
          console.log("Error", error);
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
