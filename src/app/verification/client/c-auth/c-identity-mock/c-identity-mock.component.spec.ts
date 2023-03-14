import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CIdentityMockComponent } from './c-identity-mock.component';

describe('CIdentityMockComponent', () => {
  let component: CIdentityMockComponent;
  let fixture: ComponentFixture<CIdentityMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CIdentityMockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CIdentityMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
