import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { RecipesComponent } from './recipes/recipes.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {BreedPageComponent} from "./breed-page/breed-page.component";
import {AnimalPageComponent} from "./animal-page/animal-page.component";

const appRoutes: Routes = [
  // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: '', redirectTo: '/main-page',pathMatch: 'full'},

  { path: 'main-page', component: MainPageComponent },
  { path: 'animal-page/:animal/:pagination', component: AnimalPageComponent },
  { path: 'animal-page/:animal/:pagination/:breed', component: BreedPageComponent },
  { path: 'animal-page/:animal/:breed', component: BreedPageComponent },
  { path: 'animal-page/:animal', component: AnimalPageComponent },
  // { path: 'recipes', component: RecipesComponent, children: [
  //   { path: '', component: RecipeStartComponent },
  //   { path: 'new', component: RecipeEditComponent },
  //   { path: ':id', component: RecipeDetailComponent },
  //   { path: ':id/edit', component: RecipeEditComponent },
  // ] },
  // { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
