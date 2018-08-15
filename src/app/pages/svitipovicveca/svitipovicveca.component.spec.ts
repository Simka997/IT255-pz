import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvitipovicvecaComponent } from './svitipovicveca.component';

describe('SvitipovicvecaComponent', () => {
  let component: SvitipovicvecaComponent;
  let fixture: ComponentFixture<SvitipovicvecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvitipovicvecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvitipovicvecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
