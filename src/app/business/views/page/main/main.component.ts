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
    });
    this.categoryService.findAll(this.user.email).subscribe(result => this.categories = result);

  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();

    this.initSidebar();

    this.translate.use(LANG_EN);
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

}


