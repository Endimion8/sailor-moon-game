import  *  as Phaser from 'phaser-ce';
import { Enemy } from './enemy';

export class FlyingEnemy extends Enemy {

    constructor (game_state, position, properties, texture_name) {
        super(game_state, position, properties, texture_name);
        
        // flying enemies are not affected by gravity
        this.body.allowGravity = false;
        
        this.animations.add("flying", [0, 1], 5, true);
        this.animations.play("flying");
    };
}
