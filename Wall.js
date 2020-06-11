let
  wallsNumber = 10,
  nextWallPosI,
  nextWallPosJ,
  nextCWallPosI,
  nextCWallPosJ,
  orientationChoice = null,
  // for play with computer mode
  intersections = [];

class Wall {
  constructor(i, j, o, color) {
    this.length = squareSize * 2 + spaceSize;
    this.thickness = spaceSize;
    this.color = color;
    this.position = [i, j];
    this.orientation = o;
  }

  setPosition(i, j, o) {
    this.position = [i, j];
    this.orientation = o;
  }

  display() {
    let xv = paddingLeft + (squareSize + spaceSize) * (this.position[0]) - spaceSize / 2;
    let yv = paddingTop + (squareSize + spaceSize) * (this.position[1]) - spaceSize / 2;
    let xh = paddingLeft + (squareSize + spaceSize) * (this.position[0]) - spaceSize / 2;
    let yh = paddingTop + (squareSize + spaceSize) * (this.position[1]) - spaceSize / 2;
    noStroke();
    fill(this.color);
    rect(
      this.orientation == 'v' ? xv : xh,
      this.orientation == 'v' ? yv : yh,
      this.orientation == 'v' ? this.thickness : this.length,
      this.orientation == 'v' ? this.length : this.thickness
    );
  }
}

function createWalls1() {
  let walls = [];
  for (let i = 0; i < wallsNumber; i++) {
    let wall = new Wall(i, 10, 'v', wallColor);
    walls[walls.length] = wall;
  }
  return walls;
}

function createWalls2() {
  let walls = [];
  for (let i = 0; i < wallsNumber; i++) {
    let wall = new Wall(9 - i, -1, 'v', wallColor);
    walls[walls.length] = wall;
  }
  return walls;
}

function setNextWallCoords() {
  rectMode(CENTER);
  if (hover != 'intersection') {
    nextWallPosI = null;
    nextWallPosJ = null;
  } else {
    if (isValidWallPosition(nextWallPosI, nextWallPosJ)) {
      fill(wallPreviewColor);
    } else {
      fill('#c90000');
    }
    rect(
      orientationChoice == 'v' ? paddingLeft + (squareSize + spaceSize) * (nextWallPosI) - spaceSize / 2 : paddingLeft + (squareSize + spaceSize) * (nextWallPosI) - spaceSize / 2,
      orientationChoice == 'v' ? paddingTop + (squareSize + spaceSize) * (nextWallPosJ) - spaceSize / 2 : paddingTop + (squareSize + spaceSize) * (nextWallPosJ) - spaceSize / 2,
      orientationChoice == 'v' ? spaceSize : squareSize * 2 + spaceSize,
      orientationChoice == 'v' ? squareSize * 2 + spaceSize : spaceSize
    );
  }
}

