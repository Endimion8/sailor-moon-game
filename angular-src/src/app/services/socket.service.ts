import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import * as io from "socket.io-client";

import { AuthService } from './auth.service';

@Injectable()
export class SocketService {
    private url: string = '/';  // http://localhost:3000
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + 3000;
    private socket: any;

    constructor(private authService: AuthService) {
        // this.socket = io();  //this.host
        // this.socket.on("connect", () => this.connected());
        // this.socket.on("disconnect", () => this.disconnected());
        // this.socket.on("error", (error: string) => {
        //     console.log(`ERROR: "${error}" (${this.host})`);
        // });
    }
/* 
    connect () {
        this.socket.connect();
    }

    disconnect () {
        this.socket.disconnect();
    } */

    /* emit(chanel, data) {
        return new Observable<any>(observer => {
            console.log(`emit to ${chanel}: data`);
            this.socket.emit(chanel,(data) => {
                    observer.next(data);
            });
        });
    }
*/
    connect() {
      this.socket = io(this.url);  //this.host
      console.log('Connect');
    }

    on(event_name) {
        console.log(`listen to ${event_name}:`);
        return new Observable<any>(observer => {
            this.socket.off(event_name);
            this.socket.on(event_name, (data) => {
                observer.next(data);
            });
        });
    } 
/* 
    private connected() {
        console.log('Connected');
    }

    private disconnected() {
        console.log('Disconnected');
    } */

    onNewPlayer() {                 // Подписываемся на событие с сервера, что залогинился новый пользователь
      return this.on('newPlayer');
    }

    onRemovePlayer() {              // Подписываемся на событие с сервера, что другой пользователь разлогинился
      return this.on('removePlayer');
    }

    onAllPlayers() {               // Подписываемся на событие с сервера, чтобы получить всех активных пользователей при подключении
      return this.on('allPlayers');
    }

    askNewPlayer() {              // Когда логинимся, делаем запрос на добавление нас к активным пользователям
      this.authService.getProfile().subscribe(profile => {
        let playerInfo = {name: profile.user.name};
        console.log(playerInfo);
        this.socket.emit('askNewPlayer', playerInfo);
        console.log('Запрос на логин отправлен');
      },
       err => {
         console.log(err);
         return false;
       });
    }

    askAllPlayers() {       
      this.socket.emit('askAllPlayers');
      console.log('Попросили всех активных');
    }

    askToRemoveAs() {       // Когда разлогинимся, попросим сервер удалить нас из списка активных
      this.socket.emit('askToRemove', 'myMessage');
    }


}