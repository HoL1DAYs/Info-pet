import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrls: ['./animal-page.component.css']
})
export class AnimalPageComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute) { }

  number: number

  ngOnInit(): void {
  }

  onSelectFilter($event: any){
    console.log($event)
  }

  onClick(number: number){
    this.router.navigate(['/animal-page', this.route.url['_value'][1].path, +number])
    console.log(this.route.url['_value'][2].path)
    this.number = number
    const paginationItemList = document.querySelectorAll('.pagination__item')
    // refactor in the future
    for (let k = 0; k < 6; k++) {
      paginationItemList[(k)].classList.remove('item-active')
    }
    paginationItemList[(+number-1)].classList.add('item-active')
  }

  onForward(){
    this.number = +this.number + 1;
    this.router.navigate(['/animal-page', this.route.url['_value'][1].path, +this.number])
    const paginationItemList = document.querySelectorAll('.pagination__item')
    // refactor in the future
    for (let k = 0; k < 6; k++) {
      paginationItemList[(k)].classList.remove('item-active')
    }
    paginationItemList[(+this.number-1)].classList.add('item-active')
  }

  onBackward(){
    this.number = +this.number - 1;
    if (this.number < 1){
      this.number = 1
    }
    this.router.navigate(['/animal-page', this.route.url['_value'][1].path, +this.number])
    const paginationItemList = document.querySelectorAll('.pagination__item')
    // refactor in the future
    for (let k = 0; k < 6; k++) {
      paginationItemList[(k)].classList.remove('item-active')
    }
    paginationItemList[(+this.number-1)].classList.add('item-active')
  }

  onMain(){
    this.router.navigate(['main-page'])
  }

}
