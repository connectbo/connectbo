import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Cheep } from './cheeps';

@Injectable({
  providedIn: 'root'
})
export class CheepsService {
  baseUrl = 'http://localhost/api';
  cheeps: Cheep[];

  constructor(private http: HttpClient) { }
  getAll(): Observable<Cheep[]> {
    return this.http.get(`https://www.connectbo.com/chirper/getcheeps.php`).pipe(
      map((res) => {
        this.cheeps = res['data'];
        return this.cheeps;
    }),
    catchError(this.handleError));
  }

  delete(id: number): Observable<Cheep[]> {
    const params = new HttpParams()
      .set('cheepid', id.toString());

    return this.http.delete(`https://www.connectbo.com/chirper/getcheeps.php`, { params: params })
      .pipe(map(res => {
        const filteredCheeps = this.cheeps.filter((car) => {
          return +Cheep['id'] !== +id;
        });
        return this.cheeps = filteredCheeps;
      }),
      catchError(this.handleError));
}


  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
