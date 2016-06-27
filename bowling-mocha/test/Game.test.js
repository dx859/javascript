import Game from './Game';
import { assert } from 'chai';

describe('Game', () => {
    let g;

    beforeEach(() => {
        g = new Game();
    });

    it('testScoreNoThrows', () => {
        assert.equal(0, g.score());
    });

    it('testTwoThrowsNoMark', () => {
        g.add(5);
        g.add(4);
        assert.equal(9, g.score());
    });

    it('testFourThrowsNoMark', () => {
        g.add(5);
        g.add(4);
        g.add(7);
        g.add(2);
        assert.equal(18, g.score());
        assert.equal(9, g.scoreForFrame(1));
        assert.equal(18, g.scoreForFrame(2));
    });

    it('testSimpleSpare', () => {
        g.add(3);
        g.add(7);
        g.add(3);
        assert.equal(13, g.scoreForFrame(1));
    });

    it('testSimpleFrameAfterSpare', () => {
        g.add(3);
        g.add(7);
        g.add(3);
        g.add(2);
        assert.equal(13, g.scoreForFrame(1));
        assert.equal(18, g.scoreForFrame(2));
        assert.equal(18, g.score(2));
    });

    it('test 10 Score', () => {
        g.add(10);
        g.add(3);
        g.add(6);
        assert.equal(19, g.scoreForFrame(1));
        assert.equal(28, g.score());
    });

    it('testPerfectGame', () => {
        for (let i = 0; i < 12; i++) {
            g.add(10);
        }
        assert.equal(300, g.score());
    });

    it('testEndOfArray', () => {
        for (let i = 0; i < 9; i++) {
            g.add(0);
            g.add(0);
        }
        g.add(2);
        g.add(8);
        g.add(10);
        assert.equal(20, g.score());
    });

    it('testSampleGame', () => {
        g.add(1);
        g.add(4);
        g.add(4);
        g.add(5);
        g.add(6);
        g.add(4);
        g.add(5);
        g.add(5);
        g.add(10);
        g.add(0);
        g.add(1);
        g.add(7);
        g.add(3);
        g.add(6);
        g.add(4);
        g.add(10);
        g.add(2);
        g.add(8);
        g.add(6);
        assert.equal(133, g.score());
    });

    it('testHeartBreak', () => {
        for (let i = 0; i < 11; i++) g.add(10);
        g.add(9);
        assert.equal(299, g.score());
    });

    it('testTenthFrameSpare', () => {
        for (let i=0; i<9; i++) g.add(10);
        g.add(9);
        g.add(1);
        g.add(1);
        assert.equal(270, g.score());
    });
});
