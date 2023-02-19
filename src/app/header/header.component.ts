import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {


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
