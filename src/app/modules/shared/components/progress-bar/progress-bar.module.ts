import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './progress-bar.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [ProgressBarComponent],
  imports     : [
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
],
exports     : [
    ProgressBarComponent
]
})
export class ProgressBarModule { }
