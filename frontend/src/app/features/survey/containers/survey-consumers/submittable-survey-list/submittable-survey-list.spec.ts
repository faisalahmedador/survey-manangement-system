import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittableSurveyList } from './submittable-survey-list';

describe('SubmittableSurveyList', () => {
  let component: SubmittableSurveyList;
  let fixture: ComponentFixture<SubmittableSurveyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmittableSurveyList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmittableSurveyList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
