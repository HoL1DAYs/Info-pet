import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {


  navBlack: boolean
  isActivatedMenu: boolean = false


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.headerOnScroll()
    this.shadowSidebar()
  }

  headerOnScroll(){
    let lastScroll = 0;
    const defaultOffset = 150;
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar_options ul')
    const span = document.querySelector('.logo span')
    const burgerMenu = document.querySelector('.burger_menu_svg')
    const searchline = document.querySelector('input')



    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains('hide');

    window.addEventListener('scroll', () => {
      if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        header.classList.add('hide');


      }
      else if(scrollPosition() < lastScroll && containHide()){
        //scroll up
        header.classList.add('background_white');
        header.classList.remove('hide');
        span.classList.remove('logo__text')
        navbar.classList.remove('nav__links')
        burgerMenu.classList.remove('burger_menu')
        span.classList.add('logo__text_black')
        navbar.classList.add('nav__links__black')
        burgerMenu.classList.add('burger_menu_black')
        searchline.classList.add('search_black')
      }
      else if(scrollPosition()< 60){
        if(!this.navBlack){
          navbar.classList.remove('nav__links__black')
          burgerMenu.classList.remove('burger_menu_black')
          searchline.classList.remove('search_black')
          span.classList.remove('logo__text_black')
          span.classList.add('logo__text')
          navbar.classList.add('nav__links')
          burgerMenu.classList.add('burger_menu')
        }
        else{

          navbar.classList.add('nav__links__black')
          burgerMenu.classList.add('burger_menu_black')
          searchline.classList.add('search_black')
          span.classList.add('logo__text_black')
          span.classList.remove('logo__text')
          navbar.classList.remove('nav__links')
          burgerMenu.classList.remove('burger_menu')
        }
        header.classList.remove('background_white')

      }

      lastScroll = scrollPosition();
    })
  }


  shadowSidebar(){
    const burgerMenu = document.querySelector( '.burger_menu_div');
    const sideBar = document.querySelector('.sidebar')

    document.addEventListener( 'click', (e) => {
      const withinBoundaries = e.composedPath().includes(burgerMenu);
      const body = document.querySelector('body')

      if ( ! withinBoundaries ) {
        // @ts-ignore
        sideBar.classList.remove('sidebarNg')
        sideBar.classList.remove('shadow')
        body.classList.remove('overflow')
      }
    })
  }

  ngDoCheck(){
    this.isBlack()
  }

  isBlack(){
    this.navBlack = this.route.snapshot['_routerState'].url !== '/main-page';
  }

  toggleMenu(){
    this.isActivatedMenu = !this.isActivatedMenu;
    const body = document.querySelector('body')
    if(body.classList.contains('overflow')){
      body.classList.remove('overflow')
    }
    if (this.isActivatedMenu){
      body.classList.add('overflow')
    }
  }

}
