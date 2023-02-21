import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SaIdToDobComponent } from './SaIdToDobComponent.component';

describe('SaIdToDobComponent', () => {
  let component: SaIdToDobComponent;
  let fixture: ComponentFixture<SaIdToDobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaIdToDobComponent],
      imports: [BrowserModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SaIdToDobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate date of birth for ID with year 2000 and later', () => {
    component.id = '000101';
    const mockEvent = new Event('keydown');
    component.onKeydownId(mockEvent);
    expect(component.dob).toEqual('2000/01/01');
  });

  it('should calculate date of birth for ID with year 1900-1999', () => {
    component.id = '900101';
    const mockEvent = new Event('keydown');
    component.onKeydownId(mockEvent);
    expect(component.dob).toEqual('1990/01/01');
  });
});
