import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliaisUpdateComponent } from './filiais-update.component';

describe('FiliaisUpdateComponent', () => {
  let component: FiliaisUpdateComponent;
  let fixture: ComponentFixture<FiliaisUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliaisUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliaisUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
