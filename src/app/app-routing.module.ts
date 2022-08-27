import { NewFloorComponent } from './new-floor/new-floor.component';
import { DemoComponent } from './demo/demo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

  const routes: Routes = [
    { path: '', component: DemoComponent },
    { path: 'add-floor', component: NewFloorComponent },
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
