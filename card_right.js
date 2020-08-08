class CardRight {

    constructor(size) {

        this.COMPLETE = -1;
        this.EMPTY = -2;
        this.size = size;
        this.map = [];
        this.originmap = [];
        this.card_count = size * size / 2;
        this._SetMap();
    }

    _CopyMap(copymap) {
        this._WorkInMap((i, j) => {
            copymap[i][j] = this.map[i][j];
        })
    }

    _SetMap() {
        for (var i = 0; i < this.size; i++) {
            this.map.push(new Array(this.size));
            this.originmap.push(new Array(this.size));
        }
        this._WorkInMap((i, j) => { this.map[i][j] = this.EMPTY })

        for (var k = 0; k < 2; k++) {

            for (var i = 0; i < this.card_count; i++) {
                var count = 0;
                while (true) {
                    count++;
                    var point = new Point(Math.floor(Math.random() * this.size), Math.floor(Math.random() * this.size));
                    if (this._IsEmpty(point)) {
                        this.map[point.x][point.y] = i;
                        break;
                    }
                }

            }
        }

        this._CopyMap(this.originmap);

    }

    _IsEmpty(p) {
        if (this.map[p.x][p.y] == this.EMPTY) {
            return true;
        }
        return false;
    }

    _IsComplete(p) {
        if (this.map[p.x][p.y] == this.COMPLETE) return true;
        return false;
    }

    _WorkInMap(work) {
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                if (work(i, j) == 'break') break;
            }
        }
    }

    _SetComplete(p) {
        this.map[p.x][p.y] = this.COMPLETE;
    }

    New() {
        this.map = [];
        this.originmap = [];
        this._SetMap();
    }

    Select(pa, pb) {
        if (this.IsRight(pa, pb)) {
            this._SetComplete(pa);
            this._SetComplete(pb);
            return true;
        }
        return false;
    }

    IsEnd() {
        var r = true;
        this._WorkInMap((i, j) => {
            if (this.map[i][j] != this.COMPLETE) {
                r = false;
                return 'break';
            }
        })
        return r;
    }

    IsCanSelect() {
        if (this.map[i][j] != this.COMPLETE) return true;
        return false;
    }

    IsRight(pa, pb) {
        if (this._IsComplete(pa) || this._IsComplete(pb)) return false;
        if (pa.x == pb.x && pa.y == pb.y) return false;
        if (this.map[pa.x][pa.y] != this.map[pb.x][pb.y]) {
            return false;
        }
        return true;
    }




}

class Point {
    constructor(x, y) {
        if (typeof x == 'undefined') x = 0;
        if (typeof y == 'undefined') y = 0;
        this.x = x;
        this.y = y;
    }
}