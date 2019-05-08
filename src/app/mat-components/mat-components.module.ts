import { NgModule } from '@angular/core';
import {  MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';

@NgModule({
    exports: [
      MatTableModule,
      MatSortModule,
      MatPaginatorModule
    ]
})
export class MatComponentsModule { }
