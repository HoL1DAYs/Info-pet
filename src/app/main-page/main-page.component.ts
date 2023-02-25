import { Component, OnInit } from '@angular/core';
import {RequestService} from "../request.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  data: string;

  constructor(private reqService: RequestService) { }

  ngOnInit(): void {

  }

  onScrollTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onSearch(){
    this.reqService.fetchData(0).subscribe(responseData=>{

    })
  }

}
