import { Component, OnInit, OnDestroy } from '@angular/core';
import  *  as Phaser from 'phaser-ce';
import { Player } from '../../classes/prefabs/player';
import { Enemy } from '../../classes/prefabs/enemy';
import { FlyingEnemy } from '../../classes/prefabs/flying-enemy';
import { Goal } from '../../classes/prefabs/goal';

import 'phaser-tilemap-plus';

import {SocketService} from '../../services/socket.service';
import { Mercury } from '../../classes/prefabs/mercury';
import { Mars } from '../../classes/prefabs/mars';
import { TiledStateModule } from '../../classes/states/tiled-state/tiled-state.module';
import { LoadingStateModule } from '../../classes/states/loading-state/loading-state.module';
import { BootStateModule } from '../../classes/states/boot-state/boot-state.module';

//import { BootState } from '../../classes/states/boot-state';
//import { LoadingState } from '../../classes/states/loading-state';
//import { TiledState } from '../../classes/states/tiled-state';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  title = 'Angular Phaser';

  game: Phaser.Game;
  //client: any;      
 // playerMap: any;

  constructor(private socketService: SocketService) {
    this.game = new Phaser.Game(1920, 768, Phaser.AUTO, 'game-area');  // 480, 280
  }

  ngOnInit() {
    this.game.state.add("BootState", new BootStateModule());
    this.game.state.add("LoadingState", new LoadingStateModule());
    this.game.state.add("GameState", new TiledStateModule(this.socketService));
    this.game.state.start("BootState", true, false, "assets/levels/level1.json");
  }

  ngOnDestroy() {
    this.game.destroy();
    this.socketService.askToRemoveAsGame();
  }

}

