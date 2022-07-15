import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { fabric } from 'fabric';
import * as uuid from 'uuid';
import { createFurniture, RL_PREVIEW_HEIGHT, RL_PREVIEW_WIDTH } from '../helpers';

let RL_DEFAULT_CHAIR :any ;
@Component({
  selector: 'app-preview-furniture',
  templateUrl: './preview-furniture.component.html',
  styleUrls: ['./preview-furniture.component.css']
})

export class PreviewFurnitureComponent implements OnInit,AfterViewInit {

  id: any;
  canvas!: fabric.Canvas;

  @Input()
  type!: string;

  @Input()
  furniture: any;

  constructor(public app: AppService) { }



  ngOnInit(): void {
    this.id = uuid.v4();
    this.app.defaultChair.subscribe(res => {
      this.canvas.clear();
      RL_DEFAULT_CHAIR = res;
      const type = this.type, object = this.furniture;
      this.handleObjectInsertion({type, object});
      this.canvas.renderAll();
    });
  }

  ngAfterViewInit(): void {
    const canvas = new fabric.Canvas(this.id);
    canvas.setWidth(RL_PREVIEW_WIDTH);
    canvas.setHeight(RL_PREVIEW_HEIGHT);
    this.canvas = canvas;
  }
  handleObjectInsertion(item : any ) {
    const group = createFurniture(item.type, item.object, RL_DEFAULT_CHAIR);

    group.left = RL_PREVIEW_WIDTH / 2;
    group.top = RL_PREVIEW_HEIGHT / 2;
    group.selectable = false;
    group.hoverCursor = 'pointer';

    this.canvas.add(group);
  }
}
