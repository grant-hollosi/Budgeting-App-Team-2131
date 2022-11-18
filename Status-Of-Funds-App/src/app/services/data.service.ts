import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { triggerAsyncId } from 'async_hooks';
import { Storage } from '@ionic/storage';
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
  url: string;
  constructor(private http: HttpClient, private storage: Storage) { 
    this.results = new Array();
    this.storage.get('server-url').then((url) => {
      if (url) {
        this.url = url;
        console.log(url)
      } else {
        throw Error("Server URL undefined");
      }
      })
  }

  wipe() {
    this.results = new Array();
  }

  populate(query: string) {
    console.log(query);
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
    let url = this.url + "v1/populate/?query=" + query;
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

  existingPassword(user: string, password: string) {
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
