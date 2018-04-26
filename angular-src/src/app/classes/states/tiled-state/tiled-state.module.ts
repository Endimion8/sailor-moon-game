import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SocketService} from '../../../services/socket.service';

import  *  as Phaser from 'phaser-ce';
import { Mars } from '../../prefabs/mars';
import { Enemy } from '../../prefabs/enemy';
import { FlyingEnemy } from '../../prefabs/flying-enemy';
import { Goal } from '../../prefabs/goal';
import { Mercury } from '../../prefabs/mercury';

interface PlayersObject {
  playersIDs: Array<any>;
  playersObj: Array<any>;
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class TiledStateModule extends Phaser.State { 

  start_pos: any;
  start_x = 94.5;
  start_y = 599;
  player_properties = {
    "bouncing":"20",
    "group":"players",
    "jumping_speed":"550",
    "walking_speed":"200"
   };

   players: PlayersObject = {
    playersIDs: [],
    playersObj:[]
  };  // Содержит всех активных игроков

  constructor(private socketService: SocketService) {
      super()
  }

  level_data: any;
  map: any;
  layers: any;
  groups: any;
  prefabs: any;

  init(level_data) {
      this.level_data = level_data;
      
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      
      // start physics system
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 1000;
      
      // create map and set tileset
      this.map = this.game.add.tilemap(level_data.map.key);
      this.map.addTilesetImage(this.map.tilesets[0].name, level_data.map.background_tileset);
      this.map.addTilesetImage(this.map.tilesets[1].name, level_data.map.ground_tileset);

      this.start_pos = {"x": this.start_x + (this.map.tileHeight / 2), "y": this.start_y - (this.map.tileHeight / 2)};

      this.socketService.askNewPlayerGame(this.start_pos);

      this.socketService.onNewPlayerGame().subscribe( (playerInfo) => {
        this.addNewPlayerGame(playerInfo);
      });

      this.socketService.onAllPlayersGame().subscribe( (playersArr) => {
        console.log('AllPlayersGame:');
       for (let i = 0; i < playersArr.length; i++) {
         this.addNewPlayerGame(playersArr[i]);
         console.log(playersArr[i]);
       }
      });

      this.socketService.onRemovePlayerGame().subscribe(playerID => {
        this.removePlayerGame(playerID);
       });
  };
  
  create() {
      let group_name;
      let object_layer;
      let collision_tiles;

      this.camera.flash(0x000000);
      
      // create map layers
      this.layers = {};
      this.map.layers.forEach(function (layer) {
          this.layers[layer.name] = this.map.createLayer(layer.name);
          if (layer.properties.collision) { // collision layer
            console.log('col layer!');
              collision_tiles = [];
              layer.data.forEach(function (data_row) { // find tiles used in the layer
                  data_row.forEach(function (tile) {
                      // check if it's a valid tile index and isn't already in the list
                      if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                          collision_tiles.push(tile.index);
                      }
                  }, this);
              }, this);
              this.map.setCollision(collision_tiles, true, layer.name);
          }
      }, this);
      // resize the world to be the size of the current layer
      this.layers[this.map.layer.name].resizeWorld();
      
      // create groups
      this.groups = {};
      this.level_data.groups.forEach(function (group_name) {
          this.groups[group_name] = this.game.add.group();
      }, this);
      
      this.prefabs = {};
      
      for (object_layer in this.map.objects) {
          if (this.map.objects.hasOwnProperty(object_layer)) {
              // create layer objects
              this.map.objects[object_layer].forEach(this.create_object, this);
          }
      }

      // make the camera follow the sprite
      this.camera.follow(this.prefabs['player']);
      this.camera.lerp.setTo(0.1);
  };
  
  create_object(object) {
      let position;
      let prefab;
      // tiled coordinates starts in the bottom left corner
      position = {"x": object.x + (this.map.tileHeight / 2), "y": object.y - (this.map.tileHeight / 2)};

      // create object according to its type
      switch (object.type) {
      case "player":
          prefab = new Mars(this, this.start_pos, this.player_properties, '', true);  // здесь будем отправлять запрос на сервер, чтобы создать объекты
          break;
      case "ground_enemy":
          prefab = new Enemy(this, position, object.properties, object.properties.texture); // на сервере проверим, были ли объекты уже созданы
          break;
      case "flying_enemy":
          prefab = new FlyingEnemy(this, position, object.properties, object.properties.texture);  // если да,то повторно создавать не будем
          break;
      case "goal":
          prefab = new Goal(this, position, object.properties, object.properties.texture);
          break;
      }
      this.prefabs[object.name] = prefab; // 
  };
  
  restart_level() {
      this.socketService.askToRemoveAsGame();
      this.game.state.restart(true, false, this.level_data);
  };

  addNewPlayerGame(playerInfo) {   // будем вызывать, когда сервер попросит создать игрока
    console.log('Создаем игрока');
    console.log(playerInfo.id);
    if (this.socketService.userID == playerInfo.id) {
      this.players.playersIDs.push(playerInfo.id);
      this.players.playersObj.push(new Mars(this, this.start_pos, this.player_properties, '', true));
    } else {
      this.players.playersIDs.push(playerInfo.id);
      this.players.playersObj.push(new Mercury(this, this.start_pos, this.player_properties, '', false));
    }
  }

  removePlayerGame(playerID) {
    console.log('Удалили пользователя');
    this.players.playersObj[this.players.playersIDs.indexOf(playerID)].kill();

    console.log(this.players.playersObj[this.players.playersIDs.indexOf(playerID)]);

    if (this.players.playersObj[this.players.playersIDs.indexOf(playerID)]) {

      delete this.players.playersObj[this.players.playersIDs.indexOf(playerID)];
    }
    delete this.players.playersIDs[this.players.playersIDs.indexOf(playerID)];
    console.log(this.players.playersObj[this.players.playersIDs.indexOf(playerID)]);

  }
}
