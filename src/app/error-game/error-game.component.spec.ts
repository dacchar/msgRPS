import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorGameComponent } from './error-game.component';

describe('ErrorGameComponent', () => {
  let component: ErrorGameComponent;
  let fixture: ComponentFixture<ErrorGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