function placeWall() {
  if (pawnActive == pawn1 || (pawnActive == pawn2 && !playWithComputer)) {
    if (mouseIsPressed && mouseButton == LEFT) {

      if (hover == 'intersection' && isValidWallPosition(nextWallPosI, nextWallPosJ)) {
        pawnActive.walls[pawnActive.wallsRem - 1].setPosition(nextWallPosI, nextWallPosJ, orientationChoice);
        // decrement number of remaining walls
        pawnActive.wallsRem--;
        // set nearby squares as having wall
        for (let i = 0; i < squares.length; i++) {
          if (orientationChoice == 'h') {
            if (squares[i].mPosition[0] == nextWallPosI && squares[i].mPosition[1] == nextWallPosJ) {
              squares[i].hasWallDown/*Right*/ = true;
            } else if (squares[i].mPosition[0] == nextWallPosI && squares[i].mPosition[1] == nextWallPosJ + 1) {
              squares[i].hasWallUp/*Right*/ = true;
            } else if (squares[i].mPosition[0] == nextWallPosI + 1 && squares[i].mPosition[1] == nextWallPosJ) {
              squares[i].hasWallDown/*Left*/ = true;
            } else if (squares[i].mPosition[0] == nextWallPosI + 1 && squares[i].mPosition[1] == nextWallPosJ + 1) {
              squares[i].hasWallUp/*Left*/ = true;
            }
          } else if (orientationChoice == 'v') {
            if (squares[i].mPosition[0] == nextWallPosI && squares[i].mPosition[1] == nextWallPosJ) {
              squares[i].hasWallRight/*Down*/ = true;
            } else if (squares[i].mPosition[0] == nextWallPosI && squares[i].mPosition[1] == nextWallPosJ + 1) {
              squares[i].hasWallRight/*Up*/ = true;
            } else if (squares[i].mPosition[0] == nextWallPosI + 1 && squares[i].mPosition[1] == nextWallPosJ) {
              squares[i].hasWallLeft/*Down*/ = true;
            } else if (squares[i].mPosition[0] == nextWallPosI + 1 && squares[i].mPosition[1] == nextWallPosJ + 1) {
              squares[i].hasWallLeft/*Up*/ = true;
            }
          }
        }
        // change user
        pawnActive = pawnActive == pawn1 ? pawn2 : pawn1;
        chooseAction();
      }

    }
  } else { // calculator function to place wall
    let validWallMove = false;
    if (!pawn1.square.hasWallUp) {
      orientationChoice = 'h';
      if (isValidWallPosition(pawn1.position[0], pawn1.position[1] - 1)) {
        nextCWallPosI = pawn1.position[0];
        nextCWallPosJ = pawn1.position[1] - 1;
        validWallMove = true;
      } else if (isValidWallPosition(pawn1.position[0] - 1, pawn1.position[1] - 1)) {
        nextCWallPosI = pawn1.position[0] - 1;
        nextCWallPosJ = pawn1.position[1] - 1;
        validWallMove = true;
      }
    }

    if (validWallMove) {
      pawnActive.walls[pawnActive.wallsRem - 1].setPosition(nextCWallPosI, nextCWallPosJ, orientationChoice);
      // decrement number of remaining walls
      pawnActive.wallsRem--;
      // set nearby squares as having wall
      for (let i = 0; i < squares.length; i++) {
        if (orientationChoice == 'h') {
          if (squares[i].mPosition[0] == nextCWallPosI && squares[i].mPosition[1] == nextCWallPosJ) {
            squares[i].hasWallDown/*Right*/ = true;
          } else if (squares[i].mPosition[0] == nextCWallPosI && squares[i].mPosition[1] == nextCWallPosJ + 1) {
            squares[i].hasWallUp/*Right*/ = true;
          } else if (squares[i].mPosition[0] == nextCWallPosI + 1 && squares[i].mPosition[1] == nextCWallPosJ) {
            squares[i].hasWallDown/*Left*/ = true;
          } else if (squares[i].mPosition[0] == nextCWallPosI + 1 && squares[i].mPosition[1] == nextCWallPosJ + 1) {
            squares[i].hasWallUp/*Left*/ = true;
          }
        } else if (orientationChoice == 'v') {
          if (squares[i].mPosition[0] == nextCWallPosI && squares[i].mPosition[1] == nextCWallPosJ) {
            squares[i].hasWallRight/*Down*/ = true;
          } else if (squares[i].mPosition[0] == nextCWallPosI && squares[i].mPosition[1] == nextCWallPosJ + 1) {
            squares[i].hasWallRight/*Up*/ = true;
          } else if (squares[i].mPosition[0] == nextCWallPosI + 1 && squares[i].mPosition[1] == nextCWallPosJ) {
            squares[i].hasWallLeft/*Down*/ = true;
          } else if (squares[i].mPosition[0] == nextCWallPosI + 1 && squares[i].mPosition[1] == nextCWallPosJ + 1) {
            squares[i].hasWallLeft/*Up*/ = true;
          }
        }
      }
      // change user
      pawnActive = pawnActive == pawn1 ? pawn2 : pawn1;
      chooseAction();
    } else {
      setMovePawn();
    }
  }
}

