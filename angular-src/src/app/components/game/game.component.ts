import { Component, OnInit, OnDestroy } from '@angular/core';
import  *  as Phaser from 'phaser-ce';
import { BootState } from '../../classes/states/boot-state';
import { LoadingState } from '../../classes/states/loading-state';
import { TiledState } from '../../classes/states/tiled-state';

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

  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-area');
  }

  ngOnInit() {
    this.game.state.add("BootState", new BootState());
    this.game.state.add("LoadingState", new LoadingState());
    this.game.state.add("GameState", new TiledState());
    this.game.state.start("BootState", true, false, "assets/levels/level1.json");
  }

  ngOnDestroy() {
    this.game.destroy();
  }

}
