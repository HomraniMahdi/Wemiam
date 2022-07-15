import { Component, OnInit, ViewChild } from '@angular/core';
import { FURNISHINGS } from '../models/furnishings';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { FabricjsEditorComponent } from '../lib/lib.component';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  @ViewChild('canvas', { static: false }) canvas: FabricjsEditorComponent;
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
}
