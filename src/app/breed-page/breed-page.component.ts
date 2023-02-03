import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-breed-page',
  templateUrl: './breed-page.component.html',
  styleUrls: ['./breed-page.component.css']
})
export class BreedPageComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // document.addEventListener('DOMContentLoaded', function() {
    //   const elems = document.querySelectorAll('.fixed-action-btn');
    //   const instances = M.FloatingActionButton.init(elems, options);
    // });
  }

  onScroll($event){
    console.log($event)
    switch ($event) {
      case 'Краткая информация':
        alert( 'Маловато' );
      case 'Характер':
        alert( 'В точку!' );
      case 'Воспитание':
        alert( 'Перебор' );
      case 'Питание':
        alert( 'Перебор' );
      case 'Уход':
        alert( 'Перебор' );
      case 'Фотографии':
        alert( 'Перебор' );
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onAnimal(){
    this.router.navigate(['..'], {relativeTo: this.route})
  }

  onMain(){
    this.router.navigate(['main-page'])
  }

}
