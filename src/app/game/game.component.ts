import { Component, OnInit,ElementRef } from '@angular/core';

import * as trending from '../../assets/trendingItems.json';
import { Observable, interval, map, startWith } from 'rxjs';
import { GoogleSearchService } from '../services/google-search.service';
import VanillaTilt from "vanilla-tilt";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  trendingItem: any;
  item1:any;
  item2:any;
  item1Url:any;
  item2Url:any;
  random1: number = 0;
  random2: number = 0;
  link: any;
  
  finalLinks = ""
  //link[0]="https://youtu.be/UdCkfcYcLUM?si=8vJlUVQRGn3a92jJ";

  constructor(private searchService: GoogleSearchService, private e : ElementRef) {
    this.trendingItem = trending;
  }
  ngOnInit(): void {
   
    this.generateData();
    // console.log(this.trendingItem[ranodm1],this.trendingItem[ranodm2]);

    VanillaTilt.init(
    this.e.nativeElement.querySelectorAll(".cards"),{ max: 1, speed: 300, scale: 1.05 });
      
  }

  

  generateData(){
    do {
      this.random1 = Math.floor(Math.random() * this.trendingItem.length);
      this.random2 = Math.floor(Math.random() * this.trendingItem.length);
    }while (this.random1 != this.random2) {
      this.random1 = Math.floor(Math.random() * this.trendingItem.length);
      this.random2 = Math.floor(Math.random() * this.trendingItem.length);
    }

    this.item1 = this.getInputData(this.random1)
    this.item2 = this.getInputData(this.random2)
  
  //  this.getInputImage(this.item1["name"],"Item1")
   // this.getInputImage(this.item2["name"],"Item2")
    //this.item1Url)
   //console.log(this.trendingItem[this.random2]['url'])
  }

  getInputImage(keyword: string,item:string) {
    
     this.searchService.getImageBySearch(keyword).subscribe({
      next: (result) =>{
       var respon = result["items"][0];
       console.log(respon);
       this.setInputImage(respon,item);
      
     },
     error:(error) =>{
       console.log(error);

     }
   })
  
   

}

setInputImage(respon:any,item:string){

  var Url
  if(respon["link"].includes("youtube")){
    Url ="http://img.youtube.com/vi/"+respon.link.split('=')[1]+"/0.jpg"
   }else {
    Url = respon.pagemap.metatags[0]["og:image"]
   }
  console.log(Url)
   if(item =="Item1" ){
     this.item1Url = Url
   }else{
    this.item2Url = Url
   }
}

  getInputData(item:number){
    console.log("fetching input data for"+item);
    var trendItem = this.trendingItem[item];
    console.log(trendItem);
    return trendItem;
  }


}
