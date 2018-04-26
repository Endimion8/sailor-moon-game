import  *  as Phaser from 'phaser-ce';
import { Player } from './player';
import { PlayerModule } from './player/player.module';

export class Mars extends PlayerModule {
    mars_texture: any;

    constructor(game_state, position, properties, texture_name, itsMe) {
        super(game_state, position, properties, 'player_spritesheet2', itsMe);

        this.animations.add("mars_walking", [4, 5, 6, 7, 8, 9], 6, true);
        this.animations.add("mars_idol", [0, 1, 2, 3], 6, true);

        this.walking_anim = 'mars_walking';
        this.idol_anim = 'mars_idol';

        this.weapon = this.createWeapon(this, 'mars_bullet');
    }

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