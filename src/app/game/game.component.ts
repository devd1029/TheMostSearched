import { Component, OnInit, ElementRef } from '@angular/core';

import * as trending from '../../assets/trendingItems.json';
import { Observable, interval, map, startWith } from 'rxjs';
import { GoogleSearchService } from '../services/google-search.service';
import VanillaTilt from "vanilla-tilt";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  trendingItem: any;
  item1: any;
  item2: any;
  item1Url: any;
  item2Url: any;
  random1: number = 0;
  random2: number = 0;
  link: any;
  item1Counter: any;
  item2Counter: any;
  enableCounter: any
  score: number = 0;
  onFalse1:boolean=false;
  onFalse2:boolean=false;
  onCorrect:boolean=false;

  finalLinks = ""
  //link[0]="https://youtu.be/UdCkfcYcLUM?si=8vJlUVQRGn3a92jJ";

  constructor(private searchService: GoogleSearchService, private e: ElementRef,private router:Router) {
    this.trendingItem = trending;
  }
  ngOnInit(): void {

    this.generateData();
    // console.log(this.trendingItem[ranodm1],this.trendingItem[ranodm2]);

    VanillaTilt.init(this.e.nativeElement.querySelectorAll(".cards"), { max: 3, speed: 3, scale: 1.05 });

  }


  getResult(item1: any, item2: any,tile:any) {

    this.enableCounter = true;

    console.log(Number(item1["percentage"]) + " " + Number(item2["percentage"]))
    if (Number(item1["percentage"]) >= Number(item2["percentage"])) {
      this.score++;
      this.onCorrect = true;
    } else {
      if(tile=="item1"){ 
        this.onFalse1 = true;
      }else{ 
        this.onFalse2 = true;
      }
      this.score = 0;
      console.log("Incorrect ans")
    }
    setTimeout(() => {
      console.log("this is the first message");
      this.enableCounter = false;
      this.onFalse1= false;
      this.onFalse2= false;
      if( this.onFalse1|| this.onFalse2){
        this.router.navigate(['/']);
      }
      this.onCorrect = false;
       this.generateData()
    }, 3000);
    console.log("Score is " + this.score);
    
  }

  generateData() {
    do {
      this.random1 = Math.floor(Math.random() * this.trendingItem.length);
      this.random2 = Math.floor(Math.random() * this.trendingItem.length);
    } while (this.random1 != this.random2) {
      this.random1 = Math.floor(Math.random() * this.trendingItem.length);
      this.random2 = Math.floor(Math.random() * this.trendingItem.length);
    }

    this.item1 = this.getInputData(this.random1)
    this.item2 = this.getInputData(this.random2)

    //  this.getInputImage(this.item1["name"],"Item1")
    //  this.getInputImage(this.item2["name"],"Item2")
    //this.item1Url)
    //console.log(this.trendingItem[this.random2]['url'])
  }

  getInputImage(keyword: string, item: string) {

    this.searchService.getImageBySearch(keyword).subscribe({
      next: (result) => {
        var respon = result["items"][0];
        console.log(respon);
        this.setInputImage(respon, item);

      },
      error: (error) => {
        console.log(error);

      }
    })



  }

  setInputImage(respon: any, item: string) {

    var Url
    if (respon["link"].includes("youtube")) {
      Url = "http://img.youtube.com/vi/" + respon.link.split('=')[1] + "/0.jpg"
    } else {
      Url = respon.pagemap.metatags[0]["og:image"]
    }
    console.log(Url)
    if (item == "Item1") {
      this.item1Url = Url
    } else {
      this.item2Url = Url
    }
  }

  getInputData(item: number) {
    console.log("fetching input data for" + item);
    var trendItem = this.trendingItem[item];
    console.log(trendItem);
    return trendItem;
  }


}
