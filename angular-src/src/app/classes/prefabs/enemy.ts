import  *  as Phaser from 'phaser-ce';
import { Prefab } from './prefab';

export class Enemy extends Prefab {

    walking_speed: any;
    walking_distance: any;
    previous_x: any;

    constructor (game_state, position, properties, texture_name) {
        super(game_state, position, properties, texture_name);
        
        this.walking_speed = +properties.walking_speed;
        this.walking_distance = +properties.walking_distance;
        
        // saving previous x to keep track of walked distance
        this.previous_x = this.x;
        
        this.game_state.game.physics.arcade.enable(this);
        this.body.velocity.x = properties.direction * this.walking_speed;
        
        this.scale.setTo(-properties.direction, 1);
        
        this.anchor.setTo(0.5);
    };
    
    update() {
        this.game_state.game.physics.arcade.collide(this, this.game_state.layers.Ground);
        
        // change the direction if walked the maximum distance
        if (Math.abs(this.x - this.previous_x) >= this.walking_distance) {
            this.body.velocity.x *= -1;
            this.previous_x = this.x;
            this.scale.setTo(-this.scale.x, 1);
        }
    };
}
