import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {Category} from "../../../data/model/Category";
import {DialogAction, DialogResult} from "../../../object/DialogResult";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})

export class EditCategoryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Category, string],
    private dialogBuilder: MatDialog,
    private translate: TranslateService
  ) {
  }

  dialogTitle: string;
  category: Category;
  canDelete = false;

  ngOnInit(): void {

    this.category = this.data[0];
    this.dialogTitle = this.data[1];

    if (this.category && this.category.id && this.category.id > 0) {
      this.canDelete = true;
    }
  }

  confirm(): void {

    if (!this.category.title || this.category.title.trim().length === 0){
      return;
    }

    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.category));
  }

  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }


}
