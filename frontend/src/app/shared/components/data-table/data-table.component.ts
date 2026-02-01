import { Component, OnInit, input, output, model } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService } from 'primeng/api';
import {Button} from 'primeng/button';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {height_185, rowsPerPageOptions, rows} from '../../utils/table_props';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  standalone: true,
  imports: [
    Button,
    TableModule
  ],
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  data = input<any[]>([]);
  cols = input<any[]>([]);
  totalRecords = input<number>(0);
  route = input<string>();
  loading = input<boolean>(false);
  addBtn = input<boolean>(false);
  editBtn = input<boolean>(false);
  submitBtn = input<boolean>(false);
  selectedItem = model<any | null>(null);
  passwordChangeDateFlag = input<boolean>(false);
  scrollHeight = height_185
  rowsPerPageOptions = rowsPerPageOptions
  rows = rows
  onPageSelect = output<any>();
  onDialogueSelect = output<any>();


  constructor(private router: Router,
    private messageService: MessageService) {
  }

  ngOnInit() {
  }

  add() {
    this.router.navigate([this.route() + '/create']);
  }

  viewDetails() {
    const selected = this.selectedItem();
    if (selected) {
      const id = selected.id;
      this.router.navigate([this.route() + `/edit/${id}`] );
    } else {
      this.messageService.add({
        summary: 'Please select a row',
        severity: 'warn', life: 3000
      });
    }
  }

  viewDialogue() {
    this.onDialogueSelect.emit(this.selectedItem());
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
    this.onPageSelect.emit(paginatorOptions);
  }

  protected submitSurvey() {
    const selected = this.selectedItem();
    if (selected) {
      const id = selected.id;
      this.router.navigate([`${this.route() + '/' + id}`]);
    } else {
      this.messageService.add({
        summary: 'Please select a row',
        severity: 'warn', life: 3000
      });
    }
  }
}
