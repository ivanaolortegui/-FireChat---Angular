import { Component, OnInit } from '@angular/core';


import { ChatService } from '../../services/chat.service';
import { Message } from '../../interface/message';
import { element } from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  message: string = '';
  element:any;

  constructor( private _css:ChatService) { 
    this._css.loadMessage().subscribe((message: Message[])=>{
      console.log(message);
      setTimeout(()=>{
        this.element.scrollTop = this.element.scrollHeight;
      },20)
      
    })
  }
 
  ngOnInit(){
    this.element= document.getElementById('app-message');
  }
  sendMessage(){
  
    if(this.message.length === 0){
      return;
    }

    this._css.addMessage(this.message)
      .then(()=> this.message = '')
      .catch((error)=> console.log(error))
    console.log(this.message);
    
  }
}
