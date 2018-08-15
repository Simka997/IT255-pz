import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrujseComponent } from './registrujse.component';

describe('RegistrujseComponent', () => {
  let component: RegistrujseComponent;
  let fixture: ComponentFixture<RegistrujseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrujseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrujseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
