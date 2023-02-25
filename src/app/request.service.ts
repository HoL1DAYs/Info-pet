import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {ResponseDataModel} from "./responseData.model";


@Injectable({
    providedIn: "root"
})
export class RequestService{
    constructor(private http: HttpClient) {
    }

    getBreedById(id?: number, size?: number, filters?: []){
        return this.http.get<any>(`//localhost:8080/api/v1/breeds/${id}?size=12`)
    }

    fetchData(pageNumber, filters?){
        if (filters != null){
            return this.http.get<ResponseDataModel>(`//localhost:8080/api/v1/1/breeds?size=12&page=0&filters=${filters}`)
        } else{
            return this.http.get<ResponseDataModel>(`//localhost:8080/api/v1/1/breeds?size=12&page=${pageNumber}`)
        }
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

    getByQuery(query){
        return this.http.get<any>(`//localhost:8080/api/v1/breeds?q=${query}`)
    }
}