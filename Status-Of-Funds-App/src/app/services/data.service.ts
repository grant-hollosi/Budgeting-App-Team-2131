import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  results: any[];
  previousQuery: string;
  public promise: any;
  constructor(private http: HttpClient) { 
    this.results = new Array();
  }

  wipe() {
    this.results = new Array();
  }

  populate(query: string) {
    if (this.previousQuery && query == this.previousQuery) {
      return this.promise;
    } else {
      this.wipe();
      let data = this.getQuery(query);
      this.promise = new Promise((resolve) => {
        data.then((result) => {
          if (Array.isArray(result)) {
            this.results = result;
            this.previousQuery = query;
            resolve(this.results);
          }
        });
      });
      return this.promise;
    }
  }

  async getQuery(query) {
    let url = "https://rxlhaqtsbl.execute-api.us-east-2.amazonaws.com/v1/populate/?query=" + query;
    let req = this.http.get(url);
    let results = new Promise((resolve) => {
      req.subscribe((data) => {
        resolve(JSON.parse(data.toString()));
      })
    });
    return results;
  }

  getResults() {
    return this.results;
  }
}
