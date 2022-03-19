import {Component, Inject, Input, OnInit} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {User} from '../../../../auth/service/auth.service';
import {Category} from "../../../data/model/Category";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogAction} from "../../../object/DialogResult";
import {
  EditCategoryDialogComponent
} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {TranslateService} from "@ngx-translate/core";

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

  isMobile: boolean;
  categories: Category[];
  user: User;

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
        console.log(result);
      }
    });
  }
}
