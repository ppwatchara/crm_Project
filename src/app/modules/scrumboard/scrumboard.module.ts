import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrumboardComponent } from './scrumboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { FuseMaterialColorPickerModule } from '../shared/directives/material-color-picker/material-color-picker.module';
import { FuseConfirmDialogModule } from '../shared/components/confirm-dialog/confirm-dialog.module';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './board/list/list.component';
import { CardComponent } from './board/list/card/card.component';
import { AddCardComponent } from './board/list/add-card/add-card.component';
import { EditListNameComponent } from './board/list/edit-list-name/edit-list-name.component';
import { AddListComponent } from './board/add-list/add-list.component';
import { DialogsComponent } from './board/dialogs/dialogs.component';
import { EditBoardNameComponent } from './board/edit-board-name/edit-board-name.component';
import { LabelSeletorComponent } from './board/dialogs/label-seletor/label-seletor.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { ScrumboardService } from './scrumboard.service';


const routes: Routes = [
  {
    path: '',
    component: ScrumboardComponent,
    resolve  : {
        scrumboard: ScrumboardService
    }
  },
  // {
  //     path     : 'boards/:boardId/:boardUri',
  //     component: ScrumboardBoardComponent,
  //     resolve  : {
  //         board: BoardResolve
  //     }
  // },
  // {
  //   path: '**',
  //   redirectTo: 'scrumbord'
  // }
];

@NgModule({
  declarations: [
    ScrumboardComponent, 
    BoardComponent, 
    ListComponent, 
    CardComponent, 
    AddCardComponent, 
    EditListNameComponent, 
    AddListComponent, 
    DialogsComponent, 
    EditBoardNameComponent, 
    LabelSeletorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTooltipModule,

    RouterModule.forChild(routes),

    NgxDnDModule,

    FuseConfirmDialogModule,
    FuseMaterialColorPickerModule
  ]
})
export class ScrumboardModule { 
}
