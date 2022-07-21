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
  furnishings = FURNISHINGS;
  defaultChairIndex = 0;
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
  
  defaultChairChanged(index: number) {
    this.defaultChairIndex = index;
    this.app.defaultChair.next(FURNISHINGS.chairs[index]);
  }
  public saveCanvasToJSON() {
    this.canvas.saveCanvasToJSON();
  }
  
  public getImgPolaroid(event:any) {
    this.canvas.getImgPolaroid(event);
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
  public saveImage() {
    this.resultImage = this.canvas.rasterize
  }
  
  public changeSize() {
    this.canvas.changeSize();
  }
}
