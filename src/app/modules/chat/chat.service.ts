import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { SseService } from '../shared/services/sse.service';
import { Observable } from 'rxjs';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient, private zone: NgZone, private ssService: SseService) { }
  getServerEventSource(url: string) {

    return Observable.create(observer => {
      const eventSource = this.ssService.getEventSource(url);
      console.log(eventSource);

      // eventSource.onopen = open => {
      //   console.log(open);
      //   this.zone.run(() => {
      //     observer.next(open);
      //   });
      // };

      eventSource.addEventListener("chat", event => {
        // console.log(event);
        this.zone.run(() => {
          observer.next(event);
        });
      })

      // eventSource.addEventListener("init", function (e) {
      //   console.log("Timestamp event Received.Ready State is " + e);
      // })

      eventSource.onmessage = event => {
        console.log(event);
        this.zone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = error => {
        console.log(error);
        this.zone.run(() => {
          observer.error(error);
        });
      };
    })
  }

  sendData(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:3000/sentevents', data).subscribe(res => {
        resolve(res)
      }, reject)
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
