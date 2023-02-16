import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  data: string;

  navBlack: boolean

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(){

  }

  ngDoCheck(){
    this.isBlack()
  }

  isBlack(){
    this.navBlack = this.route.snapshot['_routerState'].url !== '/main-page';
  }

}
