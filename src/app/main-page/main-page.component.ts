import { Component, OnInit } from '@angular/core';
import {RequestService} from "../request.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private reqService: RequestService, private titleService: Title) { }

  ngOnInit(): void {
    this.setTitle()

  }
  setTitle(){
    this.titleService.setTitle('Главная страница')
  }

}
