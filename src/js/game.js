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

