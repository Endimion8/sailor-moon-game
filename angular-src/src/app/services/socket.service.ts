import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { AuthService } from './auth.service';

/**
 * Сервис, реализующий взаимодействие пользователей. Дорабатываю.
 */

@Injectable()
export class SocketService {
    private url = 'http://localhost:3000';
    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + 8080;
    private socket: any;

    userID: any;

    constructor(private authService: AuthService) {
    }

    connect() {
      this.socket = io(this.host);
      this.socket.on('disconnect', () => {  // При дисконнекте будем просить удалить нас из активных
        if (!this.authService.user) { // Если мы не залогиненные, то ничего не делаем
            return;
        };
        this.socket.emit('askToRemove');
        this.socket.emit('askToRemoveGame');
      });
      console.log('Socket connects');
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

    // Подписываемся на событие с сервера, что залогинился новый пользователь
    onNewPlayer() {                 
      return this.on('newPlayer');
    }

    // Подписываемся на событие с сервера, что другой пользователь разлогинился
    onRemovePlayer() {              
      return this.on('removePlayer');
    }

    // Подписываемся на событие с сервера, чтобы получить всех активных пользователей при подключении
    onAllPlayers() {               
      return this.on('allPlayers');
    }

    // Делаем запрос на добавление нас к активным пользователям
    askNewPlayer() {     
        //  Получаем данные о самом пользователе, в том числе и приватные         
        this.authService.getProfile().subscribe(profile => {  
            if (!profile.user) { 
                  return;
                };

                this.userID = profile.user._id;
                const playerInfo = {name: profile.user.name, id: profile.user._id};
                this.socket.emit('askNewPlayer', playerInfo);
          },
           err => {
             console.log(err);
             return false;
           });
      
    }

    askAllPlayers() {
      this.socket.emit('askAllPlayers');
    }

    // Когда разлогинимся, попросим сервер удалить нас из списка активных
    askToRemoveAs() {       
    }

    askNewPlayerGame(start_pos) {
        this.socket.emit('askNewPlayerGame', start_pos);
    }

    // Подписываемся на событие с сервера, что вошел новый игрок
    onNewPlayerGame() {                 
        return this.on('newPlayerGame');
      }

      // Подписываемся на событие с сервера, чтобы получить всех активных пользователей при подключении
    onAllPlayersGame() {               
      return this.on('allPlayersGame');
    }

    // Когда выходим из вкладки с игрой, попросим сервер удалить нас из списка активных
    askToRemoveAsGame() {
        this.socket.emit('askToRemoveGame');
      }

    // Подписываемся на событие с сервера, что другой игрок вышел из игры
    onRemovePlayerGame() {              
      return this.on('removePlayerGame');
    }

}