import {Component, inject, input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {Select} from 'primeng/select';
import {Checkbox} from 'primeng/checkbox';
import {Router} from '@angular/router';
import {Survey} from '../../../../../shared/services/survey';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    InputText,
    Button,
    Select,
    Checkbox
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  surveyBuilderForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  surveyService = inject(Survey)
  messageService = inject(MessageService);
  editDetails: any;
  id = input<number>();
  fieldTypes = [
    { label: 'Text', value: 'text' },
    { label: 'Checkbox', value: 'checkbox'  },
    { label: 'Radio', value: 'radio'},
    { label: 'Dropdown', value: 'dropdown'}
  ]

  constructor() {
    this.surveyBuilderForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      fields: this.fb.array([])
    });
  }

  ngOnInit() {
    if (this.id()) {
      this.fetchSurveyDetails();
    }
  }

  fetchSurveyDetails() {
      this.surveyService.fetchSurveyById(this.id()).subscribe(response => {
        this.editDetails = response.data;
        this.surveyBuilderForm.patchValue(
          {
            title: response.data.title,
            description: response.data.description,
          }
        )

        if (response.data.fields.length > 0) {
          response.data.fields.forEach((field: any) => {
            this.createNewField(field);
          });

        }
      })
  }

  get fieldsArray() {
    return this.surveyBuilderForm.get('fields') as FormArray;
  }

  createNewField(fieldData?: any) {
    const fieldProperties = this.fb.group({
      id: [fieldData?.id ?? null],
      label: [fieldData?.label || '', [Validators.required]],
      type: [fieldData?.type || '', [Validators.required]],
      isRequired: [fieldData?.isRequired || false],
      fieldOptions: this.fb.array([])
    });

    fieldProperties.get('type')?.valueChanges.subscribe(type => {
      if (type === 'text') {
        const options = fieldProperties.get('fieldOptions') as FormArray;
        options.clear();
      }
    })

    this.fieldsArray.push(fieldProperties)

    if (fieldData?.fieldOptions?.length > 0) {
      fieldData.fieldOptions.forEach((fieldOption: any) => {
        this.addFieldOption(this.fieldsArray.length - 1, fieldOption);
      })
    }
  }

  getFieldOptionsArray(fieldIndex: number): FormArray {
    return this.fieldsArray.at(fieldIndex).get('fieldOptions') as FormArray;
  }

  addFieldOption(fieldIndex: number, fieldOptionValue?: any) {
    const fieldOptionGroup = this.fb.group({
      id: [fieldOptionValue?.id ?? null],
      optionLabel: [fieldOptionValue?.optionLabel || '', [Validators.required]],
      optionValue: [fieldOptionValue?.optionValue || '', [Validators.required]]
    })

    this.getFieldOptionsArray(fieldIndex).push(fieldOptionGroup);
  }

  removeBlankIds(value: any) {
    const fields = (value.fields || []).map((field: any) => {
      const { id, ...fieldRest } = field;

      const fieldOptions = (fieldRest.fieldOptions || []).map((opt: any) => {
        const { id: optId, ...optRest } = opt;
        return optId ? { id: optId, ...optRest } : optRest;
      });

      return id ? { id, ...fieldRest, fieldOptions } : { ...fieldRest, fieldOptions };
    });

    console.log(fields, 'fields')

    return { ...value, fields };
  }

  protected saveSurvey() {
    if (this.surveyBuilderForm.invalid) {
      this.messageService.add({severity: 'warn', summary: 'Please fill all required fields', life: 3000});
      return;
    }

    if (this.id()) {
      this.surveyBuilderForm.value.id = Number(this.id());
      this.surveyService.updateSurvey(this.removeBlankIds(this.surveyBuilderForm.value), this.id()).subscribe(response => {
        if (response.success) {
          this.messageService.add({severity: 'success', summary: 'Survey Created Successfully', life: 3000});
          this.router.navigate(['/survey/survey-builder/list']);
        }
      })
    } else {
      this.surveyService.createSurvey(this.removeBlankIds(this.surveyBuilderForm.value)).subscribe(response => {
        if (response.success) {
          this.messageService.add({severity: 'success', summary: 'Survey Created Successfully', life: 3000});
          this.router.navigate(['/survey/survey-builder/list']);
        }
      })
    }
  }

  protected cancel() {
    this.router.navigate(['/survey/survey-builder/list']);
  }
}
