export default class Scorer {
    
    constructor() {
        this.ball = 0;
        this.itsThrows = [];
        this.itsCurrentThrow = 0;

        for (let n = 0; n < 21; n++) this.itsThrows[n] = 0;
    }

    addThrow(pins) {
        this.itsThrows[this.itsCurrentThrow++] = pins;
    }

    scoreForFrame(frame) {
        this.ball = 0;
        let score = 0;
        for (let currentFrame = 0; currentFrame < frame; currentFrame++) {
            if (this._strike()) {
                score += 10 + this._nextTwoBallsForStrike();
                this.ball++;
            } else if (this._space()) {
                score += 10 + this._nextBallForSpare();
                this.ball += 2;
            } else {
                score += this._twoBallsInFrame();
                this.ball += 2;
            }
        }

        return score;
    }

    _strike() {
        return this.itsThrows[this.ball] === 10;
    }

    _space() {
        return (this.itsThrows[this.ball] + this.itsThrows[this.ball + 1]) === 10;
    }

    _nextTwoBallsForStrike() {
        return this.itsThrows[this.ball + 1] + this.itsThrows[this.ball + 2];
    }

    _nextBallForSpare() {
        return this.itsThrows[this.ball + 2];
    }

    _twoBallsInFrame() {
        return this.itsThrows[this.ball] + this.itsThrows[this.ball + 1];
    }
}
