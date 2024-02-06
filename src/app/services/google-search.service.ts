import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GoogleSearchService {

   searchUrl:string = "https://www.googleapis.com/customsearch/v1?num=1&key=AIzaSyAH8jidz-pVSlttdlaNQ7bNcJJ54S78DJI&rsz=1&num=1&hl=en&source=gcsc&gss=.com&cselibv=8435450f13508ca1&searchtype=image&cx=12fd33596366c4787&q=";

  constructor(private http:HttpClient) { 

  }

  getImageBySearch(keyword:string){
     return this.http.get<any>(this.searchUrl+keyword)
  }
}
