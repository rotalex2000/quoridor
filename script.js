let boardLength = 9,
  gameStatus = 'intro',
  playWithComputer = false,
  action = 'choose',
  hover,
  pawnActive,
  winner = null;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  introScreen();
}

function draw() {

  if (gameStatus == 'playing') {
    displayBoard();

    pawn1.display();
    pawn2.display();

    for (let i = 0; i < squares.length; i++) {
      squares[i].checkPawn();
      squares[i].setNearbyPosition();
    }

    for (let i = 0; i < wallsNumber; i++) {
      pawn1.walls[i].display();
      pawn2.walls[i].display();
    }

    if (action == 'movePawn') {
      pawnActive.displayValidPositions();
      pawnActive.move();
    }

    if (action == 'placeWall' && orientationChoice != null) {
      setNextWallCoords();
      placeWall();
    }

    hoverOn();

    checkWin();

    // info
    displayPlayerInfo();
  } else if (gameStatus == 'end') {
    endGameScreen();
  }

  // // helper info
  // noStroke();
  // textSize(12);
  // if (pawn1) text(pawn1.position, width/2, height-10);
}

// ========== INTRO ==========

function introScreen() {
  background(canvasColor);

  textAlign(CENTER);
  strokeWeight(size * 0.25);
  stroke(squareColor);
  fill(wallColor);
  textSize(size);
  text('QUORIDOR', canvasWidth / 2, canvasHeight / 2 - size * 0.40);

  createPlayButton();
}

function playGame() {
  playButton.remove();
  clear();

  gameStatus = 'preplay';

  background(canvasColor);

  stroke(squareColor);
  strokeWeight(size * 0.05);
  fill(wallColor);
  textSize(size * 0.3);

  text('Player 1', pLabelHorizPos, p1LabelVertPos);

  createP1NameInput();

  text('Player 2', pLabelHorizPos, p2LabelVertPos);

  createP2NameInput();

  createPlayWithCCheckbox();

  createStartButton();
}

// ========== START GAME ==========

function startGame() {
  p1NameInput.remove();
  p2NameInput.remove();
  playWithCCheckbox.remove();
  startButton.remove();
  if (playAgainButton) {
    playAgainButton.remove();
  }

  clear();

  gameStatus = 'playing';

  squares = createSquares();

  winner = null;

  pawn1 = new Pawn(5, 9, pawn1Color);
  pawn2 = new Pawn(5, 1, pawn2Color);

  pawn1.name = p1NameInput.value() == "" ? "Player 1" : p1NameInput.value();
  if (p2NameInput.value() == "") {
    if (playWithComputer) {
      pawn2.name = "Computer";
    } else {
      pawn2.name = "Player 2";
    }
  } else {
    pawn2.name = p2NameInput.value();
  }

  pawn1.walls = createWalls1();
  pawn2.walls = createWalls2();

  pawnActive = pawn1;

  createMovePawn1Button();
  createMovePawn2Button();

  createPlaceWall1Button();
  createPlaceWall2Button();

  createRestartButton();

  chooseAction();
}

// ========== RESTART GAME ==========

function restartGame() {
  var confirmAnswer = confirm('Do you really want to restart the game?');
  if (confirmAnswer == true) {
    movePawn1Button.remove();
    movePawn2Button.remove();
    placeWall1Button.remove();
    placeWall2Button.remove();
    restartButton.remove();
    startGame();
  }
}

// ========== END GAME ==========

function endGame() {
  movePawn1Button.remove();
  movePawn2Button.remove();
  placeWall1Button.remove()
  placeWall2Button.remove();
  restartButton.remove();
  clear();
  gameStatus = 'end';
  createPlayAgainButton();
}

