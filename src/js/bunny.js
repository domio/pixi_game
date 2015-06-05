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
