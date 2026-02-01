import {Component, inject, signal} from '@angular/core';
import {InputGroup} from 'primeng/inputgroup';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {Button} from 'primeng/button';
import {DataTableComponent} from '../../../../../shared/components/data-table/data-table.component';
import {Survey} from '../../../../../shared/services/survey';

@Component({
  selector: 'app-list',
  imports: [
    InputGroup,
    InputText,
    FormsModule,
    InputGroupAddon,
    Button,
    DataTableComponent
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  cols = signal<any[]>([]);
  data = signal<any[]>([]);
  totalRecords = signal<number>(0);
  route = 'survey/survey-builder'
  loading = signal<boolean>(true);
  searchText = signal<string>('');
  private pageState: any = {
    pageIndex: 1,
    pageSize: 20,
    sortColumn: '',
    sortDirection: 'asc',
    baseOperator: 'OR',
    filters: [],
  };

  surveyService = inject(Survey)

  ngOnInit() {
    this.cols.set([
      {field: 'title', header: 'Title', width: '20%', sortable: false},
      {field: 'description', header: 'Description', width: '20%', sortable: false}
    ])
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

  getSurveyList(paginatorOptions: any) {
    this.data.set([]);
    this.loading.set(true);
    this.pageState.pageIndex = paginatorOptions?.page ? paginatorOptions.page  : paginatorOptions.pageIndex ? paginatorOptions.pageIndex : 0;
    this.pageState.pageSize = paginatorOptions.size ? paginatorOptions.size : paginatorOptions.pageSize ? paginatorOptions.pageSize : 20;


    this.surveyService.fetchSurveys(this.pageState).subscribe(response => {
      this.data.set(response.data?.surveys || []);
      this.totalRecords.set(response.data.total);
      this.loading.set(false);
    });
  }
}
