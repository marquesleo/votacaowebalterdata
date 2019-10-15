import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliaisCreateComponent } from './filiais-create.component';

describe('FiliaisCreateComponent', () => {
  let component: FiliaisCreateComponent;
  let fixture: ComponentFixture<FiliaisCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliaisCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliaisCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
