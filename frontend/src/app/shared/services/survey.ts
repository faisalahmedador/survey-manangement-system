import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Survey {
  private SURVEYS_URL = environment.apiUrl + '/surveys';
  private SUBMISSION_URL = environment.apiUrl + '/submissions';
  http = inject(HttpClient);

  fetchSurveys(pageState: any) {
    return this.http.post<any>(this.SURVEYS_URL + '/list', pageState);
  }

  fetchSubmissions(pageState: any) {
    return this.http.post<any>(this.SUBMISSION_URL + '/list', pageState);
  }

  createSubmission(submission: any) {
    return this.http.post<any>(this.SUBMISSION_URL + '/create', submission);
  }

  createSurvey(survey: any) {
    return this.http.post<any>(this.SURVEYS_URL + '/create', survey);
  }

  updateSurvey(survey: any, id: any) {
    return this.http.put<any>(this.SURVEYS_URL + `/update/${id}`, survey);
  }

  fetchSurveyById(id?: number) {
    return this.http.get<any>(this.SURVEYS_URL + `/get/${id}`);
  }
}
