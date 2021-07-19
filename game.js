let game = {
    config,
    renderer,
    ship,
    status,
    enemies,


    init() {
        this.renderer.renderField(this.config.rowsCount, this.config.colsCount);
        ship.init();
        this.setEventHandlers();
    },

    newGame() {
        this.status.setPlaying();
        let buttonNewGame = document.getElementById('new-game-button');
        buttonNewGame.textContent = 'Завершить игру';
        enemies.purePaintingEnemiesBodies();
        enemies.getEnemiesBodies = [];
        enemies.enemiesMainPoint = [];
        enemies.addNewEnemy();
        this.enemies.attack();
        ship.paintingBody();
    },

    play() {
        this.status.setPlaying();
        this.enemies.attack();
        let buttonPlay = document.getElementById('pause-button');
        buttonPlay.textContent = 'Пауза';
    },

    stop() {
        this.status.setStopped();
        let buttonPlay = document.getElementById('pause-button');
        buttonPlay.textContent = 'Продолжить';
        this.enemies.stoppingAttack();
    },

    finish() {
        this.status.setFinished();
        let buttonNewGame = document.getElementById('new-game-button');
        buttonNewGame.textContent = 'Новая игра';
        this.enemies.stoppingAttack();
        alert('Игра завершена!');
    },

    setEventHandlers() {
        let buttonNewGame = document.getElementById('new-game-button');
        buttonNewGame.onclick = function (event) {
            event.preventDefault();
            if (buttonNewGame.textContent === 'Новая игра') {
                game.newGame();
            } else if (buttonNewGame.textContent === 'Завершить игру') {
                game.finish();
            }
        };
        let buttonPlay = document.getElementById('pause-button');
        buttonPlay.onclick = function (event) {
            event.preventDefault();
            if (game.status.isStopped()) {
                game.play();
            } else if (game.status.isPlaying()) {
                game.stop()
            }
        };
        document.addEventListener('keydown', () => this.keyDownHandler(event));
    },

    /**
     * Обработчик событий keydown, перемещение и отрисовка корабля
     * @param event
     */
    keyDownHandler(event) {
        ship.move = this.getMoveByCode(event.code);
        if (event.code === 'Space') {
            ship.takeShot();
        } else {
            ship.moveShip();
        }

    },

    getMoveByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'Space':
                return 'fire';
            default:
                return '';
        }
    }
};

window.onload = function () {
    game.init();
};
