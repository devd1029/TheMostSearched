import { Component, OnInit } from '@angular/core';

import * as trending from '../../assets/trendingItems.json';
import { interval, map, startWith } from 'rxjs';
import { GoogleSearchService } from '../services/google-search.service';

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

  constructor(private searchService: GoogleSearchService) {
    this.trendingItem = trending;
  }
  ngOnInit(): void {
   
    this.generateData();
    // console.log(this.trendingItem[ranodm1],this.trendingItem[ranodm2]);
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
       this.getInputImage(this.item1["name"],this.item1Url)
    console.log(this.item1Url)
   // console.log(this.trendingItem[this.random2]['url'])
  }

  getInputImage(keyword: string, setUrl:string) {
    
    console.log("fetching Imagedata");

    var url  = "";
    
     this.searchService.getImageBySearch(keyword).subscribe({
      next: (result) =>{
       var respon = result["items"][0];
       console.log(respon);
         if(respon["link"].includes("youtube")){
          setUrl ="http://img.youtube.com/vi/"+respon.link.split('=')[1]+"/0.jpg"
         }else {
          setUrl = respon.pagemap.metatags[0]["og:image"]
         }
         
         console.log(url)
 
     },
     error:(error) =>{
       console.log(error);
     }
   })
}

  getInputData(item:number){
    console.log("fetching input data for"+item);
    var trendItem = this.trendingItem[item];
    console.log(trendItem);
    return trendItem;
  }


}
