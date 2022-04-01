import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../data/model/Task';
import {Category} from '../../../data/model/Category';
import {DeviceDetectorService} from 'ngx-device-detector';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../../auth/service/auth.service';
import {TaskSearchValues} from '../../../data/dao/search/SearchObjects';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TaskListComponent implements OnInit {

  @Input()
  totalTasksFounded: number;

  @Input()
  user: User;

  @Input()
  selectedCategory: Category;

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.assignTableSource();
  }

  @Input('taskSearchValues')
  set setTaskSearchValues(taskSearchValues: TaskSearchValues) {
    this.taskSearchValues = taskSearchValues;
    this.initSearchValues();
  }

  tasks: Task[];

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();


  filterTitle: string;
  filterCompleted: number;
  filterPriorityId: number;
  filterSortColumn: string;
  filterSortDirection: string;

  isMobile: boolean;

  taskSearchValues: TaskSearchValues;

  translateWithoutCategory: string;
  translateWithoutPriority: string;


  readonly colorCompletedTask = '#F8F9FA';
  readonly colorWhite = '#fff';

  constructor(
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private translate: TranslateService,
  ) {
    this.isMobile = this.deviceService.isMobile();

    this.initTranslations();

  }

  ngOnInit(): void {}


  initTranslations(): void {
    this.translate.get(['TASKS.WITHOUT-CATEGORY', 'TASKS.WITHOUT-PRIORITY']).subscribe((res: string) => {
      this.translateWithoutCategory = res['TASKS.WITHOUT-CATEGORY'];
      this.translateWithoutPriority = res['TASKS.WITHOUT-PRIORITY'];
    });
  }

  assignTableSource(): void {

    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.tasks;

  }

  initSearchValues(): void {
    if (!this.taskSearchValues) {
      return;
    }
    this.filterTitle = this.taskSearchValues.title;
    this.filterCompleted = this.taskSearchValues.completed;
    this.filterPriorityId = this.taskSearchValues.priorityId;
    this.filterSortColumn = this.taskSearchValues.sortColumn;
    this.filterSortDirection = this.taskSearchValues.sortDirection;

  }

  getPriorityColor(task: Task): string {

    if (task.completed) {
      return this.colorCompletedTask;
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return this.colorWhite;

  }
}

