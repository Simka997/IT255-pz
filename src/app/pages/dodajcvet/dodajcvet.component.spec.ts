import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajcvetComponent } from './dodajcvet.component';

describe('DodajcvetComponent', () => {
  let component: DodajcvetComponent;
  let fixture: ComponentFixture<DodajcvetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajcvetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajcvetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
