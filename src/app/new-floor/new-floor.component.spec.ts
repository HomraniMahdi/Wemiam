import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFloorComponent } from './new-floor.component';

describe('NewFloorComponent', () => {
  let component: NewFloorComponent;
  let fixture: ComponentFixture<NewFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
