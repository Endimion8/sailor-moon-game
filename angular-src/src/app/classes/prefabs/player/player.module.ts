import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import  *  as Phaser from 'phaser-ce';
import { Prefab } from '../prefab';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class PlayerModule extends Prefab {

  walking_speed: any;
  jumping_speed: any;
  bouncing: any;
  cursors: any;
  weapon: any;
  fireButton: any;
  boolSpeed = 1500;
  walking_anim: string;
  idol_anim: string;
  bullet_sprite: string;
  istMe: boolean;

  constructor(game_state, position, properties, texture_name, itsMe) {
      super(game_state, position, properties, texture_name);

      this.istMe = itsMe;
      
      this.walking_speed = +properties.walking_speed;
      this.jumping_speed = +properties.jumping_speed;
      this.bouncing = +properties.bouncing;
      
      this.game_state.game.physics.arcade.enable(this);
      this.body.collideWorldBounds = true;

      this.body.setSize(35, 90, 35, 0);

      this.scale.setTo(0.6, 0.6);      
      
      this.anchor.setTo(0.5);
      
      this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
      this.fireButton = this.game_state.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  };

  update() {
      if (!this.istMe) {
          return;
        }
      this.game_state.game.physics.arcade.collide(this, this.game_state.layers.Ground);
      this.game_state.game.physics.arcade.collide(this, this.game_state.groups.enemies, this.hit_player, null, this);
      this.game_state.game.physics.arcade.overlap(this.weapon.bullets, this.game_state.groups.enemies, this.hit_enemy, null, this);
      
      if (this.cursors.right.isDown && this.body.velocity.x >= 0) {
          // move right
          this.body.velocity.x = this.walking_speed;
          this.animations.play(this.walking_anim);
          this.scale.setTo(0.6, 0.6);
          this.weapon.bulletSpeed = this.boolSpeed;
      } else if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
          // move left
          this.body.velocity.x = -this.walking_speed;
          this.animations.play(this.walking_anim);
          this.scale.setTo(-0.6, 0.6);
          this.weapon.bulletSpeed = -this.boolSpeed;
      } else {
          // stop
          this.body.velocity.x = 0;
          this.animations.play(this.idol_anim);
      }
      
      // jump only if touching a tile
      if (this.cursors.up.isDown && this.body.blocked.down) {
          this.body.velocity.y = -this.jumping_speed;
      }
      
      // dies if touches the end of the screen
      if (this.bottom >= this.game_state.game.world.height) {
          this.game_state.restart_level();
      }

      if (this.fireButton.isDown)
  {
      this.weapon.fire();
  }
  };
  
  hit_enemy(weapon, enemy) {
      console.log('попал');
      enemy.kill();
      weapon.kill();
  }

  hit_player(player, enemy) {
      this.game_state.restart_level();
  }

  
  /* hit_enemy(player, enemy) {
      // if the player is above the enemy, the enemy is killed, otherwise the player dies
      if (enemy.body.touching.up) {
          enemy.kill();
          player.y -= this.bouncing;
      } else {
          this.game_state.restart_level();
      }
   }; */

  createWeapon(playerObj, bullet_sprite) { 
      let weapon;
  
      weapon = this.game_state.add.weapon(10, bullet_sprite);
    //  The bullet will be automatically killed when it leaves the world bounds
      weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  
      //  The speed at which the bullet is fired
      weapon.bulletSpeed = this.boolSpeed;
  
      //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
      weapon.fireRate = 500;
  
      weapon.trackSprite(playerObj, 35, 0, true);

      return weapon;
  
    }
}

