webpackJsonp([1,5],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(786);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SocketService = (function () {
    function SocketService(authService) {
        this.authService = authService;
        this.url = '/'; // http://localhost:3000
        this.host = window.location.protocol + "//" + window.location.hostname + ":" + 3000;
        // this.socket = io();  //this.host
        // this.socket.on("connect", () => this.connected());
        // this.socket.on("disconnect", () => this.disconnected());
        // this.socket.on("error", (error: string) => {
        //     console.log(`ERROR: "${error}" (${this.host})`);
        // });
    }
    /*
        connect () {
            this.socket.connect();
        }
    
        disconnect () {
            this.socket.disconnect();
        } */
    /* emit(chanel, data) {
        return new Observable<any>(observer => {
            console.log(`emit to ${chanel}: data`);
            this.socket.emit(chanel,(data) => {
                    observer.next(data);
            });
        });
    }
*/
    SocketService.prototype.connect = function () {
        this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__(this.url); //this.host
        console.log('Connect');
    };
    SocketService.prototype.on = function (event_name) {
        var _this = this;
        console.log("listen to " + event_name + ":");
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.off(event_name);
            _this.socket.on(event_name, function (data) {
                observer.next(data);
            });
        });
    };
    /*
        private connected() {
            console.log('Connected');
        }
    
        private disconnected() {
            console.log('Disconnected');
        } */
    SocketService.prototype.onNewPlayer = function () {
        return this.on('newPlayer');
    };
    SocketService.prototype.onRemovePlayer = function () {
        return this.on('removePlayer');
    };
    SocketService.prototype.onAllPlayers = function () {
        return this.on('allPlayers');
    };
    SocketService.prototype.askNewPlayer = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            var playerInfo = { name: profile.user.name };
            console.log(playerInfo);
            _this.socket.emit('askNewPlayer', playerInfo);
            console.log('Запрос на логин отправлен');
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    SocketService.prototype.askAllPlayers = function () {
        this.socket.emit('askAllPlayers');
        console.log('Попросили всех активных');
    };
    SocketService.prototype.askToRemoveAs = function () {
        this.socket.emit('askToRemove', 'myMessage');
    };
    SocketService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]) === 'function' && _a) || Object])
    ], SocketService);
    return SocketService;
    var _a;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/socket.service.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser_ce__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser_ce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser_ce__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Prefab; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Prefab = (function (_super) {
    __extends(Prefab, _super);
    function Prefab(game_state, position, properties) {
        _super.call(this, game_state.game, position.x, position.y, properties.texture);
        this.game_state = game_state;
        this.game_state.groups[properties.group].add(this);
    }
    ;
    return Prefab;
}(__WEBPACK_IMPORTED_MODULE_0_phaser_ce__["Sprite"]));
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/prefab.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prefab__ = __webpack_require__(230);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Enemy; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(game_state, position, properties) {
        _super.call(this, game_state, position, properties);
        this.walking_speed = +properties.walking_speed;
        this.walking_distance = +properties.walking_distance;
        // saving previous x to keep track of walked distance
        this.previous_x = this.x;
        this.game_state.game.physics.arcade.enable(this);
        this.body.velocity.x = properties.direction * this.walking_speed;
        this.scale.setTo(-properties.direction, 1);
        this.anchor.setTo(0.5);
    }
    ;
    Enemy.prototype.update = function () {
        this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
        // change the direction if walked the maximum distance
        if (Math.abs(this.x - this.previous_x) >= this.walking_distance) {
            this.body.velocity.x *= -1;
            this.previous_x = this.x;
            this.scale.setTo(-this.scale.x, 1);
        }
    };
    ;
    return Enemy;
}(__WEBPACK_IMPORTED_MODULE_0__prefab__["a" /* Prefab */]));
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/enemy.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.prototype.validateRegister = function (user) {
        if (user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ValidateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ValidateService);
    return ValidateService;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/validate.service.js.map

/***/ }),

