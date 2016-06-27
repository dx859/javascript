import Scorer from './Scorer';

export default class Game {
    
    constructor() {
        this.itsCurrentFrame = 0;
        this.firstThrowInFrame = true;
        this.itsScorer = new Scorer();
    }

    score() {
        return this.scoreForFrame(this.itsCurrentFrame);
    }

    add(pins) {
        this.itsScorer.addThrow(pins);
        this._adjustCurrentFrame(pins);
    }

    _adjustCurrentFrame(pins) {
        if (this._lastBallInFrame(pins))
            this._advanceFrame();
        else
            this.firstThrowInFrame = false;
    }

    _lastBallInFrame(pins) {
        return this._strike(pins) || !this.firstThrowInFrame;
    }

    _strike(pins) {
        return (this.firstThrowInFrame && pins === 10);
    }

    _advanceFrame() {
        this.itsCurrentFrame = Math.min(10, this.itsCurrentFrame+1);
    }

    scoreForFrame(frame) {
        return this.itsScorer.scoreForFrame(frame);
    }

}
