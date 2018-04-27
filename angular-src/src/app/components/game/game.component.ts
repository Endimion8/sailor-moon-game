import { Component, OnInit, OnDestroy } from '@angular/core';
import { Enemy } from '../../classes/prefabs/enemy';
import { FlyingEnemy } from '../../classes/prefabs/flying-enemy';
import { Goal } from '../../classes/prefabs/goal';


import {SocketService} from '../../services/socket.service';
import { Mercury } from '../../classes/prefabs/mercury';
import { Mars } from '../../classes/prefabs/mars';
import { TiledStateModule } from '../../classes/states/tiled-state/tiled-state.module';
import { LoadingStateModule } from '../../classes/states/loading-state/loading-state.module';
import { BootStateModule } from '../../classes/states/boot-state/boot-state.module';


/**
 * Компонент, отвечающий за игру. В нем на элементе canvas отрисовывается игра.
 */

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Phaser.Game;

  constructor(private socketService: SocketService) {
    this.game = new Phaser.Game(960, 560, Phaser.AUTO, 'game-area');
  }

  ngOnInit() {
    this.game.state.add("BootState", new BootStateModule());
    this.game.state.add("LoadingState", new LoadingStateModule());
    this.game.state.add("GameState", new TiledStateModule(this.socketService));
    this.game.state.start("BootState", true, false, "assets/levels/level1.json");
  }

  ngOnDestroy() {
    this.socketService.askToRemoveAsGame();
    this.game.destroy();
  }

}

