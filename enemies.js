let enemies = {
    config,
    status,
    getEnemiesBodies: [],
    enemiesMainPoint: [],
    renderEnemiesInterval: null,
    newEnemyInterval: null,
    destroyedEnemy: [],

    attack() {
        if (this.status.isPlaying()) {
            this.newEnemyInterval = setInterval(() => this.addNewEnemy(), 2000);
            this.renderEnemiesInterval = setInterval(() => this.renderEnemiesBodies(), 500);
            ship.startIntervalShot();
        }
    },

    stoppingAttack() {
        if (this.status.isStopped() || this.status.isFinished()) {
            clearInterval(this.newEnemyInterval);
            clearInterval(this.renderEnemiesInterval);
            clearInterval(ship.renderBulletInterval);
        }
    },

    getRandomPoint(min, max) {
        // Объясни, плз, как это работает
        let mainPointEnemy = {x: Math.floor(Math.random() * (max - min)) + min, y: 0};
        this.enemiesMainPoint.push(mainPointEnemy);
    },

    addNewEnemy() {
        this.getRandomPoint(1, this.config.colsCount - 1);
    },

    renderEnemiesBodies() {
        // +1 и -1 - это отступы от краёв на размер enemy
        //this.getRandomPoint(0, this.config.colsCount - 1);
        this.purePaintingEnemiesBodies();
        // массив врагов
        if (this.enemiesMainPoint[0].y + 2 < this.config.rowsCount) {
            for (let i = 0; i < this.enemiesMainPoint.length; i++) {
                // массив точек конкретного врага
                this.getEnemiesBodies[i] = [];
                this.enemiesMainPoint[i].y += 1;
                this.getEnemiesBodies[i].push(this.enemiesMainPoint[i]);
                this.getEnemiesBodies[i].push({
                    x: this.getEnemiesBodies[i][0].x,
                    y: this.getEnemiesBodies[i][0].y - 1
                });
                this.getEnemiesBodies[i].push({
                    x: this.getEnemiesBodies[i][0].x,
                    y: this.getEnemiesBodies[i][0].y + 1
                });
                this.getEnemiesBodies[i].push({
                    x: this.getEnemiesBodies[i][0].x - 1,
                    y: this.getEnemiesBodies[i][0].y
                });
                this.getEnemiesBodies[i].push({
                    x: this.getEnemiesBodies[i][0].x + 1,
                    y: this.getEnemiesBodies[i][0].y
                });
            }
        } else {
            this.getEnemiesBodies.shift();
            this.enemiesMainPoint.shift();
        }
        this.paintingEnemiesBodies();
        this.destroyingShip();
        console.log(this.getEnemiesBodies);
    },

    destroyingShip() {
        for (let i = 0; i < this.getEnemiesBodies.length; i++) {
            for (let j = 0; j < this.getEnemiesBodies[i].length; j++) {
                ship.getShipBody.forEach(function (value) {
                    if (value.x === enemies.getEnemiesBodies[i][j].x && value.y === enemies.getEnemiesBodies[i][j].y) {
                        let destroyingPoint = document.getElementById(
                            `x${enemies.getEnemiesBodies[i][j].x}_y${enemies.getEnemiesBodies[i][j].y}`
                        );
                        destroyingPoint.setAttribute('class', 'destroying-ship');
                        game.finish();
                        // Здесь есть баг: если враг наехал на корабль двумя клетками, то game.finish() сработает два раза =>
                        // выдаст два алерта.
                    }
                });
            }
        }
    },

    destroyingEnemy() {
        for (let i = 0; i < this.getEnemiesBodies.length; i++) {
            for (let j = 0; j < this.getEnemiesBodies[i].length; j++) {
                ship.bullet.forEach(function (value, index) {
                    if (value.x === enemies.getEnemiesBodies[i][j].x && value.y === enemies.getEnemiesBodies[i][j].y) {
                        enemies.destroyedEnemy.push(enemies.getEnemiesBodies[i]);
                        enemies.pureDestroyingEnemy();
                        enemies.destroyedEnemy.pop();
                        enemies.getEnemiesBodies.splice(i, 1);
                        enemies.enemiesMainPoint.splice(i, 1);
                        ship.bullet.splice(index, 1);
                    }
                });
            }
        }
    },

    paintingEnemiesBodies() {
        for (let i = 0; i < this.getEnemiesBodies.length; i++) {
            for (let j = 0; j < this.getEnemiesBodies[i].length; j++) {
                let nextPointEnemy = document.getElementById(
                    `x${this.getEnemiesBodies[i][j].x}_y${this.getEnemiesBodies[i][j].y}`
                );
                nextPointEnemy.setAttribute('class', 'enemy-body');
            }
        }
    },

    pureDestroyingEnemy() {
        for (let i = 0; i < this.destroyedEnemy.length; i++) {
            for (let j = 0; j < this.destroyedEnemy[i].length; j++) {
                let bodyCell = '';
                Object.values(this.destroyedEnemy[i][j]).forEach(function (point) {
                    if (bodyCell === '') {
                        bodyCell = `x${point}_`;
                    } else {
                        bodyCell += `y${point}`;
                        bodyCell = document.getElementById(bodyCell);
                        bodyCell.setAttribute('class', 'cell');
                    }
                });
            }
        }
    },

    purePaintingEnemiesBodies() {
        for (let i = 0; i < this.getEnemiesBodies.length; i++) {
            for (let j = 0; j < this.getEnemiesBodies[i].length; j++) {
                let bodyCell = '';
                Object.values(this.getEnemiesBodies[i][j]).forEach(function (point) {
                    if (bodyCell === '') {
                        bodyCell = `x${point}_`;
                    } else {
                        bodyCell += `y${point}`;
                        bodyCell = document.getElementById(bodyCell);
                        bodyCell.setAttribute('class', 'cell');
                    }
                });
            }
        }
    },
};