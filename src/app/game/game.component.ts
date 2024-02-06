import { Component, OnInit } from '@angular/core';

import * as trending from '../../assets/trendingItems.json';
import { interval, map, startWith } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

 trendingItem :any ;
 random1:number=0;
 random2:number=0;
link:any;
 finalLinks = ""
//link[0]="https://youtu.be/UdCkfcYcLUM?si=8vJlUVQRGn3a92jJ";

  convertLinks = (url:string) => {
  
  var thumbFormat = "https://www.youtube.com/watch?app=desktop&v="
   
      var hash = url.split(/v\=/)[1]  
      this.finalLinks += thumbFormat + hash + "\n"   
      console.log(this.finalLinks);
    }
    


 imageUrl$ = interval(5000).pipe(map(i => {
  if (i % 2 === 0) {
    return 'https://lorempixel.com/800/600/nature/';
  } 
  return 'https://lorempixel.com/800/600/animals/'
}), 
startWith('https://media.makeameme.org/created/wait-for-it-593ff4.jpg'));
constructor() {
  this.trendingItem = trending ;
}
  ngOnInit(): void {
     this.random1 = Math.floor(Math.random()*this.trendingItem.length);
     this.random2 = Math.floor(Math.random()*this.trendingItem.length);
    console.log(this.random1, this.random2);
    for (let index = 0; index < this.trendingItem.length; index++) {

      //console.log(this.trendingItem[index]);
      
    }
    console.log(this.trendingItem[this.random2]['url'])
 // console.log(this.trendingItem[ranodm1],this.trendingItem[ranodm2]);
}
 
 
}
