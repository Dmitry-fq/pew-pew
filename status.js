let status = {
    condition: 'readyToStart',

    //Это пока не надо, но если накручивать фичи, то пригодится
    setReadyToStart() {
        this.condition = 'readyToStart'
    },

    setPlaying() {
        this.condition = 'playing'
    },

    setStopped() {
        this.condition = 'stopped'
    },

    setFinished() {
        this.condition = 'finished'
    },

    isPlaying() {
        return this.condition === 'playing'
    },

    isStopped() {
        return this.condition === 'stopped'
    },

    isFinished() {
        return this.condition === 'finished'
    },

    isReadyToStart() {
        return this.condition === 'readyToStart'
    }

};