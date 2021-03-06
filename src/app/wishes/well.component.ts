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
import { AppService } from '../app.service';
import { environment } from "../../environments/environment";

@Component({
  selector: 'well',
  templateUrl: './well.component.html',
  styleUrls: ['./well.component.css']
})



export class WellComponent implements AfterViewInit, OnDestroy {
  response_json = {json: 'from angular'};
  wish_maker_name = '';
  wish_amount = 50;
  wish_text = "I wish the developer of this website could have 50¢"
  wish_is_public = false;
  success_card = false;
  error_card = false;
  thinking = false;



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
    console.log("take payment form away")
    this.thinking = true;
    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
      this.appService.postWish({token: token, wish: { name: this.wish_maker_name, content: this.wish_text, amount: this.wish_amount, public: this.wish_is_public }})
      .subscribe(response => {
        console.log("response:")
        console.log(response)
        try{
            if(response.outcome.seller_message == "Payment complete.") {
              this.success_card = true;
            }
            else {
              this.error_card = true;
            }
          } catch (error) {
            this.error_card = true;
          }

        console.log("put payment form back")
        this.thinking = false;
      },
      error => {
        console.error(error)
        this.thinking = false;
        this.error_card = true;
      }
     );
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

  updatePublic(form){
    this.wish_is_public = !this.wish_is_public
    console.log("public updated")
    console.log(this.wish_is_public)
  }

  dropCard(){
    this.success_card = false;
    this.error_card = false;
  }
}
