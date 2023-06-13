import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FiguresService {
  /** The base URL of the API. */
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  /**
   * This function retrieves all figures from the backend via GET request
   * @returns An Observable of any, which in our case is an object.
   */
  public getAllFigures(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}api/figures`)
      .pipe(catchError(this.handleHttpError));
  }

  /**
   * This function retrieves all units from the backend via GET request
   * @returns An Observable of any, which in our case is an object.
   */
  public getUnits(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}api/figures/units`)
      .pipe(catchError(this.handleHttpError));
  }

  /**
   * This function calculates the perimeter from the backend via POST request
   *  @returns An Observable of any, which in our case is an object.
   */
  public calculatePerimeter(data: {}): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}api/figures/perimeter`, data)
      .pipe(catchError(this.handleHttpError));
  }

  /**
   * This function calculates the area from the backend via POST request
   *  @returns An Observable of any, which in our case is an object.
   */
  public calculateArea(data: {}): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}api/figures/area`, data)
      .pipe(catchError(this.handleHttpError));
  }

  /**
   * This function handles Http errors and logs it to the console
   * @param err HttpErrorResponse.
   */
  private handleHttpError(err: HttpErrorResponse) {
    let error: string;

    if (err.error instanceof ErrorEvent) {
      console.error('An error occurred:', err.error.message);
      error = `An error occurred: ${err.error.message}`;
    } else {
      console.error(
        `Backend returned code ${err.status}, body was: ${err.error}`
      );
      error = `Backend returned code ${err.status}, body was: ${err.error}`;
    }

    return throwError(err);
  }
}
