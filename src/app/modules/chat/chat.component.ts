import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Formbase } from '../shared/components/formbase/formbase';
import { FormbaseService } from '../shared/services/formbase.service';
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

  constructor(private formBaseService: FormbaseService ,public Chatservice: ChatService) { }

  ngOnInit(): void {
    this.data = this.Chatservice.getUserdata();
    console.log(this.data)
  }

  onAddNew(): void {
    this.formBase = this.layout.forms ? this.layout.forms : [];
    this.form = this.formBaseService.toFormGroup(this.formBase);
    this.drawer.toggle();

  }

  toggle(el) {
    this.drawerevnt = el;
    console.log(this.drawerevnt);
    this.drawer.toggle();
  }

}
