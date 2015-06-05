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