/***/ 418:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 418;


/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(540);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/main.js.map

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_socket_service__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(socketService) {
        this.socketService = socketService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.socketService.connect();
        console.log('AppComponent OnInit');
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(742),
            styles: [__webpack_require__(734)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["a" /* SocketService */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/app.component.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_navbar_navbar_component__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_register_register_component__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard_component__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_profile_profile_component__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_game_game_component__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_validate_service__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_socket_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__ = __webpack_require__(554);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


















//import {FlashMessagesService} from 'angular2-flash-messages';
var appRouts = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_9__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_12__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'game', component: __WEBPACK_IMPORTED_MODULE_13__components_game_game_component__["a" /* GameComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuard */]] }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_game_game_component__["a" /* GameComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRouts),
                __WEBPACK_IMPORTED_MODULE_5_angular2_flash_messages__["FlashMessagesModule"]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_14__services_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_16__services_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuard */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/app.module.js.map

/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enemy__ = __webpack_require__(349);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlyingEnemy; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var FlyingEnemy = (function (_super) {
    __extends(FlyingEnemy, _super);
    function FlyingEnemy(game_state, position, properties) {
        _super.call(this, game_state, position, properties);
        // flying enemies are not affected by gravity
        this.body.allowGravity = false;
        this.animations.add("flying", [0, 1], 5, true);
        this.animations.play("flying");
    }
    ;
    return FlyingEnemy;
}(__WEBPACK_IMPORTED_MODULE_0__enemy__["a" /* Enemy */]));
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/flying-enemy.js.map

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prefab__ = __webpack_require__(230);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Goal; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Goal = (function (_super) {
    __extends(Goal, _super);
    function Goal(game_state, position, properties) {
        _super.call(this, game_state, position, properties);
        this.next_level = properties.next_level;
        this.game_state.game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
    }
    ;
    Goal.prototype.update = function () {
        this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
        this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this);
    };
    ;
    Goal.prototype.reach_goal = function () {
        // start the next level
        this.game_state.game.state.start("BootState", true, false, this.next_level);
    };
    ;
    return Goal;
}(__WEBPACK_IMPORTED_MODULE_0__prefab__["a" /* Prefab */]));
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/goal.js.map

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prefab__ = __webpack_require__(230);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Player; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game_state, position, properties) {
        _super.call(this, game_state, position, properties);
        this.walking_speed = +properties.walking_speed;
        this.jumping_speed = +properties.jumping_speed;
        this.bouncing = +properties.bouncing;
        this.game_state.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.animations.add("walking", [0, 1, 2, 1], 6, true);
        this.frame = 3;
        this.anchor.setTo(0.5);
        this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
    }
    ;
    Player.prototype.update = function () {
        this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
        this.game_state.game.physics.arcade.collide(this, this.game_state.groups.enemies, this.hit_enemy, null, this);
        if (this.cursors.right.isDown && this.body.velocity.x >= 0) {
            // move right
            this.body.velocity.x = this.walking_speed;
            this.animations.play("walking");
            this.scale.setTo(-1, 1);
        }
        else if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
            // move left
            this.body.velocity.x = -this.walking_speed;
            this.animations.play("walking");
            this.scale.setTo(1, 1);
        }
        else {
            // stop
            this.body.velocity.x = 0;
            this.animations.stop();
            this.frame = 3;
        }
        // jump only if touching a tile
        if (this.cursors.up.isDown && this.body.blocked.down) {
            this.body.velocity.y = -this.jumping_speed;
        }
        // dies if touches the end of the screen
        if (this.bottom >= this.game_state.game.world.height) {
            this.game_state.restart_level();
        }
    };
    ;
    Player.prototype.hit_enemy = function (player, enemy) {
        // if the player is above the enemy, the enemy is killed, otherwise the player dies
        if (enemy.body.touching.up) {
            enemy.kill();
            player.y -= this.bouncing;
        }
        else {
            this.game_state.restart_level();
        }
    };
    ;
    return Player;
}(__WEBPACK_IMPORTED_MODULE_0__prefab__["a" /* Prefab */]));
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/player.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser_ce__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser_ce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser_ce__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BootState; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var BootState = (function (_super) {
    __extends(BootState, _super);
    function BootState() {
        _super.apply(this, arguments);
    }
    BootState.prototype.init = function (level_file) {
        this.level_file = level_file;
    };
    ;
    BootState.prototype.preload = function () {
        this.load.text("level1", this.level_file);
    };
    ;
    BootState.prototype.create = function () {
        var level_text;
        var level_data;
        level_text = this.game.cache.getText("level1");
        level_data = JSON.parse(level_text);
        this.game.state.start("LoadingState", true, false, level_data);
    };
    ;
    return BootState;
}(__WEBPACK_IMPORTED_MODULE_0_phaser_ce__["State"]));
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/boot-state.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser_ce__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser_ce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser_ce__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingState; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var LoadingState = (function (_super) {
    __extends(LoadingState, _super);
    function LoadingState() {
        _super.apply(this, arguments);
    }
    LoadingState.prototype.init = function (level_data) {
        this.level_data = level_data;
    };
    ;
    LoadingState.prototype.preload = function () {
        var assets;
        var asset_loader;
        var asset_key;
        var asset;
        assets = this.level_data.assets;
        for (asset_key in assets) {
            if (assets.hasOwnProperty(asset_key)) {
                asset = assets[asset_key];
                switch (asset.type) {
                    case "image":
                        this.load.image(asset_key, asset.source);
                        break;
                    case "spritesheet":
                        this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                        break;
                    case "tilemap":
                        this.load.tilemap(asset_key, asset.source, null, __WEBPACK_IMPORTED_MODULE_0_phaser_ce__["Tilemap"].TILED_JSON);
                        break;
                }
            }
        }
    };
    ;
    LoadingState.prototype.create = function () {
        this.game.state.start("GameState", true, false, this.level_data);
    };
    ;
    return LoadingState;
}(__WEBPACK_IMPORTED_MODULE_0_phaser_ce__["State"]));
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/loading-state.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser_ce__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser_ce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser_ce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prefabs_player__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prefabs_enemy__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__prefabs_flying_enemy__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__prefabs_goal__ = __webpack_require__(542);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TiledState; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





