ship = {
    getShipBody: [],
    /**
     * x: выбор точки, чтобы разместить корабль по центру и округление, чтобы получилось целое число
     * y: 4 - отступ на размер корабля по вертикали, чтобы было где его отрисовать
     */
    shipMainPoint: {x: Math.floor(config.colsCount / 2), y: config.rowsCount - 4},
    move: null,
    bullet: [],
    renderBulletInterval: null,

    init() {
        this.renderShipBody();
        this.paintingBody();
    },
    renderShipBody() {
        this.getShipBody = [];
        this.getShipBody.push(this.shipMainPoint);
        this.getShipBody.push({x: this.getShipBody[0].x, y: this.getShipBody[0].y + 1});
        this.getShipBody.push({x: this.getShipBody[0].x, y: this.getShipBody[0].y + 2});
        this.getShipBody.push({x: this.getShipBody[0].x - 1, y: this.getShipBody[0].y + 2});
        this.getShipBody.push({x: this.getShipBody[0].x + 1, y: this.getShipBody[0].y + 2});
        this.getShipBody.push({x: this.getShipBody[0].x - 2, y: this.getShipBody[0].y + 3});
        this.getShipBody.push({x: this.getShipBody[0].x + 2, y: this.getShipBody[0].y + 3});
    },

    paintingBody() {
        for (let i = 0; i < this.getShipBody.length; i++) {
            let bodyCell = '';
            Object.values(this.getShipBody[i]).forEach(function (point) {
                if (bodyCell === '') {
                    bodyCell = `x${point}_`;
                } else {
                    bodyCell += `y${point}`;
                    bodyCell = document.getElementById(bodyCell);
                    bodyCell.setAttribute('class', 'ship-body');
                }
            });
        }
    },

    purePaintingBody() {
        for (let i = 0; i < this.getShipBody.length; i++) {
            let bodyCell = '';
            Object.values(this.getShipBody[i]).forEach(function (point) {
                if (bodyCell === '') {
                    bodyCell = `x${point}_`;
                } else {
                    bodyCell += `y${point}`;
                    bodyCell = document.getElementById(bodyCell);
                    bodyCell.setAttribute('class', 'cell');
                }
            });
        }
    },

    takeShot() {
        this.bullet.push({x: this.shipMainPoint.x, y: this.shipMainPoint.y - 1});
        console.log(this.bullet);
        for (let i = 0; i < this.bullet.length; i++) {
            let currentPointBullet = document.getElementById(`x${this.bullet[i].x}_y${this.bullet[i].y}`);
            currentPointBullet.setAttribute('class', 'bullet');
        }
        clearInterval(this.renderBulletInterval);
        this.startIntervalShot();
    },

    startIntervalShot() {
        this.renderBulletInterval = setInterval(() => this.paintingBullets(), 200);
    },

    paintingBullets() {
        for (let i = 0; i < this.bullet.length; i++) {
            if (this.bullet[i].y > 0) {
                let currentPointBullet = document.getElementById(`x${this.bullet[i].x}_y${this.bullet[i].y}`);
                currentPointBullet.setAttribute('class', 'cell');
                this.bullet[i].y = this.bullet[i].y - 1;
                let nextPointBullet = document.getElementById(`x${this.bullet[i].x}_y${this.bullet[i].y}`);
                nextPointBullet.setAttribute('class', 'bullet');
                enemies.destroyingEnemy();
            } else {
                document.getElementById(
                    `x${this.bullet[i].x}_y${this.bullet[i].y}`).setAttribute('class', 'cell'
                );
                this.bullet.shift();
            }
        }
    },

    changePointsShip() {
        switch (this.move) {
            case 'left':
                // Проверка на края поля, чтобы корабль не уехал за его пределы
                if (this.getShipBody[5].x > 0) {
                    return this.shipMainPoint.x = this.shipMainPoint.x - 1;
                }
                break;
            case 'right':
                // Проверка на края поля, чтобы корабль не уехал за его пределы
                if (this.getShipBody[6].x < config.colsCount - 1) {
                    return this.shipMainPoint.x = this.shipMainPoint.x + 1;
                }
                break;
            case 'fire':
                return this.takeShot();
                break;
        }
    },

    moveShip() {
        this.purePaintingBody();
        this.changePointsShip(this.move);
        this.renderShipBody();
        this.paintingBody();
    }
};