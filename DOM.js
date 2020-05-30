let
playButton,
startButton,
restartButton,
playAgainButton,
movePawn1Button,
movePawn2Button,
placeWall1Button,
placeWall2Button,
verticalWallButton,
horizontalWallButton,

p1NameInput,
p2NameInput,

playWithCCheckbox;

function createPlayButton() {
    playButton = createButton('Play');

    playButton.style('padding', size*0.25 + 'px ' + size + 'px');
    playButton.style('background-color', wallColor);
    playButton.style('font-size', size*0.25 + 'px');
    playButton.style('color', squareColor);
    playButton.style('border', size*0.1 + 'px solid ' + squareColor);
    playButton.style('border-radius', size*0.1 + 'px');
    playButton.style('cursor', 'pointer');
    playButton.style('font-weight', 'bold');

    playButton.position(canvasWidth/2-size*1.3, canvasHeight/2);

    playButton.mousePressed(playGame);
}

function createP1NameInput() {
    p1NameInput = createInput();

    p1NameInput.style('width', size*3 + 'px');
    p1NameInput.style('padding', size*0.15 + 'px');
    p1NameInput.style('font-size', size*0.2 + 'px');
    p1NameInput.style('background-color', wallColor);
    p1NameInput.style('border', size*0.05 + 'px solid ' + squareColor);
    p1NameInput.style('border-radius', size*0.05 + 'px');
    p1NameInput.style('color', squareColor);
    p1NameInput.style('font-weight', 'bold');

    p1NameInput.position(pLabelHorizPos-size*1.65, p1LabelVertPos+size*0.3);
}

function createP2NameInput() {
    p2NameInput = createInput();

    p2NameInput.style('width', size*3 + 'px');
    p2NameInput.style('padding', size*0.15 + 'px');
    p2NameInput.style('font-size', size*0.2 + 'px');
    p2NameInput.style('background-color', wallColor);
    p2NameInput.style('border', size*0.05 + 'px solid ' + squareColor);
    p2NameInput.style('border-radius', size*0.05 + 'px');
    p2NameInput.style('color', squareColor);
    p2NameInput.style('font-weight', 'bold');

    p2NameInput.position(pLabelHorizPos-size*1.65, p2LabelVertPos+size*0.3);
}

function createPlayWithCCheckbox() {
    playWithCCheckbox = createCheckbox('Play with Computer', false);

    playWithCCheckbox.position(pLabelHorizPos+size*2, p2LabelVertPos+size*0.3);

    playWithCCheckbox.changed(playWithComputerToggle);
}

function createStartButton() {
    startButton = createButton('Start');

    startButton.style('padding', size*0.2 + 'px ' + size*0.75 + 'px');
    startButton.style('background-color', wallColor);
    startButton.style('font-size', size*0.25 + 'px');
    startButton.style('color', squareColor);
    startButton.style('border', size*0.05 + 'px solid ' + squareColor);
    startButton.style('border-radius', size*0.05 + 'px');
    startButton.style('cursor', 'pointer');
    startButton.style('font-weight', 'bold');
    
    startButton.position(pLabelHorizPos-size*1.05, p1LabelVertPos+size*2.7);

    startButton.mousePressed(startGame);
}

function createMovePawn1Button() {
    movePawn1Button = createButton('Move Pawn');

    movePawn1Button.style('padding', size*0.08 + 'px ' + size*0.12 + 'px');
    movePawn1Button.style('background-color', canvasColor);
    movePawn1Button.style('font-size', size*0.2 + 'px');
    movePawn1Button.style('color', 'white');
    movePawn1Button.style('border', size*0.04 + 'px solid ' + squareColor);
    movePawn1Button.style('border-radius', size*0.05 + 'px');
    movePawn1Button.style('font-weight', 'bold');

    movePawn1Button.position(info1XPos+size*0.15, infoYPos+size*0.84);

    movePawn1Button.mousePressed(setMovePawn);
}

