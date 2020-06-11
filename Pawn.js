let pawn1, pawn2;
let caveStatus = "outside"; // can be outisde, inside or entrance
let animation = [false, 'direction' /* h = 0, v = 1 */, 'destination', 'fakePawnPos'];

class Pawn {
  constructor(i, j, color) {
    this.name;
    this.color = color;
    this.position = [i, j];
    this.square = squares[((this.position[1] - 1) * boardLength) + this.position[0] - 1];
    // nearby squares references
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
    // array of nearby squares references (for play with computer mode)
    this.nearbySquares = [];
    // mouse checkers
    this.mouseCheckers = [
      [], // up, 2up, up-left, up-right
      [], // down, 2down, down-left, down-right
      [], // left, 2left, up-left, down-left
      [] // right, 2right, up-right, down-right
    ]
    // pawn check
    this.square.hasPawn = true;
    // walls
    this.walls;
    this.wallsRem = 10;
  }

  setPosition(i, j) {
    // actual move
    this.position = [i, j];
    // reset square
    this.square = squares[((this.position[1] - 1) * boardLength) + this.position[0] - 1];
    invalidateAllPositions();
    // change user
    pawnActive = pawnActive == pawn1 ? pawn2 : pawn1;
    chooseAction();
  }

  move() {
    if (pawnActive == pawn1 || (pawnActive == pawn2 && !playWithComputer)) {

      if (mouseIsPressed && mouseButton == LEFT) {
        animation[3] = [
          paddingLeft + (squareSize + spaceSize) * (pawnActive.position[0] - 1) + squareSize / 2,
          paddingTop + (squareSize + spaceSize) * (pawnActive.position[1] - 1) + squareSize / 2,
        ];
        // up
        if (this.mouseCheckers[0][0] && this.squareUp && this.squareUp.isValidPosition) {
          animation[1] = [0, -1];
          animation[0] = true;
          this.setPosition(this.position[0], this.position[1] - 1);
          // 2 up
        } else if (this.mouseCheckers[0][1] && this.square2Up && this.square2Up.isValidPosition) {
          animation[1] = [0, -2];
          animation[0] = true;
          this.setPosition(this.position[0], this.position[1] - 2);
          // down
        } else if (this.mouseCheckers[1][0] && this.squareDown && this.squareDown.isValidPosition) {
          animation[1] = [0, 1];
          animation[0] = true;
          this.setPosition(this.position[0], this.position[1] + 1);
          // 2 down
        } else if (this.mouseCheckers[1][1] && this.square2Down && this.square2Down.isValidPosition) {
          animation[1] = [0, 2];
          animation[0] = true;
          this.setPosition(this.position[0], this.position[1] + 2);
          // left
        } else if (this.mouseCheckers[2][0] && this.squareLeft && this.squareLeft.isValidPosition) {
          animation[1] = [-1, 0];
          animation[0] = true;
          this.setPosition(this.position[0] - 1, this.position[1]);
          // 2 left
        } else if (this.mouseCheckers[2][1] && this.square2Left && this.square2Left.isValidPosition) {
          animation[1] = [-2, 0];
          animation[0] = true;
          this.setPosition(this.position[0] - 2, this.position[1]);
          // right
        } else if (this.mouseCheckers[3][0] && this.squareRight && this.squareRight.isValidPosition) {
          animation[1] = [1, 0];
          animation[0] = true;
          this.setPosition(this.position[0] + 1, this.position[1]);
          // 2 right
        } else if (this.mouseCheckers[3][1] && this.square2Right && this.square2Right.isValidPosition) {
          animation[1] = [2, 0];
          animation[0] = true;
          this.setPosition(this.position[0] + 2, this.position[1])
          // up - left
        } else if (this.mouseCheckers[0][2] && this.squareUpLeft && this.squareUpLeft.isValidPosition) {
          animation[1] = [-1, -1];
          animation[0] = true;
          this.setPosition(this.position[0] - 1, this.position[1] - 1);
          // up - right
        } else if (this.mouseCheckers[0][3] && this.squareUpRight && this.squareUpRight.isValidPosition) {
          animation[1] = [1, -1];
          animation[0] = true;
          this.setPosition(this.position[0] + 1, this.position[1] - 1);
          // down - left
        } else if (this.mouseCheckers[1][2] && this.squareDownLeft && this.squareDownLeft.isValidPosition) {
          animation[1] = [-1, 1];
          animation[0] = true;
          this.setPosition(this.position[0] - 1, this.position[1] + 1);
          // down - right
        } else if (this.mouseCheckers[1][3] && this.squareDownRight && this.squareDownRight.isValidPosition) {
          animation[1] = [1, 1];
          animation[0] = true;
          this.setPosition(this.position[0] + 1, this.position[1] + 1);
        }
        // reset all colors
        for (let i = 0; i < squares.length; i++) {
          squares[i].color = squareColor;
        }
      }

    } else { // calculator function to move pawn - easy mode
      let horizontalResults = this.checkHorizontalAccess(this.square);
      let caveResults = this.checkCave();
      if (caveResults[0]) {
        if (caveResults[1].isValidPosition) {
          this.setPosition(caveResults[1].mPosition[0], caveResults[1].mPosition[1]);
          return;
        }
      }
      if (this.square2Down && this.square2Down.isValidPosition) {
        this.setPosition(this.square2Down.mPosition[0], this.square2Down.mPosition[1]);
      } else if (this.squareDown && this.squareDown.isValidPosition) {
        this.setPosition(this.squareDown.mPosition[0], this.squareDown.mPosition[1]);
      } else if (horizontalResults[0]) {
        this.setPosition(horizontalResults[1].mPosition[0], horizontalResults[1].mPosition[1]);
      } else {
        this.setPosition(this.squareUp.mPosition[0], this.squareUp.mPosition[1]);
      }

      // this.calculatorMove();
      // reset all colors
      for (let i = 0; i < squares.length; i++) {
        squares[i].color = squareColor;
      }
    }
  }

