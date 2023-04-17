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

    fetchData(pageNumber?, animal_id?: number, filter?){
        return this.http.get<ResponseDataModel>(`//localhost:8080/api/v1/${animal_id}/breeds?size=156&page=${pageNumber}`)
    }

    getByQuery(query){
        return this.http.get<any>(`//localhost:8080/api/v1/breeds?q=${query}`)
    }

    getAnimalsById(id){
        return this.http.get<any>(`//localhost:8080/api/v1/animal/${id}`)
    }

}