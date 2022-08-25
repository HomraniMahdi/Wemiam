import { FloorService } from './../Service/FloorService';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Floor } from 'src/Models/Floor';
import { FabricjsEditorComponent } from '../lib/lib.component';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  public resultImage: any;
  public FloorLevel : number;
  public visible = {
    objectsToolbar: true,
    adminToolbar: true,
    toolsToolbar: true,
    asideMarginSpace: true,
    floorsToolbar: true
};

  @ViewChild('canvas', { static: false }) canvas: FabricjsEditorComponent ;
  constructor(private floorService: FloorService) { }


  selecteFloorId:any;
  floors: Floor[] = [];
  ngOnInit(): void {
    this.floorService.GetAllFloors().subscribe(floors => {
      this.floors = floors.data
      console.log(floors)
    })
  }

  public addFigure(figure: any) {
    this.canvas.addFigure(figure);
  }
  public addFigureVertical(figure: any) {
    this.canvas.addFigureVertical(figure);
  }
  public addPostion(figure: any) {
    this.canvas.addPostion(figure);
  }
  public getImgPolaroidDecoration(event:any) {
    this.canvas.getImgPolaroidDecoration(event);
  }

  public getImgPolaroidTable(event:any) {
    this.canvas.getImgPolaroidTable(event);
  }

  public setCanvasImage() {
    this.canvas.setCanvasImage();
  }
  
  public setCanvasFill() {
    this.canvas.setCanvasFill();
  }
  public rasterizeJSON() {
    this.canvas.rasterizeJSON();
  }
  public confirmClear() {
    this.canvas.confirmClear();
  }
  public removeSelected() {
    this.canvas.removeSelected();
  }
  public clone() {
    this.canvas.clone();
  }
  public cleanSelect() {
    this.canvas.cleanSelect();
  }
  
  public changeSize() {
    this.canvas.changeSize();
  }

  public onSelectFloor(event: any) {
    this.selecteFloorId = event.target.value;
    console.log(event.target.value);
    this.floorService.getFloorsById(this.selecteFloorId).subscribe(floor=>this.canvas.loadCanvasFromJSON(floor.floor_data));
  }

  public saveCanvasToJSON(){
    this.canvas.saveCanvasToJSON();
  }
}
