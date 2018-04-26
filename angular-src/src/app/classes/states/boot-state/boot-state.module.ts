import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class BootStateModule extends Phaser.State {

  level_file: any;

  init(level_file) {
      this.level_file = level_file;
  };

  preload() {
      this.load.text("level1", this.level_file);
  };

  
  create() {
      let level_text; 
      let level_data;

     
      // scale the game 2x
     // this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;  
     // this.scale.setUserScale(2, 2);

      // enable crisp rendering
      this.game.renderer.renderSession.roundPixels = true;  
      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);


      level_text = this.game.cache.getText("level1");
      level_data = JSON.parse(level_text);
      this.game.state.start("LoadingState", true, false, level_data);
  };
}