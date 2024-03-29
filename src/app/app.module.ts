import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BreedPageComponent } from './breed-page/breed-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AnimalPageComponent } from './animal-page/animal-page.component';
import { HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import {SearchlineComponent} from "./header/searchline/searchline.component";
import { FilterPipe } from './animal-page/filter.pipe';
import { PaginationComponent } from './animal-page/pagination/pagination.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
    declarations: [
        AppComponent,
        BreedPageComponent,
        MainPageComponent,
        AnimalPageComponent,
        HeaderComponent,
        SearchlineComponent,
        FilterPipe,
        PaginationComponent,
        ErrorPageComponent,
        FooterComponent,

    ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