var TiledState = (function (_super) {
    __extends(TiledState, _super);
    function TiledState() {
        _super.call(this);
        // this.client = new Client(this)
        this.playerMap = {};
    }
    TiledState.prototype.init = function (level_data) {
        this.level_data = level_data;
        this.scale.scaleMode = __WEBPACK_IMPORTED_MODULE_0_phaser_ce__["ScaleManager"].SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // start physics system
        this.game.physics.startSystem(__WEBPACK_IMPORTED_MODULE_0_phaser_ce__["Physics"].ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        // create map and set tileset
        this.map = this.game.add.tilemap(level_data.map.key);
        this.map.addTilesetImage(this.map.tilesets[0].name, level_data.map.tileset);
    };
    ;
    TiledState.prototype.create = function () {
        var group_name;
        var object_layer;
        var collision_tiles;
        // create map layers
        this.layers = {};
        this.map.layers.forEach(function (layer) {
            this.layers[layer.name] = this.map.createLayer(layer.name);
            if (layer.properties.collision) {
                collision_tiles = [];
                layer.data.forEach(function (data_row) {
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
    ;
    TiledState.prototype.create_object = function (object) {
        var position;
        var prefab;
        // tiled coordinates starts in the bottom left corner
        position = { "x": object.x + (this.map.tileHeight / 2), "y": object.y - (this.map.tileHeight / 2) };
        // create object according to its type
        switch (object.type) {
            case "player":
                prefab = new __WEBPACK_IMPORTED_MODULE_1__prefabs_player__["a" /* Player */](this, position, object.properties); // здесь будем отправлять запрос на сервер, чтобы создать объекты
                break;
            case "ground_enemy":
                prefab = new __WEBPACK_IMPORTED_MODULE_2__prefabs_enemy__["a" /* Enemy */](this, position, object.properties); // на сервере проверим, были ли объекты уже созданы
                break;
            case "flying_enemy":
                prefab = new __WEBPACK_IMPORTED_MODULE_3__prefabs_flying_enemy__["a" /* FlyingEnemy */](this, position, object.properties); // если да,то повторно создавать не будем
                break;
            case "goal":
                prefab = new __WEBPACK_IMPORTED_MODULE_4__prefabs_goal__["a" /* Goal */](this, position, object.properties);
                break;
        }
        this.prefabs[object.name] = prefab; // 
    };
    ;
    TiledState.prototype.restart_level = function () {
        this.game.state.restart(true, false, this.level_data);
    };
    ;
    TiledState.prototype.createPlayer = function () {
    };
    TiledState.prototype.createObjects = function () {
    };
    return TiledState;
}(__WEBPACK_IMPORTED_MODULE_0_phaser_ce__["State"]));
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/tiled-state.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(743),
            styles: [__webpack_require__(735)]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/dashboard.component.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_phaser_ce__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_phaser_ce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_phaser_ce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_states_boot_state__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_states_loading_state__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_states_tiled_state__ = __webpack_require__(546);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GameComponent = (function () {
    //client: any;      
    // playerMap: any;
    function GameComponent() {
        this.title = 'Angular Phaser';
        this.game = new __WEBPACK_IMPORTED_MODULE_1_phaser_ce__["Game"](800, 600, __WEBPACK_IMPORTED_MODULE_1_phaser_ce__["AUTO"], 'game-area');
    }
    GameComponent.prototype.ngOnInit = function () {
        this.game.state.add("BootState", new __WEBPACK_IMPORTED_MODULE_2__classes_states_boot_state__["a" /* BootState */]());
        this.game.state.add("LoadingState", new __WEBPACK_IMPORTED_MODULE_3__classes_states_loading_state__["a" /* LoadingState */]());
        this.game.state.add("GameState", new __WEBPACK_IMPORTED_MODULE_4__classes_states_tiled_state__["a" /* TiledState */]());
        this.game.state.start("BootState", true, false, "assets/levels/level1.json");
    };
    GameComponent.prototype.ngOnDestroy = function () {
        this.game.destroy();
    };
    GameComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-game',
            template: __webpack_require__(744),
            styles: [__webpack_require__(736)]
        }), 
        __metadata('design:paramtypes', [])
    ], GameComponent);
    return GameComponent;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/game.component.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(745),
            styles: [__webpack_require__(737)]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/home.component.js.map

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_socket_service__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = (function () {
    function LoginComponent(authService, router, flashMessage, socketService) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.socketService = socketService;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            username: this.username,
            password: this.password
        };
        this.authService.authenticateUser(user).subscribe(function (data) {
            if (data.success) {
                _this.authService.storeUserData(data.token, data.user);
                // добавляем себя к активным пользователям
                _this.socketService.askNewPlayer();
                _this.flashMessage.show('You are now logged in', {
                    cssClass: 'alert-success',
                    timeout: 5000 });
                _this.router.navigate(['dashboard']);
            }
            else {
                _this.flashMessage.show(data.msg, {
                    cssClass: 'alert-danger',
                    timeout: 5000 });
                _this.router.navigate(['login']);
            }
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(746),
            styles: [__webpack_require__(738)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_socket_service__["a" /* SocketService */]) === 'function' && _d) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/login.component.js.map

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_socket_service__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NavbarComponent = (function () {
    function NavbarComponent(authService, router, flashMessage, socketService) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.socketService = socketService;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.socketService.askToRemoveAs();
        this.authService.logout();
        this.flashMessage.show('You are logged out', {
            cssClass: 'alert-success',
            timeout: 3000
        });
        this.router.navigate(['/login']);
        return false;
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(747),
            styles: [__webpack_require__(739)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_socket_service__["a" /* SocketService */]) === 'function' && _d) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/navbar.component.js.map

/***/ }),

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_socket_service__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileComponent = (function () {
    function ProfileComponent(authService, router, socketService) {
        this.authService = authService;
        this.router = router;
        this.socketService = socketService;
        this.players = {
            playersIDs: [],
            playersNames: []
        }; // Содержит всех активных пользователей
        this.playersNames = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user;
        }, function (err) {
            console.log('Ошибочка');
            console.log(err);
            return false;
        });
        this.socketService.askAllPlayers();
        this.socketService.onNewPlayer().subscribe(function (playerInfo) {
            _this.addNewPlayer(playerInfo);
        });
        this.socketService.onAllPlayers().subscribe(function (playersArr) {
            for (var i = 0; i < playersArr.length; i++) {
                _this.addNewPlayer(playersArr[i]);
            }
        });
        this.socketService.onRemovePlayer().subscribe(function (playerID) {
            _this.removePlayer(playerID);
        });
    };
    ProfileComponent.prototype.addNewPlayer = function (playerInfoObj) {
        this.players.playersIDs.push(playerInfoObj.id);
        this.players.playersNames.push(playerInfoObj.name);
        this.playersNames = this.players.playersNames;
        // this.addPlayerToView(playerInfoObj.name);
    };
    ProfileComponent.prototype.removePlayer = function (playerID) {
        delete this.players.playersNames[this.players.playersIDs.indexOf(playerID)];
        delete this.players.playersIDs[this.players.playersIDs.indexOf(playerID)];
    };
    ProfileComponent.prototype.addPlayerToView = function (playerName) {
        console.log(playerName);
        var ul = document.getElementById('activePlayers');
        if (ul) {
            var li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = playerName;
            ul.appendChild(li);
        }
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(748),
            styles: [__webpack_require__(740)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_socket_service__["a" /* SocketService */]) === 'function' && _c) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/profile.component.js.map

/***/ }),

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
        };
        // Required Fields
        if (!this.validateService.validateRegister(user)) {
            this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Validate Email
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Register user
        this.authService.registerUser(user).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/register']);
            }
        });
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(749),
            styles: [__webpack_require__(741)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/register.component.js.map

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/auth.guard.js.map

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/environment.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/register', user, { headers: headers }) // http://localhost:3000/
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/authenticate', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('users/profile', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    AuthService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])('id_token');
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=D:/sailor-moon-game/angular-src/src/auth.service.js.map

/***/ }),

