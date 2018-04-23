import  *  as Phaser from 'phaser-ce';

export class Prefab extends Phaser.Sprite {

    game_state: any;

    constructor (game_state, position, properties) {
        super(game_state.game, position.x, position.y, properties.texture);
        
        this.game_state = game_state;
        
        this.game_state.groups[properties.group].add(this);
    };
}
