import  *  as Phaser from 'phaser-ce';
import { Player } from '../prefabs/player';
import { Enemy } from '../prefabs/enemy';
import { FlyingEnemy } from '../prefabs/flying-enemy';
import { Goal } from '../prefabs/goal';

export class TiledState extends Phaser.State {

    client: any;
    playerMap: any;

    constructor() {
        super()
       // this.client = new Client(this)
        this.playerMap = {}
    }

    level_data: any;
    map: any;
    layers: any;
    groups: any;
    prefabs: any;

    init(level_data) {
        this.level_data = level_data;
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        // start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        
        // create map and set tileset
        this.map = this.game.add.tilemap(level_data.map.key);
        this.map.addTilesetImage(this.map.tilesets[0].name, level_data.map.tileset);
    };
    
    create() {
        let group_name;
        let object_layer;
        let collision_tiles;
        
        // create map layers
        this.layers = {};
        this.map.layers.forEach(function (layer) {
            this.layers[layer.name] = this.map.createLayer(layer.name);
            if (layer.properties.collision) { // collision layer
                collision_tiles = [];
                layer.data.forEach(function (data_row) { // find tiles used in the layer
                    data_row.forEach(function (tile) {
                        // check if it's a valid tile index and isn't already in the list
                        if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                            collision_tiles.push(tile.index);
                        }
                    }, this);
                }, this);
                this.map.setCollision(collision_tiles, true, layer.name);
            }
        }, this);
        // resize the world to be the size of the current layer
        this.layers[this.map.layer.name].resizeWorld();
        
        // create groups
        this.groups = {};
        this.level_data.groups.forEach(function (group_name) {
            this.groups[group_name] = this.game.add.group();
        }, this);
        
        this.prefabs = {};
        
        for (object_layer in this.map.objects) {
            if (this.map.objects.hasOwnProperty(object_layer)) {
                // create layer objects
                this.map.objects[object_layer].forEach(this.create_object, this);
            }
        }
    };
    
    create_object(object) {
        let position;
        let prefab;
        // tiled coordinates starts in the bottom left corner
        position = {"x": object.x + (this.map.tileHeight / 2), "y": object.y - (this.map.tileHeight / 2)};
        // create object according to its type
        switch (object.type) {
        case "player":
            prefab = new Player(this, position, object.properties);  // здесь будем отправлять запрос на сервер, чтобы создать объекты
            break;
        case "ground_enemy":
            prefab = new Enemy(this, position, object.properties); // на сервере проверим, были ли объекты уже созданы
            break;
        case "flying_enemy":
            prefab = new FlyingEnemy(this, position, object.properties);  // если да,то повторно создавать не будем
            break;
        case "goal":
            prefab = new Goal(this, position, object.properties);
            break;
        }
        this.prefabs[object.name] = prefab; // 
    };
    
    restart_level() {
        this.game.state.restart(true, false, this.level_data);
    };

    createPlayer() {   // будем вызывать, когда сервер попросит создать игрока

    }

    createObjects() { 

    }
}
