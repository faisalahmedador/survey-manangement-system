import {Component, inject, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {DataTableComponent} from '../../../../../shared/components/data-table/data-table.component';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Survey} from '../../../../../shared/services/survey';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';

@Component({
  selector: 'app-submission-list',
  imports: [
    Button,
    DataTableComponent,
    InputGroup,
    InputGroupAddon,
    InputText,
    ReactiveFormsModule,
    FormsModule,
    TableModule
  ],
  templateUrl: './submission-list.html',
  styleUrl: './submission-list.scss',
})
export class SubmissionList {
  cols = signal<any[]>([]);
  data = signal<any[]>([]);
  totalRecords = signal<number>(0);
  loading = signal<boolean>(true);
  searchText = signal<string>('');
  protected pageState: any = {
    pageIndex: 1,
    pageSize: 20,
    sortColumn: '',
    sortDirection: 'asc',
    baseOperator: 'OR',
    filters: [],
  };

  surveyService = inject(Survey)

  ngOnInit() {
  }


  onEmptyInput() {
    if (!this.searchText()) {
      this.getSurveyList(this.pageState);
    }
  }

  search() {
    this.loading.set(true);
    this.getSurveyList(this.pageState);
  }

  loadPageLazy(event: TableLazyLoadEvent) {
    let pageNum = 0;
    if (event.first === 0) {
      pageNum = 0;
    } else {
      if (event.first && event.rows)
        pageNum = event.first / event.rows;
      else
        pageNum = 0;
    }
    const paginatorOptions = {
      size: event.rows,
      page: pageNum,
    };
    this.getSurveyList(paginatorOptions);
  }

  protected getSurveyList(paginatorOptions: any) {
    this.data.set([]);
    this.loading.set(true);
    this.pageState.pageIndex = paginatorOptions?.page ? paginatorOptions.page  : paginatorOptions.pageIndex ? paginatorOptions.pageIndex : 0;
    this.pageState.pageSize = paginatorOptions.size ? paginatorOptions.size : paginatorOptions.pageSize ? paginatorOptions.pageSize : 20;


    this.surveyService.fetchSubmissions(this.pageState).subscribe(response => {
      this.data.set(response.data?.submissions || []);
      this.totalRecords.set(response.data.total);
      this.loading.set(false);
    });
  }
}
