import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {BreedPageComponent} from "./breed-page/breed-page.component";
import {AnimalPageComponent} from "./animal-page/animal-page.component";
import {ErrorPageComponent} from "./error-page/error-page.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/main-page', pathMatch: 'full'},
    {path: 'main-page', component: MainPageComponent },
    {path: 'animal-page/:animal', component: AnimalPageComponent},
    {path: 'animal-page/:animal/:id', component: BreedPageComponent},
    {path: '*', redirectTo: 'error-page'},
    {path: 'error-page', component: ErrorPageComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
