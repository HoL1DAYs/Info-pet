import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {ResponseDataModel} from "./responseData.model";


@Injectable({
    providedIn: "root"
})
export class RequestService{
    constructor(private http: HttpClient) {
    }

    getBreedById(id?: number, animal?: string, size?: number, filters?: []){
        return this.http.get<any>(`//localhost:8080/api/v1/breeds/${id}?animal=1&size=12`)
    }

    fetchData(pageNumber){
        return this.http.get<ResponseDataModel>(`//localhost:8080/api/v1/breeds?animal=1&size=12&page=${pageNumber}`)
        //     .pipe(map(responseData => {
        //     // const postArray: BreedCard[] = [];
        //     // for (const key in responseData){
        //     //     if (responseData.hasOwnProperty(key)){
        //     //         postArray.push({...responseData[key], id: key})
        //     //     }
        //     // }
        //     // return postArray
    // }))
}

}