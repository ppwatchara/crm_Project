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
import { BoardResolve, ScrumboardService } from './scrumboard.service';
import { MatChipsModule } from '@angular/material/chips';
import { SettingsComponent } from './board/settings/settings.component';
import { BoardColorSelectorComponent } from './board/settings/board-color-selector/board-color-selector.component';



const routes: Routes = [
  {
    path: '',
    component: ScrumboardComponent,
    resolve: {
      scrumboard: ScrumboardService
    }
  },
  {
    path: 'boards/:boardId/:boardUri',
    component: BoardComponent,
    resolve: {
      board: BoardResolve
    }
  },
  {
    path: '**',
    redirectTo: 'boards'
  }
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
    LabelSeletorComponent,
    SettingsComponent,
    BoardColorSelectorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTooltipModule,
    MatChipsModule,
    // FuseProgressBarModule,



    RouterModule.forChild(routes),

    NgxDnDModule,

    FuseConfirmDialogModule,
    FuseMaterialColorPickerModule,
   
  ],
  providers: [
    ScrumboardService,
    BoardResolve
  ],
  entryComponents: [DialogsComponent]
})
export class ScrumboardModule {
}
