import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliaisDeleteComponent } from './filiais-delete.component';

describe('FiliaisDeleteComponent', () => {
  let component: FiliaisDeleteComponent;
  let fixture: ComponentFixture<FiliaisDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliaisDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliaisDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
