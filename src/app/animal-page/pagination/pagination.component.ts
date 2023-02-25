import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "../../request.service";
import {BreedCard} from "../breedCard.model";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
    number: number;
    @Output() breedCards = new EventEmitter
    @ViewChild('paginationItems', {static: false}) paginationItem: ElementRef

    constructor(private router: Router, private route: ActivatedRoute, private reqService: RequestService) {
    }

    ngAfterViewChecked() {
        this.number = this.route.snapshot.queryParams['p']
        const paginationItemList = this.paginationItem.nativeElement.childNodes
        for (let k = 0; k < 8; k++) {
            paginationItemList[(k)].firstChild.classList.remove('item-active')
        }
        paginationItemList[(+this.number)].firstChild.classList.add('item-active')
    }


    onClick(number: number) {
        this.router.navigate(['/animal-page', this.route.snapshot.params['animal']], {queryParams: {p: number}})
        this.number = number
        this.reqService.fetchData(this.number - 1).subscribe(responseData => {
            this.breedCards.emit(responseData.content)
        })
        const paginationItemList = this.paginationItem.nativeElement.childNodes
        for (let k = 0; k < 8; k++) {
            paginationItemList[(k)].firstChild.classList.remove('item-active')
        }
        paginationItemList[(+number)].firstChild.classList.add('item-active')
    }


    onForward() {
        this.number = +this.number + 1;
        this.router.navigate(['/animal-page', this.route.snapshot.params['animal']], {queryParams: {p: this.number}})
        this.reqService.fetchData(this.number - 1).subscribe(responseData => {
            this.breedCards.emit(responseData.content)
        })
        const paginationItemList = this.paginationItem.nativeElement.childNodes
        for (let k = 0; k < 6; k++) {
            paginationItemList[(k)].firstChild.classList.remove('item-active')
        }
        paginationItemList[(+this.number)].firstChild.classList.add('item-active')
    }

    onBackward() {
        this.number = +this.number - 1;
        if (this.number < 1) {
            this.number = 1
        }
        this.router.navigate(['/animal-page', this.route.snapshot.params['animal']], {queryParams: {p: this.number}})
        this.reqService.fetchData(this.number - 1).subscribe(responseData => {
            this.breedCards.emit(responseData.content)
        })
        const paginationItemList = this.paginationItem.nativeElement.childNodes
        // refactor in the future
        for (let k = 0; k < 6; k++) {
            paginationItemList[(k)].firstChild.classList.remove('item-active')
        }
        paginationItemList[(+this.number)].firstChild.classList.add('item-active')
    }

}
