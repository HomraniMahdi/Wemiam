import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { fabric } from 'fabric';
import { AppService } from '../Service/app.service';


@Component({
  selector: 'app-lib',
  templateUrl: './lib.component.html',
  styleUrls: ['./lib.component.css']
})
export class FabricjsEditorComponent implements AfterViewInit {
  rectBlock: FormGroup;
  curvedBlock: FormGroup;
  layout: fabric.Group;
  view: fabric.Canvas;
  zoom = 100;

  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;

  private canvas: fabric.Canvas;
  public props = {
    canvasFill: '#ffffff',
    canvasImage: "",
    id: null,
    opacity: null,
    fill: null,
  };
  public resultImage: any;
  public textString: string;
  public url: string | ArrayBuffer = '';
  public size: any = {
    width: 1350,
    height: 750
  };
  public sizeWall: any = {
    width: 100,
    height: 20
  };

  public json: any;
  public figureEditor = false;
  public selected: any;

  constructor(public app: AppService) { }

  ngAfterViewInit(): void {

    // setup front side canvas
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',

    });


    this.canvas.on({
      'object:moving': (e) => { },
      'object:modified': (e) => { },
      'object:selected': (e) => {

        const selectedObject:any = e.target;
        this.selected = selectedObject;
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';
        if (selectedObject.type !== 'group' && selectedObject) {
          this.getId();
          switch (selectedObject.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              this.figureEditor = true;
              break;
          }
        }
      },
      'selection:cleared': (e) => {
        this.selected = null;
      }
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
    
    // get references to the html canvas element & its context
    this.canvas.on('mouse:down', (e) => {
      const canvasElement: any = document.getElementById('canvas');
    });

  }

  /*------------------------Block elements------------------------*/
  createCanvas() {
    var that = this;

    this.canvas = new fabric.Canvas("canvas", {
      preserveObjectStacking: true,
      selection: true
    });
  }
  
  /*------------------------Block changeSize------------------------*/
  changeSize() {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  /*------------------------Block Add Decoration------------------------*/
  getImgPolaroidDecoration(event: any) {
    const el = event.target;
    fabric.loadSVGFromURL(el.src, (objects, options) => {
      const image = fabric.util.groupSVGElements(objects, options);
      image.set({
        width : 50,
        height : 50,
        left: 10,
        top: 10,
        angle: 0,
        padding: 10,
        cornerSize: 10,
        rotatingPointOffset:0,
      });
      this.extend(image, this.randomId());
      this.canvas.add(image.setControlsVisibility({
        mt: false, // middle top disable
        mb: false, // midle bottom
        ml: false, // middle left
        mr: false, // I think you get it
        tl:true,
        bl:false,
        tr:false,
        br:false,
        mtr:false,
      }));
      this.selectItemAfterAdded(image);
    });
  }
  
    /*------------------------Block Add Table------------------------*/
    getImgPolaroidTable(event: any) {
      const el = event.target;
      fabric.loadSVGFromURL(el.src, (objects, options) => {
        const image = fabric.util.groupSVGElements(objects, options);
        image.set({
          width : 200,
          height : 100,
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornerSize: 10,
          rotatingPointOffset:0,
        });
        this.extend(image, this.randomId());
        this.canvas.add(image.setControlsVisibility({
          mt: false, // middle top disable
          mb: false, // midle bottom
          ml: false, // middle left
          mr: false, // I think you get it
          tl:false,
          bl:false,
          tr:false,
          br:false,
          mtr:false,
        }));
        this.selectItemAfterAdded(image);
      });
    }

 /*------------------------Block Add figure------------------------*/
  addFigure(figure: any) {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 500, height: 5, left: 10, top: 10, angle: 0,rotatingPointOffset:0,cornerSize:10,
          fill: '#D3D3D3'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,rotatingPointOffset:0,
          fill: '#D3D3D3'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: 10, top: 10,rotatingPointOffset:0, fill: '#D3D3D3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10,rotatingPointOffset:0, fill: '#D3D3D3'
        });
        break;
    }
    this.extend(add, this.randomId());
    this.canvas.add(add.setControlsVisibility({
      mt: false, // middle top disable
      mb: false, // midle bottom
      ml: true, // middle left
      mr: true, // I think you get it
      tl:false,
      bl:false,
      tr:false,
      br:false,
      mtr:false,
    }));
    this.selectItemAfterAdded(add);
  }

 /*------------------------Block cleanSelect------------------------*/
  cleanSelect() {
    this.canvas.discardActiveObject().renderAll();
  }

  selectItemAfterAdded(obj: fabric.Object) {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }

  setCanvasFill() {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
    }
  }

  extend(obj:any, id:any) {
    obj.toObject = ((toObject) => {
      return function(this:any) {
        return fabric.util.object.extend(toObject.call(this), {
          id
        });
      };
    })(obj.toObject);
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  clone() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {

        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  getId() {
    this.props.id = this.canvas.getActiveObject().toObject().id;
  }

  setId() {
    const val = this.props.id;
    const complete = this.canvas.getActiveObject().toObject();
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  }
  /****************************Block removeSelected********************** */
  removeSelected() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      const self = this;
      activeGroup.forEach((object) => {
        self.canvas.remove(object);
      });
    }
  }
  /****************************Block bringToFront********************** */
  bringToFront() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      activeObject.bringToFront();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  }
  /****************************Block sendToBack********************** */
  sendToBack() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.sendToBack(activeObject);
      activeObject.sendToBack();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  }
  /****************************Block confirmClear********************** */
  confirmClear() {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
    }
  }

  /****************************Block saveCanvasToJSON********************** */
  saveCanvasToJSON() {
    const json = JSON.stringify(this.canvas);
    localStorage.setItem('Kanvas', json);
    console.log('json');
    console.log(json);

  }

  /****************************Block rasterizeJSON********************** */
  rasterizeJSON() {
    this.json = JSON.stringify(this.canvas, null, 2);
  }

  onZoom(value: number) {
    this.app.zoom = value;
    this.app.performOperation.next('ZOOM');
  }

}
