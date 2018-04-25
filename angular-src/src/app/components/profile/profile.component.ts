import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import {SocketService} from '../../services/socket.service';

interface PlayersObject {
  playersIDs: Array<Number>;
  playersNames: Array<string>;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  players: PlayersObject = {
    playersIDs: [],
    playersNames:[]
  };  // Содержит всех активных пользователей
  playersNames: Array<string> = [];



  constructor(private authService:AuthService, private router:Router, private socketService: SocketService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {  //  Получаем данные о самом пользователе, в том числе и приватные
      this.user = profile.user;
    },
     err => {
       console.log('Ошибочка');
       console.log(err);
       return false;
     });

     this.socketService.onNewPlayer().subscribe(playerInfo => {
       this.addNewPlayer(playerInfo);
     });

     this.socketService.onAllPlayers().subscribe( playersArr => {
      console.log('AllPlayers:');
       for (let i = 0; i < playersArr.length; i++) {
         this.addNewPlayer(playersArr[i]);
         console.log(playersArr[i]);
       }
     });

     this.socketService.onRemovePlayer().subscribe(playerID => {
      this.removePlayer(playerID);
     });

     this.socketService.askAllPlayers();
  }

  addNewPlayer(playerInfoObj) {
    this.players.playersIDs.push(playerInfoObj.id);
    this.players.playersNames.push(playerInfoObj.name);
    this.playersNames = this.players.playersNames;
   // this.addPlayerToView(playerInfoObj.name);
  }

  removePlayer(playerID) {
    delete this.players.playersNames[this.players.playersIDs.indexOf(playerID)];
    delete this.players.playersIDs[this.players.playersIDs.indexOf(playerID)];
  }

  addPlayerToView(playerName) {
    console.log(playerName);
    const ul = document.getElementById('activePlayers');
    if (ul) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = playerName;
      ul.appendChild(li);
    }
    

  }

}