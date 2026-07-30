export class Ship {
    constructor(length, hits) {
        this.length = length;
        this.hits = hits;
    }

    get length() {
        return this._length;
    }

    set length(length) {
        this._length = length;
    }

    get hits() {
        return this._hits;
    }

    set hits(hits) {
        this._hits = hits;
    }

    isSunk() {
        return this.hits >= this.length;
    }

    hit() {
        this.hits(this.hits + 1);
    }
}