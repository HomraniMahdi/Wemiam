import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class BuildingService {
  
    constructor(private _http: HttpClient) {}

    GetAllBuilding():Observable<any> {
      let sessionid = '02164c02-1553-47af-88ae-cb21118695f1';
      const headers = new HttpHeaders().set("session", sessionid);
      return this._http.get<any>(`http://localhost:3000/buildings`,{ headers });
    }

  }