/***/ 734:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 735:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 736:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 737:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 738:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 739:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 740:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 741:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 742:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"container\">\n  <flash-messages></flash-messages>\n  <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ 743:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Dashboard</h2>\n<p>Welcome to your Dashboard!</p>\n\n"

/***/ }),

/***/ 744:
/***/ (function(module, exports) {

module.exports = "<div id=\"game-area\">\n  <p>Play the Game!</p>\n</div>\n"

/***/ }),

/***/ 745:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron text-center\">\n    <h1>MEAN Authentication App</h1>\n    <p class=\"lead\">Welcome to our custom MEAN authentication application built from scratch</p>\n    <div>\n      <a class=\"btn btn-primary\" [routerLink]=\"['/register']\">Register</a> <a class=\"btn btn-info\" [routerLink]=\"['/login']\">Login</a>\n    </div>\n  </div>\n  \n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <h3>Express Backend</h3>\n      <p>A rock solid Node.js/Express server using Mongoose to organize models and query the database</p>\n    </div>\n    <div class=\"col-md-4\">\n      <h3>Angular-CLI</h3>\n      <p>Angular-CLI to generate components, services and more. Local dev server and easy compilation</p>\n    </div>\n    <div class=\"col-md-4\">\n      <h3>JWT Tokens</h3>\n      <p>Full featured authentication using JSON web tokens. Login and store user data</p>\n    </div>\n  </div>"

