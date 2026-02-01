import {Component, inject, input, signal} from '@angular/core';
import {Survey} from '../../../../../shared/services/survey';
import {ProgressSpinner} from 'primeng/progressspinner';
import {NgClass} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Checkbox} from 'primeng/checkbox';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';
import {Session} from '../../../../../shared/services/session';
import {firstValueFrom} from 'rxjs';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-submission-form',
  imports: [
    ProgressSpinner,
    NgClass,
    InputText,
    Select,
    Checkbox,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './submission-form.html',
  styleUrl: './submission-form.scss',
})
export class SubmissionForm {
  id = input<number>();
  surveyService = inject(Survey)
  loader = signal<boolean>(false)
  surveyDetails = signal<any>({});
  session = inject(Session)
  userId!: number;
  router = inject(Router)
  messageService = inject(MessageService);

  fb = inject(FormBuilder);

  submissionForm!: FormGroup;

  constructor() {
    this.submissionForm = this.fb.group({
      answers: this.fb.array([])
    });
  }

  ngOnInit() {
    if(this.id()) {
      this.fetchSurveyDetails()
    }

    this.fetchSession()
  }

  async fetchSession() {
    const session = await firstValueFrom(this.session.userSession)
    console.log(session, 'session')
    this.userId = session?.userId ?? 0
  }

  get answersArray() {
    return this.submissionForm.get('answers') as FormArray;
  }

  addAnswer(fieldData?: any) {
    this.answersArray.push(this.fb.group({
      id: [fieldData?.id || null],
      type: [fieldData?.type || ''],
      label: [fieldData?.label || ''],
      isRequired: [fieldData?.isRequired || false],
      fieldOptions: this.fb.array([]),
      answer: [null]
    }))

    if (fieldData?.isRequired) {
      this.answersArray.at(this.answersArray.length - 1).get('answer')?.setValidators([Validators.required])
    }

    if (fieldData?.fieldOptions?.length > 0) {
      fieldData.fieldOptions.forEach((option: any) => {
        const options = this.answersArray.at(this.answersArray.length - 1).get('fieldOptions') as FormArray;
        options?.push(this.fb.group({
          id: [option?.id || null],
          optionLabel: [option?.optionLabel || ''],
          optionValue: [option?.optionValue || '']
        }))
      })
    }
  }

  fetchSurveyDetails() {
    this.loader.set(true)
    this.surveyService.fetchSurveyById(this.id()).subscribe(
      {
        next: survey => {
          this.surveyDetails.set(survey.data)
          this.updateAnswerForm()
          this.loader.set(false)
        },
        error: error => {
          this.loader.set(false)
        }
      }
    )
  }

  updateAnswerForm() {
    this.answersArray.clear()
    this.surveyDetails().fields.forEach((field: any) => {
      this.addAnswer(field)
    })
  }

  protected submitSurvey() {
    if (this.submissionForm.invalid) {
      this.messageService.add({severity: 'warn', summary: 'Please fill all required fields', life: 3000});
      return;
    }

    const answers = (this.submissionForm.value.answers || [])
      .map((a: any) => ({
        fieldId: a.id,
        fieldLabel: a.label,
        answer: typeof a.answer === 'string' ? a.answer : a.answer?.toString()
      }))
      .filter((a: any) => a.fieldId && a.answer !== null && a.answer !== undefined && a.answer !== '');

    const payload = {
      userId: this.userId,
      surveyId: Number(this.id()),
      submissionAnswers: answers
    };

    this.surveyService.createSubmission(payload).subscribe(
      {
        next: response => {
          this.messageService.add({severity: 'success', summary: 'Survey Submitted Successfully', life: 3000});
          this.router.navigate(['survey/survey-consumer/survey-list']);
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Error Submitting Survey', detail: error.error.message, life: 3000});
          this.router.navigate(['survey/survey-consumer/survey-list']);
        }
      }
    )

    console.log(this.submissionForm.value, 'submission form')
  }

  protected cancel() {
    this.router.navigate(['survey/survey-consumer/survey-list']);
  }
}
