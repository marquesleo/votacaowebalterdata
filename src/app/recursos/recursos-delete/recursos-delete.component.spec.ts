import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosDeleteComponent } from './recursos-delete.component';

describe('RecursosDeleteComponent', () => {
  let component: RecursosDeleteComponent;
  let fixture: ComponentFixture<RecursosDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
