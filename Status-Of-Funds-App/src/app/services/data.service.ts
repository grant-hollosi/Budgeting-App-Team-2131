import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { triggerAsyncId } from 'async_hooks';
const bcrypt = require('bcryptjs');

@Injectable({
  providedIn: 'root'
})
export class DataService {

  hashingConfig = {
    parallelism: 1,
    memoryCost: 64000,
    timeCost: 3
  }

  results: any[];
  previousQuery: string;
  constructor(private http: HttpClient) { 
    this.results = new Array();
  }

  wipe() {
    this.results = new Array();
  }

  populate(query: string) {
    if (this.previousQuery && query == this.previousQuery) {
      return new Promise((resolve) => {
        resolve(this.results);
      });
    } else {
      this.wipe();
      let data = this.getQuery(query);
      return new Promise((resolve) => {
        data.then((result) => {
          if (Array.isArray(result)) {
            this.results = result;
            this.previousQuery = query;
            resolve(this.results);
          }
        });
      });
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

  getItem(id: number) {
    return this.populate(`SELECT * FROM dataTable WHERE id = ${id}`);
  }

  changePassword(password: string, user: string) {
    let crypt = bcrypt.hashSync(password, 10);
    let query = `UPDATE passwords SET password = '${crypt}' WHERE user_type = '${user}'`;
    let fetch = this.getQuery(query);
    return new Promise((resolve) => {
      fetch.then((result) => {
        resolve(result);
      })
    })
  }

  signIn(password: string) {
    let fetch = this.getQuery(`SELECT * FROM passwords`);
    return new Promise((resolve) => {
      fetch.then((result) => {
        if (Array.isArray(result)) {
          for (let r in result) {
            if (result[r].user_type && result[r].password && bcrypt.compareSync(password, result[r].password)) {
              resolve(result[r].user_type);
            }
          }
        }
        resolve(false);
      })
    });
  }

  async existingPassword(password: string) {
    let fetch = this.getQuery(`SELECT user_type FROM passwords`);
    return new Promise((resolve) => {
      fetch.then(async (users) => {
        if (Array.isArray(users)) {
          for (let u in users) {
            console.log(users);
            let exists = await this.passwordExists(users[u]['user_type'], password);
            if (exists) {
              resolve(true);
            }
          }
        }
        resolve(false);
      })
    });
  }

  async passwordExists(user: string, password: string) {
    let fetch = this.getQuery(`SELECT password FROM passwords WHERE user_type = '${user}'`);
    return new Promise((resolve) => {
      fetch.then((result) => {
        if (result[0].password && bcrypt.compareSync(password, result[0].password)) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  }
}
