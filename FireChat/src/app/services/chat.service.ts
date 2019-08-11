import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {map} from 'rxjs/operators';

import { Message } from '../interface/message';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

private itemsCollection : AngularFirestoreCollection<Message>
public chats : Message[]=[];
public user : any ={};

  constructor( private  afs : AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log('Usuario es',user);
      if(!user){
        return;
      }
      this.user = user;
    })
   }

  login(provider:string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  
  loadMessage(){
    this.itemsCollection= this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc')
                                                                          .limit(8));
    return this.itemsCollection.valueChanges()
      .pipe(map((item : Message[]) => {
                                          this.chats=item;
                                          this.chats=[];
                                          for(let message of item){
                                            this.chats.unshift(message)
                                          }
                                          return this.chats;
                                        }));
  }

  addMessage(text: string){
    let message : Message = {
      name: 'Demo' ,
      message: text,
      date: new Date().getTime()
      //uid: string;
    }
    return this.itemsCollection.add(message)
  }
}
