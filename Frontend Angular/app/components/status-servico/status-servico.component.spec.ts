import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusServicoComponent } from './status-servico.component';

describe('StatusServicoComponent', () => {
  let component: StatusServicoComponent;
  let fixture: ComponentFixture<StatusServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
