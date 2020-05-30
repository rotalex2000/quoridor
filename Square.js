let squares;

class Square {
    constructor(x, y, color) {
        this.size = squareSize;
        this.color = color;
        this.position = [x, y];
        this.mPosition = []; // matrix position
        this.mPositionString = "[" + this.mPosition[0] + ", " + this.mPosition[1] + "]";
        this.isValidPosition = false;
        this.hasPawn = false;
        // nearby positions
        this.squareUp;
        this.squareDown;
        this.squareLeft;
        this.squareRight;
        this.square2Up;
        this.square2Down;
        this.square2Left;
        this.square2Right;
        this.squareUpLeft;
        this.squareUpRight;
        this.squareDownLeft;
        this.squareDownRight;
        // wall checkers
        this.hasWallUp = false;
        this.hasWallDown = false;
        this.hasWallLeft = false;
        this.hasWallRight = false;
    }

    checkPawn() {
        if (pawn1.square == this || pawn2.square == this) {
            this.hasPawn = true;
        } else {
            this.hasPawn = false;
        }
        this.mPositionString = "[" + this.mPosition[0] + ", " + this.mPosition[1] + "]";
    }

    setNearbyPosition() {
        this.squareUp = this.mPosition[1] != 1 ? squares[((this.mPosition[1] - 2) * boardLength) + this.mPosition[0] - 1] : null;
        this.squareDown = this.mPosition[1] != 9 ? squares[((this.mPosition[1]) * boardLength) + this.mPosition[0] - 1] : null;
        this.squareLeft = this.mPosition[0] != 1 ? squares[((this.mPosition[1] - 1) * boardLength) + this.mPosition[0] - 2] : null;
        this.squareRight = this.mPosition[0] != 9 ? squares[((this.mPosition[1] - 1) * boardLength) + this.mPosition[0]] : null;
        this.square2Up = this.mPosition[1] != 1 ? squares[((this.mPosition[1] - 3) * boardLength) + this.mPosition[0] - 1] : null;
        this.square2Down = this.mPosition[1] != 9 ? squares[((this.mPosition[1] + 1) * boardLength) + this.mPosition[0] - 1] : null;
        this.square2Left = this.mPosition[0] != 1 ? squares[((this.mPosition[1] - 1) * boardLength) + this.mPosition[0] - 3] : null;
        this.square2Right = this.mPosition[0] != 9 ? squares[((this.mPosition[1] - 1) * boardLength) + this.mPosition[0] + 1] : null;
        this.squareUpLeft = this.mPosition[1] != 1 ? squares[((this.mPosition[1] - 2) * boardLength) + this.mPosition[0] - 2] : null;
        this.squareUpRight = this.mPosition[1] != 1 ? squares[((this.mPosition[1] - 2) * boardLength) + this.mPosition[0]] : null;
        this.squareDownLeft = this.mPosition[1] != 9 ? squares[((this.mPosition[1]) * boardLength) + this.mPosition[0] - 2] : null;
        this.squareDownRight = this.mPosition[1] != 9 ? squares[((this.mPosition[1]) * boardLength) + this.mPosition[0] - 0] : null;
    }

    checkImaginaryValidPos(pawn) {

        let result = [false, false, false, false, false, false, false, false, false, false, false, false];
        //            d2     d      dl     dr     l      r      l2     r2     ul     ur     u      u2
        //            0      1      2      3      4      5      6      7      8      9      10     11
        //            u2     u      ul     ur     l      r      l2     r2     dl     dr     d      d2

        if (this.squareUp != null) {
            if ((!this.squareUp.hasPawn) && !this.hasWallUp) {
                result[10] = true;
            } else if (this.squareUp.hasPawn && pawn2.square != this.squareUp) {
                if (this.square2Up != null && !this.hasWallUp && !this.squareUp.hasWallUp) {
                    result[11] = true;
                } else if (this.squareUp.hasWallUp && !this.hasWallUp) {
                    if (this.squareUpLeft != null && !this.squareUp.hasWallLeft) {
                        result[8] = true;
                    }
                    if (this.squareUpRight != null && !this.squareUp.hasWallRight) {
                        result[9] = true;
                    }
                }
            }
        }

        if (this.squareDown != null) {
            if (!this.squareDown.hasPawn && !this.hasWallDown) {
                result[1] = true;
            } else if (this.squareDown.hasPawn && pawn2.square != this.squareDown) {
                if (this.square2Down != null && !this.hasWallDown && !this.squareDown.hasWallDown) {
                    result[0] = true;
                } else if (this.squareDown.hasWallDown && !this.hasWallDown) {
                    if (this.squareDownLeft != null && !this.squareDown.hasWallLeft) {
                        result[2] = true;
                    }
                    if (this.squareDownRight != null && !this.squareDown.hasWallRight) {
                        result[3] = true;
                    }
                }
            }
        }

        if (this.squareLeft != null) {
            if (!this.squareLeft.hasPawn && !this.hasWallLeft) {
                result[4] = true;
            } else if (this.squareLeft.hasPawn && pawn2.square != this.squareLeft) {
                if (this.square2Left != null && !this.hasWallLeft && !this.squareLeft.hasWallLeft) {
                    result[6] = true;
                } else if (this.squareLeft.hasWallLeft && !this.hasWallLeft) {
                    if (this.squareUpLeft != null && !this.squareLeft.hasWallUp) {
                        result[8] = true;
                    }
                    if (this.squareDownLeft != null && !this.squareLeft.hasWallDown) {
                        result[2] = true;
                    }
                }
            }
        }

        if (this.squareRight != null) {
            if (!this.squareRight.hasPawn && !this.hasWallRight) {
                result[5] = true;
            } else if (this.squareRight.hasPawn && pawn2.square != this.squareRight) {
                if (this.square2Right != null && !this.hasWallRight && !this.squareRight.hasWallRight) {
                    result[7] = true;
                } else if (this.squareRight.hasWallRight && !this.hasWallRight) {
                    if (this.squareUpRight != null && !this.squareRight.hasWallUp) {
                        result[9] = true;
                    }
                    if (this.squareDownRight != null && !this.squareRight.hasWallDown) {
                        result[3] = true;
                    }
                }
            }
        }

        if (pawn == "p1") {
            let resultAux = result.slice();
            result = [
                resultAux[11],
                resultAux[10],
                resultAux[8],
                resultAux[9],
                resultAux[4],
                resultAux[5],
                resultAux[6],
                resultAux[7],
                resultAux[2],
                resultAux[3],
                resultAux[1],
                resultAux[0],
            ];
        }

        return result;
    }

    onHover() {
        if (
            mouseX > this.position[0] - squareSize / 2 &&
            mouseX < this.position[0] + squareSize / 2 &&
            mouseY > this.position[1] - squareSize / 2 &&
            mouseY < this.position[1] + squareSize / 2
        ) {
            return true;
        }
    }

    display() {
        rectMode(CENTER);
        strokeWeight(this.isValidPosition ? 2 : 0);
        stroke(pawnActive.color);
        fill(this.color);
        rect(this.position[0], this.position[1], this.size, this.size);
    }
}

function createSquares() {
    let squares = [];
    let y = paddingTop + squareSize / 2;
    for (let i = 0; i < boardLength; i++) {
        let x = paddingLeft + squareSize / 2;
        for (let j = 0; j < boardLength; j++) {
            let square = new Square(x, y, squareColor);
            square.mPosition = [j + 1, i + 1];
            squares[squares.length] = square;
            x += squareSize + spaceSize;
        }
        y += squareSize + spaceSize;
    }
    return squares;
}