  calculatorMove() {
    let path = [];
    let triedSquares = [];
    let checkedSquare = this.square;
    let oppositeRowReached = false;

    let nearbySquares = [
      checkedSquare.square2Down,
      checkedSquare.squareDown,
      checkedSquare.squareDownLeft,
      checkedSquare.squareDownRight,
      checkedSquare.squareLeft,
      checkedSquare.squareRight,
      checkedSquare.square2Left,
      checkedSquare.square2Right,
      checkedSquare.squareUpLeft,
      checkedSquare.squareUpRight,
      checkedSquare.squareUp,
      checkedSquare.square2Up
    ]

    let nearbySquaresValidity = checkedSquare.checkImaginaryValidPos("p2");

    triedSquares.push(checkedSquare);
    path.push(checkedSquare);

    while (!oppositeRowReached) {
      nearbySquares = [
        checkedSquare.square2Down,
        checkedSquare.squareDown,
        checkedSquare.squareDownLeft,
        checkedSquare.squareDownRight,
        checkedSquare.squareLeft,
        checkedSquare.squareRight,
        checkedSquare.square2Left,
        checkedSquare.square2Right,
        checkedSquare.squareUpLeft,
        checkedSquare.squareUpRight,
        checkedSquare.squareUp,
        checkedSquare.square2Up,
      ]

      nearbySquaresValidity = checkedSquare.checkImaginaryValidPos("p2");

      for (let i = 0; i < nearbySquares.length; i++) {
        if (nearbySquares[i] && nearbySquaresValidity[i]) {
          if (!triedSquares.includes(nearbySquares[i])) {
            checkedSquare = nearbySquares[i];
            triedSquares.push(checkedSquare);
            path.push(checkedSquare);
            if (checkedSquare.mPosition[1] == 9) {
              oppositeRowReached = true;
            }
            break;
          } else {
            if (i == nearbySquares.length - 1) {
              path.pop();
              checkedSquare = path[path.length - 1];
            }
          }
        } else {
          if (i == nearbySquares.length - 1) {
            path.pop();
            checkedSquare = path[path.length - 1];
          }
        }

      }
    }
    console.log("Path:");
    for (let i = 0; i < path.length; i++) {
      console.log(path[i].mPosition);
    }
    this.setPosition(path[1].mPosition[0], path[1].mPosition[1]);
  }

