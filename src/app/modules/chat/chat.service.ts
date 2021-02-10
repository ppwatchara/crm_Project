import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements Resolve<any> {

  private layoutChanged$ = new BehaviorSubject<any[]>([]);
  public layoutChangedObservable$ = this.layoutChanged$.asObservable();
  private onDataChanged$ = new BehaviorSubject<any[]>([]);
  public onDataChangedObservable$ = this.onDataChanged$.asObservable();
  layouts: any[];
  apiUrl: string = `${environment.apiUrl}api`;

  constructor(private httpClient: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.getUserdata();
    return;
  }

  getLayouts(dataLayouts: string[]): any {
    this.httpClient.get(`${this.apiUrl}/layouts`)
      .pipe(
        map((layouts: any) => {
          if (dataLayouts) {
            // console.log(layouts);
            // console.log(layouts.filter(layout => dataLayouts.includes(layout.key)))
            return layouts.filter(layout => dataLayouts.includes(layout.key))

          } else {
            return layouts;
          }
        })
      )
      .subscribe((layouts: any[]) => {
        console.log(layouts);
        this.layouts = layouts;
        // console.log(this.layouts);
        this.getListData(this.layouts[0].apiUrl);
        // console.log(this.layouts[0].apiUrl);
        this.layoutChanged$.next(layouts.sort((a, b) => a.order - b.order));
      })

  }

  getListData(layoutApiUrl: string, pageIndex?: number, pageSize?: number): void {
    // console.log(layoutApiUrl);
    this.httpClient.get(`${this.apiUrl}/${layoutApiUrl}`)

      .subscribe((data: any) => {
        console.log(data);
        this.onDataChanged$.next(data);
      })
  }


  getUserdata() {

    let body = [
      {
        "createby": "Theerasak Tubrit",
        "_id": "601180e128d90332b8ee5535",
        "contactName": "watcharapong",
        "contactImg": "https://scontent.fbkk13-2.fna.fbcdn.net/v/t1.0-9/134913096_3530000260440242_7114700459074630105_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeFelJSEvEL715OyqHxVuF9qe62trROoDGV7ra2tE6gMZQ3zqRGd4FoQaVvM7yMVdAoE6epsYKTydGplRLVUCmyh&_nc_ohc=791vf3mzxFAAX_NypbP&_nc_ht=scontent.fbkk13-2.fna&oh=0daafb52ffaf727923e529b171aa9ba1&oe=60410BF6",
        "contactCompany": "บริษัท ละมุนภัณฑ์ เทรดดิ้ง จำกัด",
        "contactPhoneNo": "0623235361",
        "contactEmail": "pee.ch2014@gmail.com",
        "contactLineId": "ppwatchara",
        "contactAddress": "65-1",
        "chat": "สวัสดี",
        "chatDate": "1/12/2020",
        "created": "2021-01-27T15:04:01.496Z",
        "__v": 0,
        "id": "601180e128d90332b8ee5535",
        "updateby": ""
      },
      {
        "createby": "Theerasak Tubrit",
        "_id": "6011843e28d90332b8ee554b",
        "contactName": "arm",
        "contactImg": "https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-9/130930240_2268645413270564_2729494356080553767_n.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGhEmIPirhKwQWHjdza1etoRQXa9IWucuxFBdr0ha5y7JQJvcGcZFsRZ4_AjmAo2HIMsI371MpSmFyVFA7CktZP&_nc_ohc=wnuvk6ACiwQAX9g5CoX&_nc_ht=scontent.fbkk12-3.fna&oh=5287a7f4779c0a82a1c19ffcd7e33880&oe=60405363",
        "contactCompany": "บริษัท ละมุนภัณฑ์ เทรดดิ้ง จำกัด",
        "contactPhoneNo": "0922223569",
        "contactEmail": "pee.ch2014@gmail.com",
        "contactLineId": "cxcxc",
        "contactAddress": "sss",
        "chat": "Hello",
        "chatDate": "12/1/2020",
        "created": "2021-01-27T15:18:22.289Z",
        "__v": 0,
        "id": "6011843e28d90332b8ee554b",
        "updateby": ""
      }
    ]
    return body;
  }

}
