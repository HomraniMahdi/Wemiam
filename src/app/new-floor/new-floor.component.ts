import { FloorService } from './../Service/FloorService';
import { Building } from './../../Models/Building';
import { BuildingService } from './../Service/BuildingService';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Floor } from 'src/Models/Floor';
import { DemoComponent } from '../demo/demo.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-floor',
  templateUrl: './new-floor.component.html',
  styleUrls: ['./new-floor.component.css']
})
export class NewFloorComponent implements OnInit {

  constructor(private matDialog:MatDialog,private BuildingService: BuildingService, private floorService:FloorService,private router : Router) { }
  idBuilding: any;
  floor: Floor = {
    floor_id: '',
    created_on: new Date(),
    floor_level: 0,
    floor_data: JSON,
    building_id: ''
  };
  buildings: Building[] = [];
  selectedBuildId: any;
  ngOnInit(): void {
    this.BuildingService.GetAllBuilding().subscribe(buildings => {
      this.buildings = buildings.data
      console.log(buildings)
    })
  }

  onSelectBuild(event: any){
    this.selectedBuildId = event.target.value;
    this.floor.building_id = this.selectedBuildId;
    console.log(event.target.value)
  }
  addFloor() {
    Swal.fire('Success ', 'floor Added', 'success');
    console.log(this.floor)
    this.floorService.addFloor(this.floor).subscribe(floor => {
      console.log(floor)
     }
      ,(error) => {
        Swal.fire('Error', 'Error in adding floor', 'error');
      })
      this.matDialog.closeAll
    }

}
