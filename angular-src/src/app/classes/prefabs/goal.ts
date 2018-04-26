import  *  as Phaser from 'phaser-ce';
import { Prefab } from './prefab';

export class Goal extends Prefab {

    next_level: any;

    constructor(game_state, position, properties, texture_name) {
    super(game_state, position, properties, texture_name);
        
        this.next_level = properties.next_level;
        
        this.game_state.game.physics.arcade.enable(this);
        
        this.anchor.setTo(0.5);
    };
    
    update() {
        this.game_state.game.physics.arcade.collide(this, this.game_state.layers.Ground);
        this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this);
    };
    
    reach_goal() {
        // start the next level
        this.game_state.game.state.start("BootState", true, false, this.next_level);
    };
}
