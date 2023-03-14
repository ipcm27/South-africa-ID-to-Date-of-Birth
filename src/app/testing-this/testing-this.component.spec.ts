import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingThisComponent } from './testing-this.component';

describe('TestingThisComponent', () => {
  let component: TestingThisComponent;
  let fixture: ComponentFixture<TestingThisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingThisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
