import { Component, OnInit, ViewChild } from '@angular/core';
import { FURNISHINGS } from '../models/furnishings';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../Service/app.service';
import { FabricjsEditorComponent } from '../lib/lib.component';
import { MapConfig } from '../models/configuration';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  public resultImage: any;
  public visible = {
    objectsToolbar: true,
    adminToolbar: true,
    toolsToolbar: true,
    asideMarginSpace: true,
    floorsToolbar: true
};

  public floorMaps: MapConfig[];
  public currentFloorMap: MapConfig;
  public floorMapsDict: { [id: number]: MapConfig } = {};

  @ViewChild('canvas', { static: false }) canvas: FabricjsEditorComponent ;
  constructor(public app: AppService) { }

  ngOnInit(): void {
  }

  insert(object: any, type: string) {
    if (this.app.roomEdit) { return; }
    this.app.insertObject.next({ type, object });
  }

  public addFigure(figure: any) {
    this.canvas.addFigure(figure);
  }
  
  public saveCanvasToJSON() {
    this.canvas.saveCanvasToJSON();
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
  public sendToBack() {
    this.canvas.sendToBack();
  }
  
  public bringToFront() {
    this.canvas.bringToFront();
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
  
}
