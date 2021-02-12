import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoChartsComponent } from './info-charts.component';

describe('InfoChartsComponent', () => {
  let component: InfoChartsComponent;
  let fixture: ComponentFixture<InfoChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
