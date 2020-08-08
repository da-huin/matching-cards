class CardRightTree {

    constructor(props) {
        this.props = props;

        this.start_point = new Point(-1, -1);
        this.end_point = new Point(-1, -1);
        this.mouselimit = false;
    }

    Select(x, y) {
        if (this.mouselimit) return;
        var start_point = this.start_point;
        var end_point = this.end_point;
        var cardright = this.props.cardright;

        if (start_point.x == -1 || start_point.y == -1) {
            start_point.x = x;
            start_point.y = y;
            end_point.x = -1;
            end_point.y = -1;
            var $start = this._GetPieceJQuery(start_point.x, start_point.y);
            $start.addClass('show');

        } else {
            if (start_point.x == x && start_point.y == y) return;
            end_point.x = x;
            end_point.y = y;
            var $start = this._GetPieceJQuery(start_point.x, start_point.y);
            var $end = this._GetPieceJQuery(end_point.x, end_point.y);
            $end.addClass('show');

            if (cardright.Select(start_point, end_point)) {
                this.props.onright();
                $start.addClass('complete');
                $end.addClass('complete');
                this.point++;
                if (cardright.IsEnd()) {
                    this.mouselimit = true;
                    this.props.cardright.New();
                    if (this.props.oncomplete()) {
                        setTimeout(() => {
                            this.mouselimit = false;
                            this.Append();
                        }, 1000);
                    }
                }
            } else {
                this.props.onnotright();
                this.mouselimit = true;
                setTimeout(() => {
                    this.mouselimit = false;
                    $start.removeClass('show');
                    $end.removeClass('show');
                }, 1000);
            }


            start_point.x = -1;
            start_point.y = -1;
        }
    }

    Append() {
        var inst = this;
        let $parent = this.props.$parent;
        let cardright = this.props.cardright;
        let mapindex = this.props.mapindex;

        let map = cardright.map;
        let size = cardright.size;
        $parent.html('');

        var getPiece = function (i, j, mapindex, v) {
            let $piece = $('<span>');
            $piece.addClass('piece');
            $piece.attr({
                'meta-point-x': i,
                'meta-point-y': j,
                'meta-map-index': mapindex,
            })
            $piece.text(v);
            return $piece;
        }
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                var v = -1;
                if (typeof this.props.figures[map[i][j]] == 'undefined') v = map[i][j];
                else v = this.props.figures[map[i][j]];
                var $piece = getPiece(i, j, mapindex, v);
                $piece.on('click', function () {
                    let x = $(this).attr('meta-point-x');
                    let y = $(this).attr('meta-point-y');
                    inst.Select(x, y);

                })
                $parent.append($piece);
                $parent.append(' ');
            }
            $parent.append('<br>');
        }

        inst.Show();
        setTimeout(() => {
            inst.Hide();
        }, inst.props.first_showtime)
    }

    Delete() {
        this.props.$parent.html('');
    }
    Show() {
        var inst = this;
        this.props.cardright._WorkInMap((i, j) => { inst._GetPieceJQuery(i, j).addClass('show') })
    }

    Hide() {
        var inst = this;
        this.props.cardright._WorkInMap((i, j) => { inst._GetPieceJQuery(i, j).removeClass('show') })
    }

    _GetPieceJQuery(x, y) {
        return $('.piece[meta-point-x=' + x + '][meta-point-y=' + y + '][meta-map-index=' + this.props.mapindex + ']');
    }

}