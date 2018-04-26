import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class LoadingStateModule extends Phaser.State {

  level_data: any;

  init(level_data) {
      this.level_data = level_data;
  };
  
  preload() {

    this.load.image('mercury_bullet', 'assets/images/mercury_bullet.png');
    this.load.image('mars_bullet', 'assets/images/mars_bullet.png');



      let assets;
      let asset_loader;
      let asset_key;
      let asset;
      assets = this.level_data.assets;
      for (asset_key in assets) { // load assets according to asset key
          if (assets.hasOwnProperty(asset_key)) {  //итерируемся только по собственным свойствам объекта
              asset = assets[asset_key];
              switch (asset.type) {
              case "image":
                  this.load.image(asset_key, asset.source);
                  break;
              case "spritesheet":
                  this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                  break;
              case "tilemap":
                  this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                  break;
              }
          }
      }
  };
  
  create() {
      this.game.state.start("GameState", true, false, this.level_data);
  };
}
