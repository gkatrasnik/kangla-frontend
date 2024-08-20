import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlantDialogComponent } from './add-plant-dialog.component';

describe('AddDeviceDialogComponent', () => {
  let component: AddPlantDialogComponent;
  let fixture: ComponentFixture<AddPlantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlantDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
