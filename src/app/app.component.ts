import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  response_json = {json: 'from angular'};
  title = 'wishing-well-frontend';

  constructor( private appService: AppService) {}

  ngOnInit(){
    this.setJson();
  }

  setJson(){
    //this.response_json = this.appService.getJson()
    this.appService.getJson()
    .subscribe(response => {
      this.response_json = response
    });

  }

}
