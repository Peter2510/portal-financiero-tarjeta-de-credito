import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquearTarjetaComponent } from './bloquear-tarjeta.component';

describe('BloquearTarjetaComponent', () => {
  let component: BloquearTarjetaComponent;
  let fixture: ComponentFixture<BloquearTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloquearTarjetaComponent]
    });
    fixture = TestBed.createComponent(BloquearTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
