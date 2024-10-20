import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentCardComponent } from './equipament-card.component';

describe('EquipamentCardComponent', () => {
  let component: EquipamentCardComponent;
  let fixture: ComponentFixture<EquipamentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipamentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
