import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDisplay } from './qr-display';

describe('QrDisplay', () => {
  let component: QrDisplay;
  let fixture: ComponentFixture<QrDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(QrDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