/***/ }),

/***/ 746:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Login</h2>\n<form (submit)=\"onLoginSubmit()\">\n  <div class=\"form-group\">\n    <label>Username</label>\n    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"username\" name=\"username\">\n  </div>\n  <div class=\"form-group\">\n    <label>Password</label>\n    <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" name=\"password\">\n  </div>\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Login\">\n</form>"

/***/ }),

/***/ 747:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-md navbar-dark bg-primary steaky-top\">\n    <a class=\"navbar-brand\" href=\"#\">MEAN App</a>\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarsExampleDefault\" aria-controls=\"navbarsExampleDefault\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n      <span class=\"navbar-toggler-icon\"></span>\n    </button>\n\n    <div class=\"collapse navbar-collapse\" id=\"navbarsExampleDefault\">\n      <ul class=\"navbar-nav mr-auto\">\n        <li class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\">\n          <a class=\"nav-link\" [routerLink]=\"['/']\">Home <span></span></a>\n        </li>\n      </ul>\n      <ul class=\"navbar-nav ml-auto\">\n        <li class=\"nav-item\" *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\">\n          <a class=\"nav-link\" [routerLink]=\"['/dashboard']\">Dashboard </a>\n        </li>\n        <li class=\"nav-item\" *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\">\n          <a class=\"nav-link\" [routerLink]=\"['/profile']\">Profile </a>\n        </li>\n        <li class=\"nav-item\" *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\">\n          <a class=\"nav-link\" [routerLink]=\"['/login']\">Login </a>\n        </li>\n        <li class=\"nav-item\" *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\">\n          <a class=\"nav-link\" [routerLink]=\"['/register']\">Register</a>\n        </li>\n        <li class=\"nav-item\" *ngIf=\"authService.loggedIn()\">\n          <a class=\"nav-link\" (click)=\"onLogoutClick()\" href=\"#\">Logout</a>\n        </li>\n        <li class=\"nav-item\" *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\">\n            <a class=\"nav-link\" [routerLink]=\"['/game']\">Game </a>\n          </li>\n      </ul>\n    </div>\n  </nav>\n"

