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
    this.initiateURL();
  }

  initiateURL() {
    return new Promise((resolve, reject) => {
      this.storage.get('server-url').then((url) => {
        if (url) {
          this.url = url;
          if (this.url.slice(-1) != '/') {
            this.url = this.url.concat('/');
          }
          resolve(this.url);
        } else {
          reject("Server URL undefined");
        }
      })
    });
  }

  wipe() {
    this.results = new Array();
  }

  populate(query: string) {
    console.log(query);
    if (this.previousQuery && query == this.previousQuery) {
      return new Promise((resolve) => {
        this.storage.set('filtered_results', this.results).then((done) => {
          resolve(this.results);
        })
      });
    } else {
      this.wipe();
      let data = this.getQuery(query);
      return new Promise((resolve) => {
        data.then((result) => {
          if (Array.isArray(result)) {
            this.results = result;
            this.previousQuery = query;
            this.storage.set('filtered_results', result).then((done) => {
              resolve(this.results);
            })
          }
        });
      });
    }
  }

  async getQuery(query) {
    if (!this.url) {
      await this.initiateURL();
    }
    let url = this.url + "v1/populate/?query=" + query;
    let req = this.http.get(url);
    let results = new Promise((resolve) => {
      req.subscribe((data) => {
        resolve(JSON.parse(data.toString()));
      })
    });
    return results;
  }

  async upload(file) {
    if (!this.url) {
      await this.initiateURL();
    }
    let url = `${this.url}v1/upload/`;
    // console.log(url);
    // const formData: FormData = new FormData();
    // formData.append('file', file, file.name);
    let req = this.http.post(url, file);
    let results = new Promise((resolve) => {
      req.subscribe((data) => {
        resolve(JSON.parse(data.toString()));
      })
    })
    return results;
  }

  getResults() {
    return this.results;
  }

  getItem(id: number) {
    return this.getQuery(`SELECT * FROM dataTable WHERE id = ${id}`);
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
