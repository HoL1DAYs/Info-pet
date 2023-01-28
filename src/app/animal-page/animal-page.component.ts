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
    this.number = number
    console.log(this.route)
  }

  onForward(){
    this.number = +this.number + 1;
    this.router.navigate(['/animal-page', this.route.url['_value'][1].path, +this.number])
  }

  onBackward(){
    this.number = +this.number - 1;
    if (this.number < 1){
      this.number = 1
    }
    this.router.navigate(['/animal-page', this.route.url['_value'][1].path, +this.number])
  }

}
