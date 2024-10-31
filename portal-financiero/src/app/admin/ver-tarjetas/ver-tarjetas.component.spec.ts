import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTarjetasComponent } from './ver-tarjetas.component';

describe('VerTarjetasComponent', () => {
  let component: VerTarjetasComponent;
  let fixture: ComponentFixture<VerTarjetasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerTarjetasComponent]
    });
    fixture = TestBed.createComponent(VerTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
