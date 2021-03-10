import { Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Animations } from 'src/app/modules/shared/animations';
import { Utils } from 'src/app/modules/shared/utils';
import { ScrumboardService } from '../../../scrumboard.service';

@Component({
  selector: 'app-label-seletor',
  templateUrl: './label-seletor.component.html',
  styleUrls: ['./label-seletor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Animations
})
export class LabelSeletorComponent implements OnInit, OnDestroy {

  @Input('card')
    card: any;

    @Output()
    cardLabelsChanged: EventEmitter<any>;

    board: any;
    labelsMenuView: string;
    selectedLabel: any;
    newLabel: any;
    toggleInArray: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ScrumboardService} _scrumboardService
     */
    constructor(
        private _scrumboardService: ScrumboardService
    )
    {
        // Set the defaults
        this.cardLabelsChanged = new EventEmitter();
        this.labelsMenuView = 'labels';
        this.newLabel = {
            'id'   : '',
            'name' : '',
            'color': 'blue-400'
        };
        this.toggleInArray = Utils.toggleInArray;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._scrumboardService.onBoardChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(board => {
                this.board = board;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Card labels changed
     */
    onCardLabelsChanged(): void
    {
        this.cardLabelsChanged.next();
    }

    /**
     * On label change
     */
    onLabelChange(): void
    {
        this._scrumboardService.updateBoard();
    }

    /**
     * Add new label
     */
    addNewLabel(): void
    {
        this.newLabel.id = Utils.generateGUID();
        this.board.labels.push(Object.assign({}, this.newLabel));
        this.newLabel.name = '';
        this.labelsMenuView = 'labels';
    }

}
