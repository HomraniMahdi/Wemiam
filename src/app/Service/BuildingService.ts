import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })
  export class BuildingService {
  
    constructor(private _http: HttpClient) {}
    //load all the cateogries
    public Building() {
      return this._http.get(`http://localhost:3000/floors/data`);
    }
  
    //add new Building
    public addFloor(json:any) {
      return this._http.post(`http://localhost:3000/jsons`, json);
    }
  }
  