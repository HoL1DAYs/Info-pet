import { Pipe, PipeTransform } from '@angular/core';
import {BreedCard} from "./breedCard.model";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(breeds: BreedCard[], currentFilters: string[]) {
    return breeds.filter(breed => {
      const isTrue: boolean[] = []
      for (const filter of currentFilters){
        if (breed.filters.includes(filter)){
          isTrue.push(true)
        }else {
          isTrue.push(false)
        }
      }
      if (isTrue.every((boolean) => {
        return boolean
      })){
        return breed
      }
    });
  }

}