  checkHorizontalAccess(currentSquare) {
    let checkedSquareLeft = currentSquare.squareLeft;
    let checkedSquareRight = currentSquare.squareRight;
    let accessSquareFound = false;
    let leftObstacleReached = false;
    let rightObstacleReached = false;
    while (!accessSquareFound && !(leftObstacleReached && rightObstacleReached)) {
      if (checkedSquareLeft && !checkedSquareLeft.hasWallRight) {
        if (!checkedSquareLeft.hasWallDown) {
          accessSquareFound = true;
          return [true, this.squareLeft];
        } else {
          checkedSquareLeft = checkedSquareLeft.squareLeft;
        }
      } else {
        leftObstacleReached = true;
        if (leftObstacleReached && rightObstacleReached) {
          return [false, checkedSquareLeft, checkedSquareRight];
        }
      }
      if (checkedSquareRight && !checkedSquareRight.hasWallLeft) {
        if (!checkedSquareRight.hasWallDown) {
          accessSquareFound = true;
          return [true, this.squareRight];
        } else {
          checkedSquareRight = checkedSquareRight.squareRight;
        }
      } else {
        rightObstacleReached = true;
        if (leftObstacleReached && rightObstacleReached) {
          return [false, checkedSquareLeft, checkedSquareRight];
        }
      }
    }
  }

  checkCave() {
    let checkedSquare = this.square;
    let wallFoundDown = false;
    let wallSquareDown = null;
    let upperWallSquareLeft = null;
    let upperWallSquareRight = null;
    let lowerWallFound = false;
    let lowerWallSquare = null;

    while (!wallFoundDown) {
      if (checkedSquare.mPosition[1] == 9) {
        return [false];
      }
      if (checkedSquare.hasWallDown) {
        wallFoundDown = true;
        wallSquareDown = checkedSquare;
      } else {
        checkedSquare = checkedSquare.squareDown;
      }
    }
    let horizontalResults = this.checkHorizontalAccess(wallSquareDown);
    if (horizontalResults[0]) {
      return [false];
    }
    if (horizontalResults[1]) {
      upperWallSquareLeft = horizontalResults[1];
    }
    if (horizontalResults[2]) {
      upperWallSquareRight = horizontalResults[2];
    }
    while (!lowerWallFound) {
      if (upperWallSquareLeft) {
        if (upperWallSquareLeft.squareUp) {
          if (!upperWallSquareLeft.squareUp.hasWallRight) {
            lowerWallFound = true;
            lowerWallSquare = upperWallSquareLeft;
          } else {
            upperWallSquareLeft = upperWallSquareLeft.squareUp;
          }
        }
      }
      if (upperWallSquareRight) {
        if (upperWallSquareRight.squareUp) {
          if (!upperWallSquareRight.squareUp.hasWallLeft) {
            lowerWallFound = true;
            lowerWallSquare = upperWallSquareRight;
          } else {
            upperWallSquareRight = upperWallSquareRight.squareUp;
          }
        }
      }
    }
    if (this.square.mPosition[1] < lowerWallSquare.mPosition[1] - 1) {
      caveStatus = 'outside';
      return [false];
    } else if (this.square.mPosition[1] == lowerWallSquare.mPosition[1] - 1) {
      caveStatus = 'entrance';
      if (upperWallSquareLeft && upperWallSquareRight) {
        if (upperWallSquareLeft.mPosition[1] == upperWallSquareRight.mPosition[1]) {
          let leftDist = Math.abs(this.square.mPosition[0] - upperWallSquareLeft.mPosition[0]);
          let rightDist = Math.abs(this.square.mPosition[0] - upperWallSquareRight.mPosition[0]);
          if (leftDist == rightDist) {
            return [true, this.squareRight];
          } else if (leftDist > rightDist) {
            return [true, this.squareRight];
          } else if (leftDist < rightDist) {
            return [true, this.squareLeft];
          }
        }
      }
      if (lowerWallSquare == upperWallSquareLeft) {
        return [true, this.squareLeft];
      } else if (lowerWallSquare == upperWallSquareRight) {
        return [true, this.squareRight];
      }
    } else if (this.square.mPosition[1] >= lowerWallSquare.mPosition[1]) {
      caveStatus = 'inside';
      return [true, this.squareUp];
    }
  }