/***/ }),

/***/ 748:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\">\n    <h2 class=\"page-header\">{{user.name}}</h2>\n    <ul class=\"list-group\">\n      <li class=\"list-group-item\">Username : {{user.username}}</li>\n      <li class=\"list-group-item\">Email : {{user.email}}</li>\n        <li class=\"list-group-item\" *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\">\n            <a class=\"nav-link\" [routerLink]=\"['/game']\">Game </a>\n        </li>\n    </ul>\n    <h2>Активные пользователи</h2>\n    <ul class=\"list-group\" id='activePlayers' >\n      <li class=\"list-group-item\" *ngFor=\"let playerName of players.playersNames \">{{playerName}}</li>\n      <!-- <li class=\"list-group-item\">{{players.playersNames}}</li> -->\n    </ul>\n  </div>"

/***/ }),

/***/ 749:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Register</h2>\n<form (submit)=\"onRegisterSubmit()\">\n  <div class=\"form-group\">\n    <label>Name</label>\n    <input type=\"text\" [(ngModel)]=\"name\" name=\"name\" class=\"form-control\">\n  </div>\n  <div class=\"form-group\">\n    <label>Username</label>\n    <input type=\"text\" [(ngModel)]=\"username\" name=\"username\" class=\"form-control\">\n  </div>\n  <div class=\"form-group\">\n    <label>Email</label>\n    <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" class=\"form-control\" >\n  </div>\n  <div class=\"form-group\">\n    <label>Password</label>\n    <input type=\"password\" [(ngModel)]=\"password\" name=\"password\" class=\"form-control\">\n  </div>\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\">\n</form>"

/***/ }),

/***/ 794:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(419);


/***/ })

},[795]);
//# sourceMappingURL=main.bundle.map