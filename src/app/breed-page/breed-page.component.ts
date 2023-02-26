import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "../request.service";


@Component({
  selector: 'app-breed-page',
  templateUrl: './breed-page.component.html',
  styleUrls: ['./breed-page.component.css']
})
export class BreedPageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private reqService: RequestService) { }
  breedInfo: any = {}

  @ViewChild('FABbutton', {static: false}) fabButton: ElementRef

  ngOnInit(): void {
    this.reqService.getBreedById(this.route.snapshot.params['id']).subscribe(responseData => {
      this.breedInfo = responseData
      console.log(responseData)
    })
    if (window.screenTop > 0){
      this.fabButton.nativeElement.classList.add('fab_button_visible')
      console.log(this.fabButton)
    }
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
