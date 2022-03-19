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
import {TranslateService} from "@ngx-translate/core";
import {CategorySearchValues} from "../../../data/dao/search/SearchObjects";

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

  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();

    this.initSidebar();

    this.translate.use(LANG_RU);
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
      this.searchCategory(this.categorySearchValues); // обновляем список категорий
      this.selectCategory(this.selectedCategory);
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    console.log(category);
  }

  toggleStat(showStat: boolean): void {
    this.showStat = showStat;
  }

  toggleSearch(showSearch: boolean): void {
    this.showSearch = showSearch;
  }

}


