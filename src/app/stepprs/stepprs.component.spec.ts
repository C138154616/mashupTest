import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepprsComponent } from './stepprs.component';

describe('StepprsComponent', () => {
  let component: StepprsComponent;
  let fixture: ComponentFixture<StepprsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepprsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepprsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
