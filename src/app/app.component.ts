import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  response_json = {json: 'from angular'};
  name = '';

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

  onSubmit(form: NgForm){
    console.log("submit")
    const name = form.value.name;
    this.appService.postJson(name)
    .subscribe(response => {
      this.response_json = response
    });
  }

}
