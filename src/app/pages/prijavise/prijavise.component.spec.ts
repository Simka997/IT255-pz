import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijaviseComponent } from './prijavise.component';

describe('PrijaviseComponent', () => {
  let component: PrijaviseComponent;
  let fixture: ComponentFixture<PrijaviseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrijaviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrijaviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
