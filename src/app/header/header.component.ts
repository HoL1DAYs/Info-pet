import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {


  navBlack: boolean
  isActivatedMenu: boolean = false


  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(){
    this.headerOnScroll()
    this.shadowSidebar()
  }

  headerOnScroll(){
    let lastScroll = 0;
    const defaultOffset = 0;
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar_options ul')
    const span = document.querySelector('.logo span')
    const burgerMenu = document.querySelector('.burger_menu_svg')
    const searchline = document.querySelector('input')
    this.router.events.subscribe((event)=> {
      header.classList.replace('backgroud_white', 'background_none')
      header.classList.remove('background_white')
    })

    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains('hide');

    window.addEventListener('scroll', () => {
      if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset && this.route.snapshot['_routerState'].url !== '/error-page') {
        //scroll down
        header.classList.add('hide');
      }
      else if(scrollPosition() < lastScroll && containHide() && this.route.snapshot['_routerState'].url !== '/error-page'){
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
      else if(scrollPosition()< 50 && this.route.snapshot['_routerState'].url !== '/error-page'){
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
    const body = document.querySelector('body')
    const overlay = document.querySelector('.overlay')
    this.isActivatedMenu = !this.isActivatedMenu;
    if (this.isActivatedMenu){
      overlay.classList.remove('hidden')
    }else{
      overlay.classList.add('hidden')
    }
    overlay.addEventListener('click', ()=>{
      overlay.classList.add('hidden')
    })
    if(body.classList.contains('overflow')){
      body.classList.remove('overflow')
    }
    if (this.isActivatedMenu){
      body.classList.add('overflow')
    }
  }

}
