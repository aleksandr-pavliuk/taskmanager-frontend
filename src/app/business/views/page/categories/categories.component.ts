import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {User} from '../../../../auth/service/auth.service';
import {Category} from "../../../data/model/Category";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogAction} from "../../../object/DialogResult";
import {
  EditCategoryDialogComponent
} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {TranslateService} from "@ngx-translate/core";
import {CategorySearchValues} from "../../../data/dao/search/SearchObjects";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  @Input('user')
  set setUser(user: User) {
    this.user = user;
  }

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input('categorySearchValues')
  set setCategorySearchValues(categorySearchValues: CategorySearchValues) {
    this.categorySearchValues = categorySearchValues;
  }

  @Input('selectedCategory')
  set setCategory(selectedCategory: Category) {
    this.selectedCategory = selectedCategory;
  }

  @Output()
  addCategoryEvent = new EventEmitter<Category>();
  @Output()
  updateCategoryEvent = new EventEmitter<Category>();
  @Output()
  deleteCategoryEvent = new EventEmitter<Category>();
  @Output()
  searchCategoryEvent = new EventEmitter<CategorySearchValues>();
  @Output()
  toggleMenuEvent = new EventEmitter();
  @Output()
  selectCategoryEvent = new EventEmitter<Category>();


  isMobile: boolean;
  categories: Category[];
  user: User;

  indexCategoryMouseOver: number;
  showEditIconCategoryIcon: boolean;

  searchTitle: string;
  filterChanged: boolean;
  categorySearchValues: CategorySearchValues;

  selectedCategory;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Category, string],
    private dialogBuilder: MatDialog,
    private translate: TranslateService,
    private deviceService: DeviceDetectorService,
  ) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit(): void {}

  openAddDialog(): void {

    this.dialogRef = this.dialogBuilder.open(EditCategoryDialogComponent, {
      data: [new Category(null, '', this.user), this.translate.instant('CATEGORY.ADDING')],
      width: '400px'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (!(result)) {
        return;
      }
      if (result.action === DialogAction.SAVE) {
        this.addCategoryEvent.emit(result.obj as Category);
      }
    });
  }

  updateEditIconVisible(show: boolean, index: number): void {
    this.showEditIconCategoryIcon = show;
    this.indexCategoryMouseOver = index;

    console.log(this.showEditIconCategoryIcon);
    console.log(this.indexCategoryMouseOver);
    console.log('-------');
  }

  openEditDialog(category: Category): void {
    this.dialogRef = this.dialogBuilder.open(EditCategoryDialogComponent, {
      data: [new Category(category.id, category.title, this.user), this.translate.instant('CATEGORY.EDITING')],
      width: '400px'
    });

    this.dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.DELETE) {
        this.deleteCategoryEvent.emit(category);
      }

      if (result.action === DialogAction.SAVE) {
        this.updateCategoryEvent.emit(result.obj as Category);
      }
    });
  }

  clearAndSearch(): void {
    this.searchTitle = null;
    this.search();
  }

  checkFilterChanged(): void {
    this.filterChanged = this.searchTitle !== this.categorySearchValues.title;
  }

  search(): void {
    this.filterChanged = false;

    if (!this.categorySearchValues) {
      return;
    }

    this.categorySearchValues.title = this.searchTitle;
    this.searchCategoryEvent.emit(this.categorySearchValues);
  }

  checkEmpty(): void {
    if (this.searchTitle.trim().length === 0) {
      this.search();
    }
  }

  toggleMenu(): void {
    this.toggleMenuEvent.emit();
  }

  showCategory(category: Category): void {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;
    this.selectCategoryEvent.emit(this.selectedCategory);
  }
}
