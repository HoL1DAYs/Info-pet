import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {
  constructor(private titleService: Title, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(){
    this.titleService.setTitle('Ошибка!')
  }
  onMain() {
    this.router.navigate(['/main-page'])
  }
}
