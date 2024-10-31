import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTarjetaComponent } from './info-tarjeta.component';

describe('InfoTarjetaComponent', () => {
  let component: InfoTarjetaComponent;
  let fixture: ComponentFixture<InfoTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoTarjetaComponent]
    });
    fixture = TestBed.createComponent(InfoTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