  setValidPos() {

    // set nearby square references
    this.squareUp = this.position[1] != 1 ? this.square.squareUp : null;
    this.squareDown = this.position[1] != 9 ? this.square.squareDown : null;
    this.squareLeft = this.position[0] != 1 ? this.square.squareLeft : null;
    this.squareRight = this.position[0] != 9 ? this.square.squareRight : null;
    this.square2Up = this.position[1] != 2 && this.position[1] != 1 ? this.squareUp.squareUp : null;
    this.square2Down = this.position[1] != 8 && this.position[1] != 9 ? this.squareDown.squareDown : null;
    this.square2Left = this.position[0] != 2 && this.position[0] != 1 ? this.squareLeft.squareLeft : null;
    this.square2Right = this.position[0] != 8 && this.position[0] != 9 ? this.squareRight.squareRight : null;
    this.squareUpLeft = this.position[0] != 1 && this.position[1] != 1 ? this.squareUp.squareLeft : null;
    this.squareUpRight = this.position[0] != 9 && this.position[1] != 1 ? this.squareUp.squareRight : null;
    this.squareDownLeft = this.position[0] != 1 && this.position[1] != 9 ? this.squareDown.squareLeft : null;
    this.squareDownRight = this.position[0] != 9 && this.position[1] != 9 ? this.squareDown.squareRight : null;

    // validation

    if (this.squareUp != null) {
      if (!this.squareUp.hasPawn && !this.square.hasWallUp) {
        this.squareUp.isValidPosition = true;
      } else if (this.squareUp.hasPawn) {
        if (this.square2Up != null && !this.square.hasWallUp && !this.squareUp.hasWallUp) {
          this.square2Up.isValidPosition = true;
        } else if (this.squareUp.hasWallUp && !this.square.hasWallUp) {
          if (this.squareUpLeft != null && !this.squareUp.hasWallLeft) {
            this.squareUpLeft.isValidPosition = true;
          }
          if (this.squareUpRight != null && !this.squareUp.hasWallRight) {
            this.squareUpRight.isValidPosition = true;
          }
        }
      }
    }

    if (this.squareDown != null) {
      if (!this.squareDown.hasPawn && !this.square.hasWallDown) {
        this.squareDown.isValidPosition = true;
      } else if (this.squareDown.hasPawn) {
        if (this.square2Down != null && !this.square.hasWallDown && !this.squareDown.hasWallDown) {
          this.square2Down.isValidPosition = true;
        } else if (this.squareDown.hasWallDown && !this.square.hasWallDown) {
          if (this.squareDownLeft != null && !this.squareDown.hasWallLeft) {
            this.squareDownLeft.isValidPosition = true;
          }
          if (this.squareDownRight != null && !this.squareDown.hasWallRight) {
            this.squareDownRight.isValidPosition = true;
          }
        }
      }
    }

    if (this.squareLeft != null) {
      if (!this.squareLeft.hasPawn && !this.square.hasWallLeft) {
        this.squareLeft.isValidPosition = true;
      } else if (this.squareLeft.hasPawn) {
        if (this.square2Left != null && !this.square.hasWallLeft && !this.squareLeft.hasWallLeft) {
          this.square2Left.isValidPosition = true;
        } else if (this.squareLeft.hasWallLeft && !this.square.hasWallLeft) {
          if (this.squareUpLeft != null && !this.squareLeft.hasWallUp) {
            this.squareUpLeft.isValidPosition = true;
          }
          if (this.squareDownLeft != null && !this.squareLeft.hasWallDown) {
            this.squareDownLeft.isValidPosition = true;
          }
        }
      }
    }

    if (this.squareRight != null) {
      if (!this.squareRight.hasPawn && !this.square.hasWallRight) {
        this.squareRight.isValidPosition = true;
      } else if (this.squareRight.hasPawn) {
        if (this.square2Right != null && !this.square.hasWallRight && !this.squareRight.hasWallRight) {
          this.square2Right.isValidPosition = true;
        } else if (this.squareRight.hasWallRight && !this.square.hasWallRight) {
          if (this.squareUpRight != null && !this.squareRight.hasWallUp) {
            this.squareUpRight.isValidPosition = true;
          }
          if (this.squareDownRight != null && !this.squareRight.hasWallDown) {
            this.squareDownRight.isValidPosition = true;
          }
        }
      }
    }
  }

