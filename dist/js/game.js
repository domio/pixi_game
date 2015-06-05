(function (window, PIXI, document) {
    window.game = {};
    document.addEventListener('DOMContentLoaded', ready, false);
    function ready() {
        var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x1099bb, antialias: true, autoResize: true});
        window.game.renderer = renderer;
        renderer.view.style.display = "block";
        renderer.view.style.margin = "auto";
        document.body.appendChild(renderer.view);
        var stage = new PIXI.Container();
        var bunny = new window.game.Bunny(stage, 200, 200);
        stage.addChild(bunny.getSprite());

        animate();
        function animate() {
            requestAnimationFrame(animate);
            // render the container
            bunny.move();
            renderer.render(stage);
        }

    }
}(window, window.PIXI, document));


(function (window) {
    window.keyboard = function (keyCode) {
        var key = {};
        key.codes = (_.isArray(keyCode)) ? keyCode : [keyCode];
        key.codes = key.codes.map(function(item){
            return _.isString(item) ? getKey(item) : item;
        });

        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;


        function getKey(key) {
            switch (key) {
                case 'SPACE':
                    return 32;
                case 'LEFT':
                    return  37;
                case 'UP':
                    return  38;
                case 'RIGHT':
                    return  39;
                case 'DOWN':
                    return 40;
                default:
                    // Convert ASCII codes to letters
                    return  key.toUpperCase().charCodeAt(0);
            }
        }

        //The `downHandler`
        key.downHandler = function (event) {
            if (key.codes.indexOf(event.keyCode) !== -1) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = function (event) {
            if (key.codes.indexOf(event.keyCode) !== -1) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
            }
            event.preventDefault();
        };

        //Attach event listeners
        window.addEventListener(
            "keydown", key.downHandler.bind(key), false
        );
        window.addEventListener(
            "keyup", key.upHandler.bind(key), false
        );
        return key;
    }
}(window));

(function (window, PIXI) {
    var Bullet = function (stage, x, y, vector) {
        var texture = PIXI.Texture.fromImage('/assets/heart.png');
        this.sprite = new PIXI.Sprite(texture);
        this.speed = 4;
        this.sprite.interactive = true;
        this.sprite.position.set(x, y);
    };

    Bullet.prototype = Object.create({

    });
    window.game.Bullet = Bullet;
}(window, window.PIXI));

(function (window, PIXI, keyboard, Math, vec2, Bullet) {
    /**
     * @class Bunny
     * @param PIXI
     * @param x
     * @param y
     * @constructor
     */

    var mousePos = null;
    var normalizedVector = vec2.create();
    var Bunny = function (stage, x, y) {
        var texture = PIXI.Texture.fromImage('/assets/bunny.png');
        this.sprite = new PIXI.Sprite(texture);
        this.speed = 4;
        this.sprite.interactive = true;
        this.vx = 0;
        this.bullets = [];
        this.vy = 0;
        this.stage = stage;
        this.sprite.background = "#ccc";
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.position.set(x, y);
        this.sprite.mousemove = function(e){
            mousePos = vec2.fromValues(e.data.global.x, e.data.global.y);
            var spritePos = vec2.fromValues(this.sprite.x, this.sprite.y),
                dist = vec2.create();


            vec2.subtract(dist, spritePos, mousePos);
            vec2.normalize(normalizedVector, dist);

            this.sprite.rotation = Math.atan2(dist[1],dist[0]);
            this.sprite.rotation += Math.atan2(1, 0);
        }.bind(this);

        window.game.renderer.view.addEventListener('click', function(e){
            this.shoot();
        }.bind(this));


        this.initKeyboard();
    };

    Bunny.prototype = Object.create({
        getSprite: function () {
            return this.sprite;
        },
        move: function () {
            if(this.sprite.x + this.vx > 0){
                this.sprite.x += this.vx;
            }
            if(this.sprite.y + this.vy > 0){
                this.sprite.y += this.vy;
            }
        },
        shoot: function(){
            this.bullets.push(new window.game.Bullet(this.stage, this.sprite.x, this.sprite.y, normalizedVector));
        },
        initKeyboard: function () {
            var left  = keyboard(['a', 'LEFT']),
                up    = keyboard(['w', 'UP']),
                right = keyboard(['d', 'RIGHT']),
                down  = keyboard(['s', 'DOWN']);

            left.press = function () {
                this.vx = -this.speed;
            }.bind(this);

            left.release = function () {
                if (!right.isDown) {
                    this.vx = 0;
                }
            }.bind(this);

            right.press = function () {
                this.vx = this.speed;
            }.bind(this);

            right.release = function () {
                if (!left.isDown) {
                    this.vx = 0;
                }
            }.bind(this);

            up.press = function () {
                this.vy = -this.speed;
            }.bind(this);

            up.release = function () {
                if (!down.isDown) {
                    this.vy = 0;
                }
            }.bind(this);

            down.press = function () {
                this.vy = this.speed;
            }.bind(this);

            down.release = function () {
                if (!up.isDown) {
                    this.vy = 0;
                }
            }.bind(this);
        }
    });

    window.game.Bunny = Bunny;
}(window,  window.PIXI, window.keyboard, window.Math, window.vec2));