function createMovePawn2Button() {
    movePawn2Button = createButton('Move Pawn');

    movePawn2Button.style('padding', size*0.08 + 'px ' + size*0.12 + 'px');
    movePawn2Button.style('background-color', canvasColor);
    movePawn2Button.style('font-size', size*0.2 + 'px');
    movePawn2Button.style('color', 'white');
    movePawn2Button.style('border', size*0.04 + 'px solid ' + squareColor);
    movePawn2Button.style('border-radius', size*0.05 + 'px');
    movePawn2Button.style('font-weight', 'bold');

    movePawn2Button.position(info2XPos-size*1.55, infoYPos+size*0.84);

    movePawn2Button.mousePressed(setMovePawn);
}

function createPlaceWall1Button() {
    placeWall1Button = createButton('Place Wall');

    placeWall1Button.style('padding', size*0.08 + 'px ' + size*0.17 + 'px');
    placeWall1Button.style('background-color', canvasColor);
    placeWall1Button.style('font-size', size*0.2 + 'px');
    placeWall1Button.style('color', 'white');
    placeWall1Button.style('border', size*0.04 + 'px solid ' + squareColor);
    placeWall1Button.style('border-radius', size*0.05 + 'px');
    placeWall1Button.style('font-weight', 'bold');

    placeWall1Button.position(info1XPos+size*0.15, infoYPos+size*1.39);

    placeWall1Button.mousePressed(setPlaceWall);
}

function createPlaceWall2Button() {
    placeWall2Button = createButton('Place Wall');

    placeWall2Button.style('padding', size*0.08 + 'px ' + size*0.17 + 'px');
    placeWall2Button.style('background-color', canvasColor);
    placeWall2Button.style('font-size', size*0.2 + 'px');
    placeWall2Button.style('color', 'white');
    placeWall2Button.style('border', size*0.04 + 'px solid ' + squareColor);
    placeWall2Button.style('border-radius', size*0.05 + 'px');
    placeWall2Button.style('font-weight', 'bold');

    placeWall2Button.position(info2XPos-size*1.55, infoYPos+size*1.39);

    placeWall2Button.mousePressed(setPlaceWall);
}

function createRestartButton() {
    restartButton = createButton('Restart Game');

    restartButton.style('padding', size*0.13 + 'px ' + size*0.2 + 'px');
    restartButton.style('background-color', wallColor);
    restartButton.style('color', squareColor);
    restartButton.style('font-size', size*0.2 + 'px');
    restartButton.style('border', size*0.05 + 'px solid ' + squareColor);
    restartButton.style('border-radius', size*0.05 + 'px');
    restartButton.style('cursor', 'pointer');
    restartButton.style('font-weight', 'bold');
    
    restartButton.position(info1XPos, canvasHeight-size*0.8);

    restartButton.mousePressed(restartGame);
}

function createPlayAgainButton() {
    playAgainButton = createButton('Play Again');

    playAgainButton.style('padding', size*0.15 + 'px ' + size*0.2 + 'px');
    playAgainButton.style('background-color', wallColor);
    playAgainButton.style('color', squareColor);
    playAgainButton.style('font-size', size*0.25 + 'px');
    playAgainButton.style('border', size*0.05 + 'px solid ' + squareColor);
    playAgainButton.style('border-radius', size*0.05 + 'px');
    playAgainButton.style('cursor', 'pointer');
    playAgainButton.style('font-weight', 'bold');
    playAgainButton.style('width', size*2 + "px");
    
    playAgainButton.position(canvasWidth/2 - size, canvasHeight/2+ size/3);

    playAgainButton.mousePressed(startGame);
}

function enableButton(button) {
    button.removeAttribute('disabled');
    button.style('cursor', 'pointer');
    button.style('opacity', '1');
}

function disableButton(button) {
    button.attribute('disabled', '');
    button.style('cursor', 'auto');
    button.style('opacity', '0.7');
}

function enableInput(input) {
    input.removeAttribute('disabled');
    input.style('opacity', '1');
}

function disableInput(input) {
    input.attribute('disabled', '');
    input.style('opacity', '0.7');
}