  showValidPosHover() {
    let highlightColor = pawnActive.color;

    let validPositions = [
      [this.squareUp, this.square2Up, this.squareUpLeft, this.squareUpRight],
      [this.squareDown, this.square2Down, this.squareDownLeft, this.squareDownRight],
      [this.squareLeft, this.square2Left, this.squareUpLeft, this.squareDownLeft],
      [this.squareRight, this.square2Right, this.squareUpRight, this.squareDownRight]
    ]

    for (let i = 0; i < validPositions.length; i++) {

      if (validPositions[i][0] != null && validPositions[i][0].isValidPosition) {
        if (validPositions[i][0].onHover()) {
          this.mouseCheckers[i][0] = true;
          validPositions[i][0].color = highlightColor;
        } else {
          this.mouseCheckers[i][0] = false;
          validPositions[i][0].color = squareColor;
        }
      } else if (validPositions[i][1] != null && validPositions[i][1].isValidPosition) {
        if (validPositions[i][1].onHover()) {
          this.mouseCheckers[i][1] = true;
          validPositions[i][1].color = highlightColor;
        } else {
          this.mouseCheckers[i][1] = false;
          validPositions[i][1].color = squareColor;
        }
      } else {
        if (validPositions[i][2] != null && validPositions[i][2].isValidPosition) {
          if (validPositions[i][2].onHover()) {
            this.mouseCheckers[i][2] = true;
            validPositions[i][2].color = highlightColor;
          } else {
            this.mouseCheckers[i][2] = false;
            validPositions[i][2].color = squareColor;
          }
        }
        if (validPositions[i][3] != null && validPositions[i][3].isValidPosition) {
          if (validPositions[i][3].onHover()) {
            this.mouseCheckers[i][3] = true;
            validPositions[i][3].color = highlightColor;
          } else {
            this.mouseCheckers[i][3] = false;
            validPositions[i][3].color = squareColor;
          }
        }
      }
    }
  }

  display() {
    noStroke();
    fill(this.color);
    circle(
      paddingLeft + (squareSize + spaceSize) * (this.position[0] - 1) + squareSize / 2,
      paddingTop + (squareSize + spaceSize) * (this.position[1] - 1) + squareSize / 2,
      pawnSize
    );
  }

  displayValidPositions() {
    this.setValidPos();
    this.showValidPosHover();
  }
}

function animatePawn() {
  if (pawnActive == pawn1) {
    pawn2.color = squareColor;
    animation[2] = [
      paddingLeft + (squareSize + spaceSize) * (pawn2.position[0] - 1) + squareSize / 2,
      paddingTop + (squareSize + spaceSize) * (pawn2.position[1] - 1) + squareSize / 2,
    ];
  } else {
    pawn1.color = squareColor;
    animation[2] = [
      paddingLeft + (squareSize + spaceSize) * (pawn1.position[0] - 1) + squareSize / 2,
      paddingTop + (squareSize + spaceSize) * (pawn1.position[1] - 1) + squareSize / 2,
    ];
  }

  if (animation[3][0] == animation[2][0] && animation[3][1] == animation[2][1]) {
    animation[0] = false;
  } else {
    noStroke();
    pawnActive == pawn1 ? fill(pawn2Color) : fill(pawn1Color);
    circle(
      animation[3][0],
      animation[3][1],
      pawnSize
    );
    animation[3][0] += animation[1][0] * 2;
    animation[3][1] += animation[1][1] * 2;
  }
  if ((animation[3][0] == animation[2][0] && animation[3][1] == animation[2][1])) {
    pawn2.color = pawn2Color;
    pawn1.color = pawn1Color;
  }
}