import { FloorService } from './../Service/FloorService';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Floor } from 'src/Models/Floor';
import { FabricjsEditorComponent } from '../lib/lib.component';
import { NewFloorComponent } from '../new-floor/new-floor.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  public FloorLevel : number;


  @ViewChild('canvas', { static: false }) canvas: FabricjsEditorComponent ;
  constructor(private matDialog:MatDialog,private floorService: FloorService) { }


  selecteFloorId:any;
  selectfloor ="656c7065-9246-4024-b0b4-8389020df2e4";
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
  public Addfloor(){
    this.matDialog.open(NewFloorComponent);
  }

  public deleteFloor(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.selectfloor)
        this.floorService.deleteFloor(this.selectfloor)
        .subscribe(()=>this.floorService.GetAllFloors().subscribe(res=>{this.floors=res}));
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
