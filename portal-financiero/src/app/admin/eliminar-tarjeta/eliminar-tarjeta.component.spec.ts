import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTarjetaComponent } from './eliminar-tarjeta.component';

describe('EliminarTarjetaComponent', () => {
  let component: EliminarTarjetaComponent;
  let fixture: ComponentFixture<EliminarTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarTarjetaComponent]
    });
    fixture = TestBed.createComponent(EliminarTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