function endGameScreen() {
  background(canvasColor);

  let endBoxWidth = size * 5;
  let endBoxHeight = size * 3;
  let endBoxXPos = canvasWidth / 2;
  let endBoxYPos = canvasHeight / 2;

  rectMode(CENTER);
  strokeWeight(5);

  stroke(squareColor);

  fill(winner.color);
  rect(endBoxXPos, endBoxYPos, endBoxWidth, endBoxHeight);

  stroke(squareColor);
  strokeWeight(size * 0.07);
  fill(wallColor);
  textAlign(CENTER);
  textSize(size * 0.5)
  textStyle(BOLD);
  text(winner.name + " wins!", endBoxXPos, endBoxYPos - endBoxHeight / 5);

  noStroke();
  fill(squareColor);
  textSize(size * 0.3)
  textStyle(BOLD);
  text("- with " + winner.wallsRem + " walls left -", endBoxXPos, endBoxYPos - endBoxHeight / 18);
}

// ========== DISPLAY ==========

function displayBoard() {
  background(canvasColor);

  // create pawn positions
  for (let i = 0; i < squares.length; i++) {
    squares[i].display();
  }

  // create intersections
  let q = paddingTop + squareSize + spaceSize / 2;
  for (let i = 0; i < boardLength - 1; i++) {
    let p = paddingLeft + squareSize + spaceSize / 2;
    for (let j = 0; j < boardLength - 1; j++) {
      rectMode(CENTER);
      noStroke();
      fill(intersectionColor);
      rect(p, q, spaceSize, spaceSize);
      p += squareSize + spaceSize;
    }
    q += squareSize + spaceSize;
  }
}

function displayPlayerInfo() {
  let infoBoxWidth = size * 1.7;
  let infoBoxHeight = size * 2;

  rectMode(CORNER);
  strokeWeight(5);

  stroke(squareColor);

  fill(pawn1Color);
  rect(info1XPos, infoYPos, infoBoxWidth, infoBoxHeight);

  fill(pawn2Color);
  rect(info2XPos - infoBoxWidth, infoYPos, infoBoxWidth, infoBoxHeight);

  textSize(size * 0.3);

  textAlign(CENTER);
  noStroke();
  fill(squareColor);
  textStyle(BOLD);

  text(pawn1.name, info1XPos + infoBoxWidth / 2, infoYPos + size * 0.4);

  textSize(size * 0.2);
  text(pawn1.wallsRem + " walls left", info1XPos + infoBoxWidth / 2, infoYPos + size * 0.7);

  textSize(size * 0.3);

  fill(squareColor);
  textStyle(BOLD);

  text(pawn2.name, info2XPos - infoBoxWidth / 2, infoYPos + size * 0.4);

  textSize(size * 0.2);
  text(pawn2.wallsRem + " walls left", info2XPos - infoBoxWidth / 2, infoYPos + size * 0.7);
}

// ========== ACTIONS ==========

function chooseAction() {
  action = 'choose';

  // if (verticalWallButton && horizontalWallButton) {
  //   verticalWallButton.remove();
  //   horizontalWallButton.remove();
  // }

  orientationChoice = null;

  if (pawnActive == pawn1) {
    enableButton(movePawn1Button);
    if (pawn1.wallsRem != 0) {
      enableButton(placeWall1Button);
    }
    disableButton(movePawn2Button);
    disableButton(placeWall2Button);
  } else {
    enableButton(movePawn2Button);
    if (pawn2.wallsRem != 0) {
      enableButton(placeWall2Button);
    }
    disableButton(movePawn1Button);
    disableButton(placeWall1Button);
    if (playWithComputer) {
      if (pawn2.wallsRem == 0) {
        setMovePawn();
      } else {
        Math.floor(Math.random() * 2) == 0 ? setMovePawn() : setPlaceWall();
      }
    }
  }

}

function setMovePawn() {
  // if (verticalWallButton && horizontalWallButton) {
  //   verticalWallButton.remove();
  //   horizontalWallButton.remove();
  // }
  orientationChoice = null;
  action = 'movePawn';
}

function setPlaceWall() {
  invalidateAllPositions()
  action = 'placeWall';
  orientationChoice = 'h';
  // chooseOrientation();
}

