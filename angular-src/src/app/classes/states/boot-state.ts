import  *  as Phaser from 'phaser-ce';

export class BootState extends Phaser.State {

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
        level_text = this.game.cache.getText("level1");
        level_data = JSON.parse(level_text);
        this.game.state.start("LoadingState", true, false, level_data);
    };
}
