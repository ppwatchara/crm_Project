import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout1Component } from './layout1.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [Layout1Component],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    SharedModule
  ],
  exports: [Layout1Component]
})
export class Layout1Module { }
