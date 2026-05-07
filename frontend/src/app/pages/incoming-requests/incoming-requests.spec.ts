import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingRequests } from './incoming-requests';

describe('IncomingRequests', () => {
  let component: IncomingRequests;
  let fixture: ComponentFixture<IncomingRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomingRequests],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomingRequests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
