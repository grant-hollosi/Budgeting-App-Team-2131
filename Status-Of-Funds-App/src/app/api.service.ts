import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

// import express from 'express';
// import cors from 'cors';

// const cors = require("cors");
// const express = require("express");
// const app = express();
// app.use(cors({
//   origin: 'http://localhost:8100'
// }));

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "https://rxlhaqtsbl.execute-api.us-east-2.amazonaws.com/test/test";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occured:`, error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status},` + `body was: ${error.error}`
      );
    }
    return throwError(`Something bad happened, please try again later.`);
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getDataUser(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
}