function isValidWallPosition(i, j) {
  if (
    i == 0 ||
    i == 9 ||
    j == 0 ||
    j == 9
  ) {
    return false;
  }
  for (let k = 0; k < wallsNumber; k++) {
    if (orientationChoice == 'v') {
      if (
        // wall on same position (v or h)
        pawn1.walls[k].position[0] == i &&
        pawn1.walls[k].position[1] == j ||
        pawn2.walls[k].position[0] == i &&
        pawn2.walls[k].position[1] == j ||
        // wall on one position above (v)
        pawn1.walls[k].orientation == 'v' &&
        pawn1.walls[k].position[0] == i &&
        pawn1.walls[k].position[1] == j - 1 ||
        pawn2.walls[k].orientation == 'v' &&
        pawn2.walls[k].position[0] == i &&
        pawn2.walls[k].position[1] == j - 1 ||
        // wall on one position below (v)
        pawn1.walls[k].orientation == 'v' &&
        pawn1.walls[k].position[0] == i &&
        pawn1.walls[k].position[1] == j + 1 ||
        pawn2.walls[k].orientation == 'v' &&
        pawn2.walls[k].position[0] == i &&
        pawn2.walls[k].position[1] == j + 1
      ) {
        return false;
      }
    } else if (orientationChoice == 'h') {
      if (
        // wall on same position (h or v)
        pawn1.walls[k].position[0] == i &&
        pawn1.walls[k].position[1] == j ||
        pawn2.walls[k].position[0] == i &&
        pawn2.walls[k].position[1] == j ||
        // wall on one position to the left (h)
        pawn1.walls[k].orientation == 'h' &&
        pawn1.walls[k].position[0] == i - 1 &&
        pawn1.walls[k].position[1] == j ||
        pawn2.walls[k].orientation == 'h' &&
        pawn2.walls[k].position[0] == i - 1 &&
        pawn2.walls[k].position[1] == j ||
        // wall on one position to the right (h)
        pawn1.walls[k].orientation == 'h' &&
        pawn1.walls[k].position[0] == i + 1 &&
        pawn1.walls[k].position[1] == j ||
        pawn2.walls[k].orientation == 'h' &&
        pawn2.walls[k].position[0] == i + 1 &&
        pawn2.walls[k].position[1] == j
      ) {
        return false;
      }
    }
  }

  if (isIllegalWallPosition(i, j)) {
    return false;
  }

  return true;
}

function wallExistsOn(i, j, o) {
  for (let k = 0; k < wallsNumber; k++) {
    if (pawn1.walls[k].position[0] == i && pawn1.walls[k].position[1] == j && pawn1.walls[k].orientation == o) {
      return true;
    } else if (pawn2.walls[k].position[0] == i && pawn2.walls[k].position[1] == j && pawn2.walls[k].orientation == o) {
      return true;
    } else {
      return false;
    }
  }
}

function placeRandomWall() {
  let validPosFound = false;
  while (validPosFound == false) {
    orientationChoice = Math.floor(Math.random() * 2) == 0 ? 'h' : 'v';
    let check = [
      Math.floor(Math.random() * 8) + 1,
      Math.floor(Math.random() * 8) + 1
    ]
    if (isValidWallPosition(check[0], check[1])) {
      validPosFound = true;
      nextCWallPosI = check[0];
      nextCWallPosJ = check[1];
    }
  }
}

