import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecvettipComponent } from './updatecvettip.component';

describe('UpdatecvettipComponent', () => {
  let component: UpdatecvettipComponent;
  let fixture: ComponentFixture<UpdatecvettipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecvettipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecvettipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
