import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTypeComponent } from './delete-type.component';

describe('DeleteTypeComponent', () => {
  let component: DeleteTypeComponent;
  let fixture: ComponentFixture<DeleteTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTypeComponent]
    });
    fixture = TestBed.createComponent(DeleteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
