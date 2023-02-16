import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RequestService} from "../request.service";
import {BreedCard} from "./breedCard.model";


@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrls: ['./animal-page.component.css']
})
export class AnimalPageComponent implements OnInit {

  @ViewChild('paginationItems', {static: false}) paginationItem: ElementRef

  constructor(private router: Router, private route: ActivatedRoute, private reqService: RequestService) { }

  number: number


  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
          this.number = params['p']
    }
    )
    this.reqService.fetchData(0).subscribe(responseData => {
          console.log(responseData)
          this.breedCards = responseData.content
        }
    )

  }

  ngAfterViewChecked(){
    this.number = this.route.snapshot.queryParams['p']
    const paginationItemList = this.paginationItem.nativeElement.childNodes
    for (let k = 0; k < 8; k++) {
      paginationItemList[(k)].firstChild.classList.remove('item-active')
    }
    paginationItemList[(+this.number)].firstChild.classList.add('item-active')
  }


  breedCards: BreedCard[] = []

  onSelectFilter($event: any){
    console.log($event)
  }

  onClick(number: number){
    this.router.navigate(['/animal-page', this.route.snapshot.params['animal']], {queryParams: {p: number}})
    this.number = number
    this.reqService.fetchData(this.number - 1).subscribe(responseData=> {
      this.breedCards = responseData.content
    })
    const paginationItemList = this.paginationItem.nativeElement.childNodes
    for (let k = 0; k < 8; k++) {
      paginationItemList[(k)].firstChild.classList.remove('item-active')
    }
    paginationItemList[(+number)].firstChild.classList.add('item-active')
  }

  onForward(){
    this.number = +this.number + 1;
    this.router.navigate(['/animal-page', this.route.snapshot.params['animal']], {queryParams: {p: this.number}})
    this.reqService.fetchData(this.number - 1).subscribe(responseData => {
      this.breedCards = responseData.content
    })
    const paginationItemList = this.paginationItem.nativeElement.childNodes
    for (let k = 0; k < 6; k++) {
      paginationItemList[(k)].firstChild.classList.remove('item-active')
    }
    paginationItemList[(+this.number)].firstChild.classList.add('item-active')
  }

  onBackward(){
    this.number = +this.number - 1;
    if (this.number < 1){
      this.number = 1
    }
    this.router.navigate(['/animal-page', this.route.snapshot.params['animal']], {queryParams: {p: this.number}})
    this.reqService.fetchData(this.number - 1).subscribe(responseData => {
      this.breedCards = responseData.content
    })
    const paginationItemList = this.paginationItem.nativeElement.childNodes
    // refactor in the future
    for (let k = 0; k < 6; k++) {
      paginationItemList[(k)].firstChild.classList.remove('item-active')
    }
    paginationItemList[(+this.number)].firstChild.classList.add('item-active')
  }

  onMain(){
    this.router.navigate(['main-page'])
  }

}
