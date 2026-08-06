import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mfaculty } from './mfaculty';

describe('Mfaculty', () => {
  let component: Mfaculty;
  let fixture: ComponentFixture<Mfaculty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mfaculty],
    }).compileComponents();

    fixture = TestBed.createComponent(Mfaculty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
