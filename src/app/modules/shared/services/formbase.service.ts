import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Formbase } from '../components/formbase/formbase';

@Injectable({
  providedIn: 'root'
})
export class FormbaseService implements Resolve<any> {
  private layoutChanged$ = new BehaviorSubject<any[]>([]);
  public layoutchangeObservable$ = this.layoutChanged$.asObservable();
  private layouts: any[];
  private lovGethered$ = new BehaviorSubject<any>({});
  public lovGetheredObservable$ = this.lovGethered$.asObservable();
  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.parent.data.layouts)
    this.layouts = route.parent.data.layouts;
    this.getLayouts();
    return
  }

  toFormGroup(frmCtls: Formbase<any>[], frmData?: any): FormGroup {
    const group: any = {};

    frmCtls.forEach(ctl => {
      // console.log(ctl);
      if (ctl.controlType === 'lookup') {
        this.getLov(ctl);
      };
      if (ctl.controlType === 'multiselect' && ctl.lov && ctl.lov !== '') {
        console.log(ctl.key)
        this.getLov(ctl);
      };
      if (ctl.controlType === 'checkbox') {
        ctl.value = ctl.value || false;
      };


      if (!frmData) {
        group[ctl.key] = new FormControl(ctl.value || '', this.bindValidations(ctl));

      } else {

        group[ctl.key] = ctl.required ? new FormControl(frmData[ctl.key] || '', Validators.required)
          : new FormControl(frmData[ctl.key] || '');

      }

    });
    return new FormGroup(group);
  }
  
  bindValidations(ctl: any) {
    const validList = [];
    if (ctl.required) {
      validList.push(Validators.required);
    }
    if (ctl.min) {
      validList.push(Validators.min(ctl.min));
    }
    if (ctl.max) {
      validList.push(Validators.max(ctl.max));
    }
    if (ctl.minLength) {
      validList.push(Validators.minLength(ctl.minLength));
    }
    if (ctl.maxLength) {
      validList.push(Validators.maxLength(ctl.maxLength));
    }
    if (ctl.pattern) {
      validList.push(Validators.pattern(ctl.pattern));
    }
    if (ctl.type === 'email') {
      validList.push(Validators.pattern(
        "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
      ));
    }
    return Validators.compose(validList);
  }

  getLayouts(): void {
    this.httpClient.get(`${environment.apiUrl}api/layouts`)
      .pipe(
        map((layouts: any[]) => {
          if (this.layouts) {
            console.log(this.layouts);
            return layouts.filter(layout => this.layouts.includes(layout.key))
          } else {
            return layouts;
          }

        })
      )
      .subscribe((layouts: any[]) => {
        // console.log(JSON.stringify(layouts));
        this.layoutChanged$.next(layouts.sort((a, b) => a.order - b.order));
      })
  }
  getLov(ctl: any): void {
    // console.log(ctl.lov);
    this.httpClient.get(`${environment.apiUrl}api/lov-${ctl.lov}`)
      .subscribe((data: any) => {
        // console.log(data);
        this.lovGethered$.next({ key: ctl.key, data: data });
      });
  }
}
