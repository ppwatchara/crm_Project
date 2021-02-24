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

  constructor(private httpClient: HttpClient, private formBaseService: FormbaseService, public ChatService: ChatService, private SseService: SseService) { }

  ngOnInit(): void {
    this.data = this.ChatService.getUserdata();
    console.log(this.data)

    this.ChatService.getServerEventSource('http://localhost:3000/events')
      .subscribe((chat) => {
        console.log(JSON.parse(chat.data));
        let data = JSON.parse(chat.data);
        console.log(data);
        this.messages = data;
        console.log(this.messages)


        // if (data.type === 'qrSes') {
        //   console.log(data);
        //   this.qr = `/qrlogin/v1/qr/${data.value}`
        //   console.log(this.qr);
        // }
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
      this.ChatService.getServerEventSource('http://localhost:3000/events')
        .subscribe((chat) => {
          let data = JSON.parse(chat.data);
          this.messages = data;
        });
    })
  }

  toggle(el) {
    this.drawerevnt = el;
    console.log(this.drawerevnt);
    this.drawer.toggle();
  }

}
