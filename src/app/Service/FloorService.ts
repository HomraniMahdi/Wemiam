import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Floor } from "src/Models/Floor";

@Injectable({
    providedIn: 'root'
  })
  export class FloorService {
  
    constructor(private _http: HttpClient) {}

    GetAllFloors():Observable<any> {
      let sessionid = '02164c02-1553-47af-88ae-cb21118695f1';
      const headers = new HttpHeaders().set("session", sessionid);
      return this._http.get<any>(`http://localhost:3000/floors`,{ headers });
    }

    getFloorsById( idfloor : string){
      let sessionid = '02164c02-1553-47af-88ae-cb21118695f1';
      const headers = new HttpHeaders().set("session", sessionid);
      return this._http.get<any>("http://localhost:3000/floors/"+idfloor,{ headers })
    }

    public Building() {
      return this._http.get(`http://localhost:3000/floors/data`);
    }
  
    //add new Building
    public updateFloor(idFloor : any , floor:any) {
      let sessionid = '02164c02-1553-47af-88ae-cb21118695f1';
      const headers = new HttpHeaders().set("session", sessionid);
      return this._http.put(`http://localhost:3000/floors/`+idFloor, floor,{ headers });
    }


  }
  