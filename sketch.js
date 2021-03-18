var balloon;
var database;
var balloonPosition;
var position;

function preload(){
  bgImage=loadImage("Hot Air Ballon-01.png");
  balloonImage=loadAnimation("Hot Air Ballon-02.png");
  balloonImage2=loadAnimation("Hot Air Ballon-03.png")
  balloonImage3=loadAnimation("Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(1300,630);
  database=firebase.database();
  balloonPosition=database.ref("balloon/height");
  balloonPosition.on("value",readHeight,showError);
 balloon=createSprite(400,600,70,100);
 balloon.addAnimation("hotAirBalloon",balloonImage);
}

function draw() {
  background(bgImage);
  text("Use arrow keys to move air balloon",150,30);
 
  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y=balloon.y-30;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10;
  }
  drawSprites();
}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x':height.x+x,
    'y':height.y+y
  })
}
function readHeight(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}
function showError(){
  console.log("Error in writing to the database");
}

