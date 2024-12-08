import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEquipamentComponent } from './info-equipament.component';

describe('InfoEquipamentComponent', () => {
  let component: InfoEquipamentComponent;
  let fixture: ComponentFixture<InfoEquipamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEquipamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoEquipamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
