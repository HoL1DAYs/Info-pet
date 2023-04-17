import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RequestService} from "../request.service";
import {BreedCard} from "../animal-page/breedCard.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-breed-page',
  templateUrl: './breed-page.component.html',
  styleUrls: ['./breed-page.component.css'],
})
export class BreedPageComponent implements OnInit {
  breedInfo: any = {}
  fabButtonBoolean: boolean = false;
  breedCards: BreedCard[]
  randomBreeds: BreedCard[] = []
  headerObserver: IntersectionObserver
  isActivatedMenu: boolean = false;
  product$: Observable<any>;
  animal: string;
  animal_id: number

  constructor(private router: Router, private route: ActivatedRoute, private reqService: RequestService) {
  }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] >= 153){
        this.animal = 'Кошки'
        this.animal_id = 2
      } else{
        this.animal_id = 1
        this.animal = 'Собаки'
      }
      this.reqService.getBreedById(params['id']).subscribe(res => {
        this.breedInfo = res
        console.log(res)
      })
    },
    error => {
      this.router.navigate(['/error-page'])
      console.log(error)
    })





    this.reqService.fetchData(0, 1).subscribe(res => {
      this.breedCards = res.content
      console.log(res)
      console.log(this.randomBreeds)
      this.randomBreeds.unshift(this.breedCards[Math.floor(Math.random() * this.breedCards.length)])
      this.randomBreeds.unshift(this.breedCards[Math.floor(Math.random() * this.breedCards.length)])
      this.randomBreeds.unshift(this.breedCards[Math.floor(Math.random() * this.breedCards.length)])
      this.randomBreeds.unshift(this.breedCards[Math.floor(Math.random() * this.breedCards.length)])
    })

    const htmlHeight = document.documentElement.scrollHeight + 10000
    console.log(htmlHeight)
    // @ts-ignore
    this.headerObserver = new IntersectionObserver(this.stickyFAB, {
      root: null,
      threshold: 0,
      rootMargin: `${htmlHeight}px 0px 0px 0px`,
    });

    const content = document.getElementById('content')
    this.headerObserver.observe(content);

    this.product$ = this.route.params.pipe(
        map(params => params.id),
        map(params => this.router.navigate(['animal-page', 'dogs', ]))
    );
  }


  onAnimal() {
    this.router.navigate(['..'], {relativeTo: this.route, queryParams: {p: 1, animal_id: this.animal_id}})
  }

  onMain() {
    this.router.navigate(['/main-page'])
  }


  scrollToElement($element): void {
    console.log($element);
    document.getElementById($element).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  stickyFAB(entries) {
    const [entry] = entries;
    // console.log(entry);

    const fabButton = document.getElementById('fabButton')
    if (entry.isIntersecting) fabButton.classList.add('fab_button_visible');
    else fabButton.classList.remove('fab_button_visible');
    return null
  }


}




