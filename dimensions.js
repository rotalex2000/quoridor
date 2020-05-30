let
size = 80,

paddingTop = size*1.5,
paddingLeft = size*2.5,

squareSize = size*0.4,
spaceSize = size*0.1,
pawnSize = size*0.3,
wallSize = squareSize*2 + spaceSize,
boardSize = squareSize*9 + spaceSize*8,

canvasWidth = boardSize + paddingLeft*2,
canvasHeight = boardSize + paddingTop*2,

p1LabelVertPos = canvasHeight/2-size*1.8,
p2LabelVertPos = p1LabelVertPos+size*1.4,
pLabelHorizPos = canvasWidth/2-size,

infoYPos = size*0.2,
info1XPos = size*0.2,
info2XPos = canvasWidth - size*0.2;