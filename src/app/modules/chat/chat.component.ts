import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Formbase } from '../shared/components/formbase/formbase';
import { FormbaseService } from '../shared/services/formbase.service';
import { SseService } from '../shared/services/sse.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('drawer') drawer: MatSidenav;
  formBase: Formbase<string>[] = [];
  form: FormGroup;
  layout: any

  drawerevnt: Boolean = false;

  data: any[];
  messages: any = [];
  message: string;

  bodydata = [
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
      "contactChat":[],
      "chatDate": "1/12/2020",
      "created": "2021-01-27T15:04:01.496Z",
      "__v": 0,
      "id": "601180e128d90332b8ee5535",
      "updateby": ""
    }
  ]

  constructor(private httpClient: HttpClient, private formBaseService: FormbaseService, public ChatService: ChatService, private SseService: SseService) { }

  ngOnInit(): void {
    this.data = this.ChatService.getUserdata();
    console.log(this.data)

    this.ChatService.getServerEventSource('http://localhost:3000/events')
      .subscribe((chat) => {
        // console.log(JSON.parse(chat.data));
        let data = JSON.parse(chat.data);
        // console.log(data);
        // this.messages = data;
        // console.log(this.messages)
        if(data.lenght > 0){
          data.forEach(chatSend => {
            this.bodydata[0].contactChat.push(chatSend);
          });
          this.messages = this.bodydata[0].contactChat;
        }else{
          this.messages.push(data);
        }
      });

  }

  sendMessage() {
    let body = {
      "messaging_type": "RESPONSE",
      "recipient": {
        "id": "4006048746106422"
      },
      "message": {
        "text": this.message
      }
    }
    console.log(this.message);

    this.ChatService.sendData(body).then(() => {
      this.message ='';
      // this.ChatService.getServerEventSource('http://localhost:3000/events')
      //   .subscribe((chat) => {
      //     let data = JSON.parse(chat.data);
      //     this.messages = data;
      //   });
    })
  }

  toggle(el) {
    this.drawerevnt = el;
    console.log(this.drawerevnt);
    this.drawer.toggle();
  }

}