function isIllegalWallPosition(i, j) {
  let isIllegal = false;
  let testSquares = [];
  let testFakeWallBool = [];
  for (let k = 0; k < squares.length; k++) {
    if (orientationChoice == 'h') {
      if (squares[k].mPosition[0] == i && squares[k].mPosition[1] == j) {
        squares[k].hasWallDown/*Right*/ = true;
        testSquares.push(squares[k]);
        testFakeWallBool.push('d');
      } else if (squares[k].mPosition[0] == i && squares[k].mPosition[1] == j + 1) {
        squares[k].hasWallUp/*Right*/ = true;
        testSquares.push(squares[k]);
        testFakeWallBool.push('u');
      } else if (squares[k].mPosition[0] == i + 1 && squares[k].mPosition[1] == j) {
        squares[k].hasWallDown/*Left*/ = true;
        testSquares.push(squares[k]);
        testFakeWallBool.push('d');
      } else if (squares[k].mPosition[0] == i + 1 && squares[k].mPosition[1] == j + 1) {
        squares[k].hasWallUp/*Left*/ = true;
        testSquares.push(squares[k]);
        testFakeWallBool.push('u');
      }
    } else if (orientationChoice == 'v') {
      if (squares[k].mPosition[0] == i && squares[k].mPosition[1] == j) {
        squares[k].hasWallRight/*Down*/ = true;
        testSquares.push(squares[k]);
        testFakeWallBool.push('r');
      } else if (squares[k].mPosition[0] == i && squares[k].mPosition[1] == j + 1) {
        squares[k].hasWallRight/*Up*/ = true;
        testSquares.push(squares[k]);
        testFakeWallBool.push('r');
      } else if (squares[k].mPosition[0] == i + 1 && squares[k].mPosition[1] == j) {
        squares[k].hasWallLeft/*Down*/ = true;
        testSquares.push(squares[k]);
        testFakeWallBool.push('l');
      } else if (squares[k].mPosition[0] == i + 1 && squares[k].mPosition[1] == j + 1) {
        squares[k].hasWallLeft/*Up*/ = true;
        testSquares.push(squares[k]);
        testFakeWallBool.push('l');
      }
    }
  }

  try {
    // CHECK FOR PAWN 1
    let path = [];
    let triedSquares = [];
    let checkedSquare = pawn1.square;
    let oppositeRowReached = false;

    let nearbySquares = [
      checkedSquare.square2Up,
      checkedSquare.squareUp,
      checkedSquare.squareUpLeft,
      checkedSquare.squareUpRight,
      checkedSquare.squareLeft,
      checkedSquare.squareRight,
      checkedSquare.square2Left,
      checkedSquare.square2Right,
      checkedSquare.squareDownLeft,
      checkedSquare.squareDownRight,
      checkedSquare.squareDown,
      checkedSquare.square2Down
    ]

    let nearbySquaresValidity = checkedSquare.checkImaginaryValidPos("p1");

    triedSquares.push(checkedSquare);
    path.push(checkedSquare);

    while (!oppositeRowReached) {
      nearbySquares = [
        checkedSquare.square2Up,
        checkedSquare.squareUp,
        checkedSquare.squareUpLeft,
        checkedSquare.squareUpRight,
        checkedSquare.squareLeft,
        checkedSquare.squareRight,
        checkedSquare.square2Left,
        checkedSquare.square2Right,
        checkedSquare.squareDownLeft,
        checkedSquare.squareDownRight,
        checkedSquare.squareDown,
        checkedSquare.square2Down
      ]

      nearbySquaresValidity = checkedSquare.checkImaginaryValidPos("p1");

      for (let i = 0; i < nearbySquares.length; i++) {
        if (nearbySquares[i] && nearbySquaresValidity[i]) {
          if (!triedSquares.includes(nearbySquares[i])) {
            checkedSquare = nearbySquares[i];
            triedSquares.push(checkedSquare);
            path.push(checkedSquare);
            if (checkedSquare.mPosition[1] == 1) {
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

    // CHECK FOR PAWN 2
    path = [];
    triedSquares = [];
    checkedSquare = pawn2.square;
    oppositeRowReached = false;

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
      checkedSquare.square2Up
    ]

    nearbySquaresValidity = checkedSquare.checkImaginaryValidPos("p2");

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
  } catch (error) {
    isIllegal = true;
  }

  for (let i = 0; i < 4; i++) {
    if (testFakeWallBool[i] == 'u') {
      testSquares[i].hasWallUp = false;
    } else if (testFakeWallBool[i] == 'd') {
      testSquares[i].hasWallDown = false;
    } else if (testFakeWallBool[i] == 'l') {
      testSquares[i].hasWallLeft = false;
    } else if (testFakeWallBool[i] == 'r') {
      testSquares[i].hasWallRight = false;
    }
  }

  return isIllegal;
}

function wallPreview() {
  noStroke();
  rectMode(CORNER);
  fill(canvasColor);
  let fakeCoverX = paddingLeft + (squareSize + spaceSize) * (pawnActive.walls[pawnActive.wallsRem - 1].position[0]) - spaceSize;
  let fakeCoverY = paddingTop + (squareSize + spaceSize) * (pawnActive.walls[pawnActive.wallsRem - 1].position[1] - 1);
  rect(
    fakeCoverX,
    fakeCoverY,
    spaceSize,
    squareSize * 2 + spaceSize
  );
  rectMode(CENTER);
  hover == 'intersection' ? fill('rgba(212, 127, 0, 0)') : fill('rgba(212, 127, 0, 1)');
  rect(
    mouseX,
    mouseY,
    orientationChoice == 'v' ? spaceSize : squareSize * 2 + spaceSize,
    orientationChoice == 'v' ? squareSize * 2 + spaceSize : spaceSize
  );
}
