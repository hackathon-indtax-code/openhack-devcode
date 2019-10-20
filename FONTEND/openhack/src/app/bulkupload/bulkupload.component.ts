import { Filemetadata } from './../filemetadata';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AppService } from '../app.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadComponent } from './upload/upload.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.css']
})
export class BulkuploadComponent implements OnInit {
  isEmptyValidateList = true;
  displayedColumns: string[] = [
    'position',
    'fileName',
    'validateStatus',
    'update',
    'delete'
  ];
  dataSource = new MatTableDataSource<Filemetadata>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private appService: AppService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getValidatedFilesData();
  }

  getValidatedFilesData() {
    this.appService.getValidatedFilesData().subscribe(
      (response: Filemetadata[]) => {
        this.dataSource.data = response as Filemetadata[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('Data : ' + response.toString);
      },
      error => console.log('error : ' + error),
      () => {
        console.log('completed');
      }
    );
  }

  openUploadDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '500px';
    dialogConfig.minWidth = '500px';
    const dialogRef = this.dialog.open(UploadComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log('Dialog output:', data);
      if (data && data.length > 0) {
        for (const item of data) {
          this.dataSource.data.push(item);
        }
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  deleteValidateFielData(validateFileObj) {
    this.appService.deleteValidateFielData(validateFileObj).subscribe(
      response => {
        let tempList = [];
        tempList = this.dataSource.data.splice(
          this.getIndexfromdataSource(validateFileObj.id),
          1
        );
        this.dataSource.data = [...this.dataSource.data];
        console.log(response);
      },
      error => console.log(error),
      () => {
        console.log('Delete completed');
      }
    );
  }

  deleteAllValidateFielData() {
    this.appService.deleteAllValidateFielData().subscribe(
      response => {
        console.log('complete data deleted');
        this.dataSource.data = [];
      },
      error => console.log('error in data deletion')
    );
  }

  getIndexfromdataSource(validateFileId) {
    let index = -1;
    if (this.dataSource.data && this.dataSource.data.length > 0) {
      index = this.dataSource.data.map(e => e.id).indexOf(validateFileId);
    }
    return index;
  }

  refresh() {
    this.changeDetectorRefs.detectChanges();
  }
}
