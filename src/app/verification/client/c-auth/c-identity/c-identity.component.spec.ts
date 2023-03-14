import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CIdentityComponent } from './c-identity.component';

describe('CIdentityComponent', () => {
  let component: CIdentityComponent;
  let fixture: ComponentFixture<CIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CIdentityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
