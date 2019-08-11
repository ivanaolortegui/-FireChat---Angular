import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { logging } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private _cs : ChatService) { }

  ngOnInit() {
  }
  signIn(provider:string){
  this._cs.login(provider)
  }
}
