import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mfacultylist } from './mfacultylist';

describe('Mfacultylist', () => {
  let component: Mfacultylist;
  let fixture: ComponentFixture<Mfacultylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mfacultylist],
    }).compileComponents();

    fixture = TestBed.createComponent(Mfacultylist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
