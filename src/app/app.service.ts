import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Observable, of, Subject } from 'rxjs';
import { map } from "rxjs/operators";

import { environment } from "../environments/environment";

const BACKEND_URL = environment.apiUrl + "/";

@Injectable({
  providedIn: 'root'
})

export class AppService{

  constructor(
    private http: Http,
    private httpClient: HttpClient) {}

  httpOptions() {
    return {
      'Content-Type': 'application/json'
    }
  }

  getJson(){
    return this.httpClient.get(BACKEND_URL)
    .pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  postJson(content){
    const body = JSON.stringify(content);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.httpClient.post(BACKEND_URL + 'wish', body, {headers: this.httpOptions()})
    .pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  postWish(wishInfo){
    const body = JSON.stringify(wishInfo);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.httpClient.post(BACKEND_URL + 'wish/pay', body, {headers: this.httpOptions()})
    .pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  getWishes(){
    return this.httpClient.get(BACKEND_URL + 'wishes')
    .pipe(
      map((response: any) => {
        return response;
      })
    )
  }

}
