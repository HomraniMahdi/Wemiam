import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  roomEdit = false;

  states:any = [];
  redoStates = [];

  roomEditOperate = 'CORNER';
  roomEditStates :any = [] ;
  roomEditRedoStates = [];

  selections: any[] = [];
  copied: any;

  ungroupable = false;

  insertObject: Subject<any> = new Subject<any>();
  defaultChair: Subject<any> = new Subject<any>();
  performOperation: Subject<any> = new Subject<any>();
  roomEdition: Subject<boolean> = new Subject<boolean>();
  saveState = new Subject<any>();
  zoom = 100;
 statue : any  ;
  constructor() {
    this.saveState.subscribe(res => {
      if (this.roomEdit) {
        this.roomEditStates.push(res);
        this.roomEditRedoStates = [];
        return;
      }
      this.states.push(res);
      this.redoStates = [];
    });
  }

  editRoom() {
    this.roomEdit = true;
    this.roomEdition.next(true);
  }

  endEditRoom() {
    this.roomEdit = false;
    this.roomEdition.next(false);
  }

  undo() {
    if ((this.states.length === 1 && !this.roomEdit) || (this.roomEditStates.length === 1 && this.roomEdit)) {
      return;
    }
    this.performOperation.next('UNDO');
  }

  redo() {
    if ((this.redoStates.length === 0 && !this.roomEdit) || (this.roomEditRedoStates.length === 0 && this.roomEdit)) {
      return;
    }
    this.performOperation.next('REDO');
  }

  clone() {
    this.copy(true);
  }

  copy(doClone = false) {
    this.performOperation.next('COPY');
    if (doClone) {
      setTimeout(() => this.paste(), 100);
    }
  }

  paste() {
    this.performOperation.next('PASTE');
  }

  delete() {
    if (!this.selections.length) {
      return;
    }
    this.performOperation.next('DELETE');
  }

  rotateAntiClockWise() {
    this.performOperation.next('ROTATE_ANTI');
  }

  rotateClockWise() {
    this.performOperation.next('ROTATE');
  }

  group() {
    this.performOperation.next('GROUP');
  }

  ungroup() {
    this.performOperation.next('UNGROUP');
  }

  zoomIn() {
    if (this.zoom >= 150) {
      return;
    }
    this.zoom += 10;
    this.performOperation.next('ZOOM');
  }

  zoomOut() {
    if (this.zoom <= 20) {
      return;
    }
    this.zoom -= 10;
    this.performOperation.next('ZOOM');
  }
  
  
    /**
     * Replaces current editor content with new map.
     * @param map A map to load into editor.
     */
    /* public loadMap(map: MapConfig): Observable<any> {
      return new Observable(o => {
          this.clear();
          this.currentFloorMap = map;
          const data = this.assets.getOther(map.backgroundImage);
          this.setBackgroundImage(data)
              .then(() => {
                  const tmp = this.activeObject;
                  const tmpRotation = this.rotation;
                  const snapGrid = this.snapToGrid;
                  this.snapToGrid = false;
                  map.items.forEach(item => {
                      this.setActiveObject(item.type);
                      this.onEditorMouseMove(<MouseEvent>{
                          offsetX: item.x,
                          offsetY: item.y
                      });
                      this.rotation = item.rotation;
                      this.updateCursorRotation();
                      this.drawObject(item.x, item.y);
                  });
                  this.onEditorMouseLeave();
                  this.rotation = tmpRotation;
                  this.setActiveObject(tmp.type);
                  this.snapToGrid = snapGrid;
                  o.next();
                  o.complete();
              });
      });
  }*/
      /**
     * Clear whole map editor, including graphics and interactive elements.
     */
       /*public clear(): void {
        this.layers.objects.forEach(x => {
            this.removeNativeChildOfObject(x);
        });
        this.layers.clear();
        this.clean();
    }*/
}
