import { AssetPipe } from './pipes/asset.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { PreviewFurnitureComponent } from './preview-furniture/preview-furniture.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FabricjsEditorComponent } from './lib/lib.component';
import { MatNativeDateModule } from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { MaterialExampleModule } from './material.module';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    SafePipe,
    AssetPipe,
    PreviewFurnitureComponent,
    FabricjsEditorComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatListModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialExampleModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
