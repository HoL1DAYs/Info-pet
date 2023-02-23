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

  number: number;
  breedCards: BreedCard[] = [];
  filterActive: boolean = false;
  filters: number[] = []


  toggleFilters: boolean = false;
  filtersList: string[] = ['Все породы',
    'Большие',
    'Маленькие',
    'Ретривер',
    'спаниели',
    'Средние',
    'Сторожевые',
    'Охотничьи',
    'Примитивные',
    'Водяные',
    'Бойцовские',
    'Гончие',
    'Служебные',
    'Шпицы',
    'Овчарки',
    'Борзые',
    'Пушистые',
    'Лысые',
    'Злые',
    'Японские',
    'Русские',
    'Пастушьи',
    'Гладкошорстные',
    'Умные',
    'Спокойные',
    'Немецкие',
    'Американские',
    'Комнотно-декоротивны',
    'Кудрявые',
    'Добрые',
    'Опасные',
    'Английские',
    'Французкие',
    'Терьеры',
    'Легавые',
    'Неохотничьи',
    'Недорогие',
    'Дорогие',
    'Новые']


  visibleFilters: string[];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
          this.number = params['p']
    }
    )
    this.reqService.fetchData(0).subscribe(responseData => {
          this.breedCards = responseData.content
          console.log(responseData)
          console.log(this.route.snapshot.queryParams.filters)
        }
    )


    if (this.route.snapshot.queryParams.filters){
      this.reqService.fetchData(0, this.route.snapshot.queryParams.filters).subscribe(res => this.breedCards = res.content)
    }

    this.visibleFilters = this.filtersList.slice(0,8)
  }


  ngAfterViewChecked(){
    this.number = this.route.snapshot.queryParams['p']
    const paginationItemList = this.paginationItem.nativeElement.childNodes
    for (let k = 0; k < 8; k++) {
      paginationItemList[(k)].firstChild.classList.remove('item-active')
    }
    paginationItemList[(+this.number)].firstChild.classList.add('item-active')


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

  appendToFilters(i){
    if (this.filters.includes(i)){
      delete this.filters[this.filters.indexOf(i)]
      this.filters = this.filters.filter(Number)
      console.log(this.filters)
      let filterString = this.filters.toString()
      if (filterString.length < 1){
        filterString = null
        this.reqService.fetchData(this.number).subscribe(response => this.breedCards = response.content)
      }
      this.router.navigate(['./'],{relativeTo: this.route, queryParams: {p: this.number, filters: filterString}})
      this.reqService.fetchData(this.number, filterString).subscribe(response => this.breedCards = response.content)
    } else{
      this.filters.push(i)
      console.log(this.filters)
      this.filters = this.filters.filter(Number)
      let filtersString = this.filters.toString()
      console.log(filtersString)
      this.router.navigate(['./'],{relativeTo: this.route, queryParams: {p: this.number, filters: filtersString}})
      this.reqService.fetchData(this.number, filtersString).subscribe(response => this.breedCards = response.content)
    }
  }

  emptyFilters(){
    this.filters = []
    this.router.navigate(['./'],{relativeTo: this.route, queryParams: {p: this.number, filters: this.filters}})
    this.reqService.fetchData(this.number).subscribe(response => this.breedCards = response.content)
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


  allFilters(){
    this.toggleFilters = !this.toggleFilters
    if (this.toggleFilters === false) {
      this.visibleFilters = this.filtersList.slice(0, 8)
    } else{
      this.visibleFilters = this.filtersList
    }
  }

  toggleFilterActive(){
    this.filterActive = !this.filterActive
  }
}