// ========== EVENTS ==========

function hoverOn() {
  if (
    mouseX > paddingLeft + squareSize * boardLength + spaceSize * (boardLength - 1) ||
    mouseX < paddingLeft ||
    mouseY > paddingTop + squareSize * boardLength + spaceSize * boardLength - 1 ||
    mouseY < paddingTop
  ) {
    hover = 'outside'
  }
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].onHover()) {
      hover = 'square';
    }

    if (
      mouseX > squares[i].position[0] + squareSize / 2 &&
      mouseX < squares[i].position[0] + squareSize / 2 + spaceSize &&
      mouseY > squares[i].position[1] - squareSize / 2 &&
      mouseY < squares[i].position[1] + squareSize / 2 &&
      squares[i].mPosition[0] != 9
    ) {
      hover = 'space';
    }

    if (
      mouseX > squares[i].position[0] - squareSize / 2 &&
      mouseX < squares[i].position[0] + squareSize / 2 &&
      mouseY > squares[i].position[1] + squareSize / 2 &&
      mouseY < squares[i].position[1] + squareSize / 2 + spaceSize &&
      squares[i].mPosition[1] != 9
    ) {
      hover = 'space';
    }

    if (
      mouseX > squares[i].position[0] + squareSize / 2 &&
      mouseX < squares[i].position[0] + squareSize / 2 + spaceSize &&
      mouseY > squares[i].position[1] + squareSize / 2 &&
      mouseY < squares[i].position[1] + squareSize / 2 + spaceSize &&
      (squares[i].mPosition[0] != 9 && squares[i].mPosition[1] != 9)
    ) {
      hover = 'intersection';
      nextWallPosI = squares[i].mPosition[0];
      nextWallPosJ = squares[i].mPosition[1];
    }
  }
}

function mouseWheel() {
  if (action == 'placeWall') {
    if (orientationChoice == 'v') {
      orientationChoice = 'h';
    } else {
      orientationChoice = 'v';
    }
  }
}

function keyPressed() {
  // change wall orientation
  if (keyCode === 32) {
    if (orientationChoice == 'v') {
      orientationChoice = 'h';
    } else {
      orientationChoice = 'v';
    }
  }
  // change action
  if (key == 'p') {
    setMovePawn();
  } else if (key == 'w') {
    setPlaceWall();
  }
}

// ========== CHECK WIN ==========

function checkWin() {
  if (pawn1.position[1] == 1) {
    winner = pawn1;
    endGame();
  } else if (pawn2.position[1] == 9) {
    winner = pawn2;
    endGame();
  }
}

// ========== INVALIDATE ALL POSITIONS ==========

function invalidateAllPositions() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].isValidPosition = false;
  }
}

function playWithComputerToggle() {
  if (this.checked()) {
    playWithComputer = true;
    disableInput(p2NameInput);
  } else {
    playWithComputer = false;
    enableInput(p2NameInput);
  }
}

// function chooseOrientation() {
//   if (verticalWallButton && horizontalWallButton) {
//     verticalWallButton.remove();
//     horizontalWallButton.remove();
//   }

//   verticalWallButton = createButton('Vertical');
//   horizontalWallButton = createButton('Horizontal');

//   if (pawnActive==pawn1) {
//     verticalWallButton.position(info1XPos, infoYPos+size*2);
//     horizontalWallButton.position(info1XPos, infoYPos+size*2.5);
//   } else {
//     verticalWallButton.position(info2XPos-size, infoYPos+size*2);
//     horizontalWallButton.position(info2XPos-size, infoYPos+size*2.5);
//   }

//   verticalWallButton.mousePressed(setWallOrientationVertical);
//   horizontalWallButton.mousePressed(setWallOrientationHorizontal);
// }

// function setWallOrientationVertical() {
//   orientationChoice = 'v';
// }

// function setWallOrientationHorizontal() {
//   orientationChoice = 'h';
// }