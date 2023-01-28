import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  data: string;

  constructor() { }

  ngOnInit(): void {

  }

  onScroll(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getJSON(url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
      return response.json();
    });
  };




}
