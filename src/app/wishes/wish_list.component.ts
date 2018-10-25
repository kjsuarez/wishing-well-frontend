import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AppService } from '../app.service';

@Component({
  selector: 'wish-list',
  templateUrl: './wish_list.component.html',
  styleUrls: ['./wish_list.component.css']
})

export class WishListComponent implements OnInit {

  wishes = [];

  constructor( private appService: AppService) {}

  ngOnInit() {
    this.getWishes();
  }

  getWishes() {
    this.appService.getWishes()
    .subscribe(response => {
      this.wishes = response;
      console.log("wishes: ")
      console.log(this.wishes)
    })
  }

}
