import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosCreateComponent } from './recursos-create.component';

describe('RecursosCreateComponent', () => {
  let component: RecursosCreateComponent;
  let fixture: ComponentFixture<RecursosCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
