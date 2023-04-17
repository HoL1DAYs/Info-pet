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
  @Input() navBlack: boolean;
  @ViewChild('inputField', {static: false}) inputField: ElementRef;



  constructor(private reqService: RequestService, private router: Router, private route: ActivatedRoute) {
  }


  enableDropdown(){
    this.toggleDropdown = true;
  }
  clearInput(){
    setTimeout(()=>{
      this.inputField.nativeElement.value = '';
    }, 130)
  }

  disableDropdown(){
    setTimeout(()=>{
      this.toggleDropdown = false;
      this.inputField.nativeElement.value = '';
    }, 130)
  }


  onSearch(data){
    this.toggleDropdown = true;
    setTimeout(() => {
      this.reqService.getByQuery(data).subscribe(responseData => {
        this.breedCards = responseData
        this.breedCards = this.breedCards.slice(0,10)
      })
    }, 150)
  }
  ngDoCheck(){
    this.isBlack()
  }

  isBlack(){
    this.navBlack = this.route.snapshot['_routerState'].url !== '/main-page';
  }

}
