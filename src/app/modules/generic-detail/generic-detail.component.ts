import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Formbase } from '../shared/components/formbase/formbase';
import { FormbaseService } from '../shared/services/formbase.service';
import { GenericDetailModule } from './generic-detail.module';
import { GenericDetailService } from './generic-detail.service';

@Component({
  selector: 'app-generic-detail',
  templateUrl: './generic-detail.component.html',
  styleUrls: ['./generic-detail.component.scss']
})
export class GenericDetailComponent implements OnInit {

  @ViewChild('drawer') drawer: MatSidenav;
  formBase: Formbase<string>[] = [];
  form: FormGroup;
  layouts$: Observable<any[]>;
  layouts: any[];
  layout: any;
  search = '';

  private _unsubscribeall: Subject<any>;

  constructor(private formBaseService: FormbaseService, public genericDetailService: GenericDetailService, private router: Router, private location: Location) {
    this._unsubscribeall = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeall.next();
    this._unsubscribeall.complete();
  }

  ngOnInit(): void {
    this.genericDetailService.layoutChangedObservable$
      .pipe(
        takeUntil(this._unsubscribeall)
      )
      .subscribe((layouts) => {
        this.layouts = layouts;
        if (layouts && layouts.length > 0) {
          this.selectChanged(0);
        }
      })
  }

  // UI Events
  selectChanged(index: number): void {
    this.layout = this.layouts[index];
    this.formBase = this.layout?.forms || [];
    this.formBase.forEach(ctl => {
      if (this.genericDetailService.lookupFields.includes(ctl.key)) {
        ctl.value = this.genericDetailService.relateId;
        ctl.controlType = null;
        // ctl.lov = this.genericDetailService.relateModule;
        // ctl.disabled = true;
      }
    })

    this.form = this.formBaseService.toFormGroup(this.formBase);

    // อ่านข้อมูลมาแสดงในตาราง
    this.genericDetailService.getListData(this.layout.apiUrl);
  }

  tabChanged(event): void {
    this.selectChanged(event.index);
  }

  onAddNew(): void {
    this.formBase = this.layout.forms ? this.layout.forms : [];
    this.form = this.formBaseService.toFormGroup(this.formBase);
    this.drawer.toggle();

  }

  onEdit(row): void {
    // console.log(row);
    this.genericDetailService.getDataByID(this.layout.apiUrl, row.id)
      .subscribe((data) => {
        this.formBase = this.layout.forms ? this.layout.forms : [];
        this.form = this.formBaseService.toFormGroup(this.formBase, data);
        this.drawer.toggle();
      });

  }

  onClone(row): void {
    this.genericDetailService.getDataByID(this.layout.apiUrl, row.id)
      .subscribe((data) => {
        this.formBase = this.layout.forms ? this.layout.forms : [];
        data.id = "";
        this.form = this.formBaseService.toFormGroup(this.formBase, data);
        this.drawer.toggle();
      });
  }

  onSubmit(): void {
    const payLoad = this.form.getRawValue();

    const id = payLoad.id;
    if (payLoad) {
      this.genericDetailService.updateData(this.layout.apiUrl, payLoad).subscribe(recsult => {
        if (this.layout.haveDetail) {
          if (id) {
            this.drawer.toggle();
          } else {
            this.drawer.toggle();
            // this.router.navigateByUrl(`${this.layout.key}/${recsult.id}`);
          }

        } else {
          this.drawer.toggle();
        }

      })
    }
  }

  onDelete(row): void {
    this.genericDetailService.deleteData(this.layout.apiUrl, row.id);
  }

  onDetail(row): void {
    if (this.layout.haveDetail) {
      this.router.navigateByUrl(`${this.layout.key}/${row.id}`);
    } else {
      this.onEdit(row);
    }

  }

  goBack(): void {
    this.location.back();
  }
}
