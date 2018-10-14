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


  getJson(){
    return this.httpClient.get(BACKEND_URL)
      .pipe(
        map((response: any) => {
          return response;
        })
      )

    //return {json: 'from angular service'}
  }
}
