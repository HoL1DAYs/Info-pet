import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RequestService} from "../request.service";
import {BreedCard} from "./breedCard.model";
import {map} from "rxjs/operators";
import {Title} from "@angular/platform-browser";



@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrls: ['./animal-page.component.css']
})
export class AnimalPageComponent implements OnInit, OnChanges {

  @ViewChild('filtersArray', {static: false}) filtersArray: ElementRef
  @ViewChild('breeds', {static: false}) breeds: ElementRef
  countMoreBreeds: number = 1;

  pageNumber: number;
  breedCards: BreedCard[] = [];
  filterActive: boolean = false;
  filters: string[] = [];
  filtersPage: string[];
  toggleFilters: boolean = false;
  filtersList: string[]
  visibleFilters: string[] = []
  totalPages: number;
  loaded: boolean = false;
  allShowed: boolean
  animal_id: number
  animal: string


  constructor(private router: Router, private route: ActivatedRoute, private reqService: RequestService, private titleService: Title) { }



  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
          this.pageNumber = params['p']
          this.animal_id = params['animal_id']
          this.animal = this.animal_id == 1? 'Собаки' : 'Кошки';
          this.visibleFilters = this.animal_id == 2? [] : [];
          this.setTitle()
          this.reqService.getAnimalsById(this.animal_id).pipe(map(res => {
            const filterArray = []
            for (let filter of res.filters){
              filterArray.push(filter.filter)
            }
            if(filterArray.length ==0){
              return null
            }
            return filterArray
          })).subscribe(res => {
            if (res == null){
              return
            }
            this.filtersList = res
            this.visibleFilters = this.filtersList.slice(0,11)

            const pageWidth = document.documentElement.scrollWidth
            console.log(pageWidth)
            if (pageWidth < 700){
              this.visibleFilters = this.filtersList.slice(0,6)
            }
          })


          this.reqService.fetchData(this.pageNumber-1, this.animal_id).subscribe(responseData => {
                this.breedCards = responseData.content
                this.totalPages = +responseData.totalElements / 12

                this.loaded = true
                console.log(responseData)
              }, error => {
            this.router.navigate(['/error-page'])
            console.log(error)
              }
          )
    }
    )





    if (this.route.snapshot.queryParams.filters){
      this.reqService.fetchData(this.pageNumber-1, this.animal_id).subscribe(res => {
        this.breedCards = res.content;
        this.totalPages = +res.totalPages / 12
        console.log(this.totalPages)
        this.loaded = true
      })
    }



  }
  ngOnChanges() {
    if (this.animal_id == 2){
      this.visibleFilters = []
    }
  }

  setTitle(){
    this.titleService.setTitle(this.animal)
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
      this.reqService.fetchData(this.pageNumber-1, 1).subscribe(responseData => {
        this.breedCards = responseData.content
        this.totalPages = +responseData.totalPages / 12
        this.loaded = true
        console.log(responseData)
      })
    } else{
      // enabling filter
      this.filters.push(filtersFromIter)
      this.reqService.fetchData(this.pageNumber-1, 1).subscribe(responseData => {
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
    this.router.navigate(['./'],{relativeTo: this.route, queryParams: {p: this.pageNumber, animal_id: this.animal_id}})
    const filtersArray = this.filtersArray.nativeElement.childNodes
    for (let k = 0; k < this.visibleFilters.length; k++) {
      filtersArray[(k)].classList.remove('btn_active')
    }
    this.reqService.fetchData(this.pageNumber-1, this.animal_id).subscribe(response => this.breedCards = response.content)
  }



  allFilters(){
    const pageWidth = document.documentElement.scrollWidth


    this.toggleFilters = !this.toggleFilters
    if (this.toggleFilters === false) {
      this.visibleFilters = this.filtersList.slice(0, 11)
      if (pageWidth < 700){
        this.visibleFilters = this.filtersList.slice(0,6)
      }
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
    this.reqService.fetchData(this.pageNumber - 2 + this.countMoreBreeds, this.animal_id).subscribe((res) => {
      for (let i=0; i<=res.content.length; i++){
        this.breedCards.push(res.content[i])
      }
    })

  }



}
