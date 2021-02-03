import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('drawer') drawer:MatSidenav;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.drawer.toggle()
  }

}
