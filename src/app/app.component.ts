declare var stripe: any;
declare var elements: any;

import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AppService } from './app.service';
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements AfterViewInit, OnDestroy {
  response_json = {json: 'from angular'};
  wish_maker_name = '';
  wish_amount = .5;
  wish_text = "I wish the developer of this website could have 50¢"


  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(private cd: ChangeDetectorRef, private appService: AppService) {}

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
      this.appService.postWish({token: token, name: this.wish_maker_name, wish: this.wish_text, wish_amount: this.wish_amount})
      .subscribe(response => {
        console.log("response:")
        console.log(response)
        // this.response_json = response
      });
    }
  }


  updateWishAmount(form){
    this.wish_amount = form.value.wish_amount
  }

  updateWishMaker(form){
    this.wish_maker_name = form.value.wish_maker_name
  }

  updateWishText(form){
    this.wish_text = form.value.wish_text
  }
}
