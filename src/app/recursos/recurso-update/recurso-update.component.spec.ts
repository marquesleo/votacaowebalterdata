import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoUpdateComponent } from './recurso-update.component';

describe('RecursoUpdateComponent', () => {
  let component: RecursoUpdateComponent;
  let fixture: ComponentFixture<RecursoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
