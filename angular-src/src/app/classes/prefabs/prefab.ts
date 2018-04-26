import  *  as Phaser from 'phaser-ce';

export class Prefab extends Phaser.Sprite {

    game_state: any;
    name: string;

    constructor (game_state, position, properties, texture_name) {
        super(game_state.game, position.x, position.y, texture_name);
        
        this.game_state = game_state;

        this.name = properties.name;
        
        this.game_state.groups[properties.group].add(this);
    };
}
