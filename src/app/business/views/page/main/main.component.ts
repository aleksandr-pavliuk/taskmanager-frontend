import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core';
import {AuthService, User} from '../../../../auth/service/auth.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {TaskService} from '../../../data/dao/impl/TaskService';
import {PriorityService} from '../../../data/dao/impl/PriorityService';
import {CategoryService} from '../../../data/dao/impl/CategoryService';
import {StatService} from '../../../data/dao/impl/StatService';
import {Category} from "../../../data/model/Category";
import {Priority} from "../../../data/model/Priority";
import {Task} from '../../../data/model/Task';
import {TranslateService} from "@ngx-translate/core";
import {CategorySearchValues, TaskSearchValues} from "../../../data/dao/search/SearchObjects";
import {Stat} from "../../../data/model/Stat";
import {DashboardData} from "../../../object/DashboardData";
import {TaskListComponent} from "../tasks/tasks.component";

export const LANG_EN = 'en';
export const LANG_RU = 'ru';

type MenuMode = 'over' | 'push' | 'slide';
type MenuPosition = 'start' | 'end' | 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isMobile: boolean;
  isTablet: boolean;

  user: User = null;

  tasks: Task[];
  priorities: Priority[];
  categories: Category[];

  menuOpened: boolean;
  menuMode: MenuMode;
  menuPosition: MenuPosition;
  showBackdrop: boolean;

  isLoading: boolean;

  showStat = true;
  showSearch = false;

  categorySearchValues = new CategorySearchValues();

  selectedCategory: Category = null;
  taskSearchValues: TaskSearchValues;

  dash: DashboardData = new DashboardData();
  stat: Stat;

  totalTasksFound: number;

  readonly defaultPageSize = 5;
  readonly defaultPageNumber = 0;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private priorityService: PriorityService,
    private statService: StatService,
    private authService: AuthService,
    private deviceService: DeviceDetectorService,
    private translate: TranslateService
  ) {

    this.authService.currentUser.subscribe(result => {
      this.user = result;
      this.categorySearchValues.email = this.user.email;
    });
    this.categoryService.findAll(this.user.email).subscribe(result => this.categories = result);

    this.taskSearchValues = new TaskSearchValues();
    this.taskSearchValues.pageSize = this.defaultPageSize;
    this.taskSearchValues.pageNumber = this.defaultPageNumber;

  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();

    this.initSidebar();

    this.translate.use(LANG_RU);


    this.statService.getOverallStat(this.user.email).subscribe((result => {
      this.stat = result;

      this.categoryService.findAll(this.user.email).subscribe(res => {
        this.categories = res;

        this.selectCategory(this.selectedCategory);

      });
    }));
  }

  initSidebar(): void {

    this.menuPosition = 'left';

    if (this.isMobile) {
      this.menuOpened = false;
      this.menuMode = 'over';
      this.showBackdrop = true;
    } else {
      this.menuOpened = true;
      this.menuMode = 'push';
      this.showBackdrop = false;
    }
  }

  toggleMenu(): void {
    this.menuOpened = !this.menuOpened;
  }

  addCategory(category: Category): void {
    this.categoryService.add(category).subscribe(result => {
        this.searchCategory(this.categorySearchValues);
      }
    );
  }

  updateCategory(category: Category): void {
    this.categoryService.update(category).subscribe( () => {
      this.searchCategory(this.categorySearchValues);
    })
  }

  searchCategory(categorySearchValues: CategorySearchValues): void {
    this.categoryService.findCategories(categorySearchValues).subscribe(result => {
      this.categories = result
    });
  }

  deleteCategory(category: Category): void {

    if (this.selectedCategory && category.id === this.selectedCategory.id) {
      this.selectedCategory = null;
    }

    this.categoryService.delete(category.id).subscribe(cat => {
      this.searchCategory(this.categorySearchValues);
      this.selectCategory(this.selectedCategory);
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;

    if (category) {
      this.dash.completedTotal = category.completedCount;
      this.dash.uncompletedTotal = category.uncompletedCount;
    } else {
      this.dash.completedTotal = this.stat.completedTotal;
      this.dash.uncompletedTotal = this.stat.uncompletedTotal;
    }

    this.taskSearchValues.pageNumber = 0;

    this.selectedCategory = category;

    this.taskSearchValues.categoryId = category ? category.id : null;

    this.searchTasks(this.taskSearchValues);

  }

  toggleStat(showStat: boolean): void {
    this.showStat = showStat;
  }

  toggleSearch(showStat: boolean): void {
    this.showStat = showStat;
  }

  searchTasks(searchTaskValues: TaskSearchValues): void {

    this.taskSearchValues = searchTaskValues;
    this.taskSearchValues.email = this.user.email;

    this.taskService.findTasks(this.taskSearchValues).subscribe(result => {

      console.log(result);

      this.totalTasksFound = result.totalElements;
      this.tasks = result.content;

    });

  }

}


