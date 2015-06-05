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
