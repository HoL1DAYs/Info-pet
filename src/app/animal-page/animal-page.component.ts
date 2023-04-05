import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RequestService} from "../request.service";
import {BreedCard} from "./breedCard.model";
import {map} from "rxjs/operators";



@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrls: ['./animal-page.component.css']
})
export class AnimalPageComponent implements OnInit {

  @ViewChild('filtersArray', {static: false}) filtersArray: ElementRef
  @ViewChild('breeds', {static: false}) breeds: ElementRef
  countMoreBreeds: number = 1;

  constructor(private router: Router, private route: ActivatedRoute, private reqService: RequestService) { }


  number: number;
  breedCards: BreedCard[] = [];
  filterActive: boolean = false;
  filters: string[] = [];
  filtersPage: string[];
  toggleFilters: boolean = false;
  filtersList: string[]
  visibleFilters: string[];
  totalPages: number;
  loaded: boolean = false;
  allShowed: boolean

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
          this.number = params['p']
    }
    )
    this.reqService.fetchData(this.number-1).subscribe(responseData => {
          this.breedCards = responseData.content
          console.log(responseData.totalPages)
          this.totalPages = +responseData.totalElements / 12

          this.loaded = true
          console.log(responseData)
        }
    )

    this.reqService.getAnimalsById(1).pipe(map(res => {
      const filterArray = []
      for (let filter of res.filters){
        filterArray.push(filter.filter)
      }
      return filterArray
    })).subscribe(res => {
      this.filtersList = res
      this.visibleFilters = this.filtersList.slice(0,11)
      console.log(res)
    })


    if (this.route.snapshot.queryParams.filters){
      this.reqService.fetchData(this.number-1).subscribe(res => {
        this.breedCards = res.content;
        this.totalPages = +res.totalPages / 12
        console.log(this.totalPages)
        this.loaded = true
      })
    }


  }



  appendToFilters(i, filtersFromIter){
    if (this.filters.includes(filtersFromIter)){


      const filtersArray = this.filtersArray.nativeElement.childNodes
      filtersArray[(i)].classList.remove('btn_active')

      // disabling filter
      console.log(this.filters.indexOf(filtersFromIter))
      console.log(filtersFromIter)
      delete this.filters[this.filters.indexOf(filtersFromIter)]

      this.filters = this.filters.filter(String)

      console.log(this.filters)
      this.reqService.fetchData(this.number-1, 2).subscribe(responseData => {
        this.breedCards = responseData.content
        this.totalPages = +responseData.totalPages / 12
        this.loaded = true
        console.log(responseData)
      })
    } else{
      // enabling filter
      this.filters.push(filtersFromIter)
      console.log(this.filters)
      this.reqService.fetchData(this.number-1, 2).subscribe(responseData => {
        this.breedCards = responseData.content
        this.totalPages = +responseData.totalElements / 12
        this.loaded = true
        console.log(responseData)
      })
      // adding css class on filterButtons
      const filtersArray = this.filtersArray.nativeElement.childNodes
      this.visibleFilters.unshift(this.filters[this.filters.indexOf(filtersFromIter)])
      this.visibleFilters.splice(i + 1, 1)
      filtersArray[(i)].classList.add('btn_active')
    }
  }

  emptyFilters(){
    this.filters = []
    this.router.navigate(['./'],{relativeTo: this.route, queryParams: {p: this.number, filters: this.filters}})
    const filtersArray = this.filtersArray.nativeElement.childNodes
    for (let k = 0; k < this.visibleFilters.length; k++) {
      filtersArray[(k)].classList.remove('btn_active')
    }
    this.reqService.fetchData(this.number-1).subscribe(response => this.breedCards = response.content)
  }



  allFilters(){
    this.toggleFilters = !this.toggleFilters
    if (this.toggleFilters === false) {
      this.visibleFilters = this.filtersList.slice(0, 11)
    } else{
      this.visibleFilters = this.filtersList
    }
  }
  
  showMoreBreeds(){
    if (this.countMoreBreeds >= Math.floor(this.totalPages)){
      this.allShowed = true;
      return
    }

    this.countMoreBreeds += 1

  }



}
