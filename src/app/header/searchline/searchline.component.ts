import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {RequestService} from "../../request.service";
import {BreedCard} from "../../animal-page/breedCard.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-searchline',
  templateUrl: './searchline.component.html',
  styleUrls: ['./searchline.component.css'],

})
export class SearchlineComponent {
  data: string;
  breedCards: BreedCard[] = []
  toggleDropdown: boolean;
  @Input() navBlack: boolean


  @ViewChild('inputField', {static: false}) inputField: ElementRef
  constructor(private reqService: RequestService, private router: Router, private route: ActivatedRoute) {
  }


  enableDropdown(){
    this.toggleDropdown = true;
  }


  disableDropdown($event){
    setTimeout(()=>{
      this.toggleDropdown = false;
      console.log($event.target.text = '')
    }, 220)
  }


  onSearch(data){
    setTimeout(() => {
      this.reqService.getByQuery(data).subscribe(responseData => {
        this.breedCards = responseData
        this.breedCards = this.breedCards.slice(0,10)
      })
    }, 500)
  }
  ngDoCheck(){
    this.isBlack()
  }

  isBlack(){
    this.navBlack = this.route.snapshot['_routerState'].url !== '/main-page';
  }

}
