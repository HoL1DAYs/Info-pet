import { Component, OnInit } from '@angular/core';
import {RequestService} from "../request.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private reqService: RequestService) { }

  ngOnInit(): void {

  }


}
