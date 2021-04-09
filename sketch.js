var PLAY = 1;
var END = 0;
var gameState = PLAY;

var runner, runnerImage;
var background, invisibleGround;
var haybariar;

var obstaclesGroup, obstacle;
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver, restart;


function preload(){
  jumpSound = loadSound("assets/sounds/jump.wav")
  collidedSound = loadSound("assets/sounds/collided.wav")
  
  backgroundImg = loadImage("sbgom.png");
  sunAnimation = loadImage("assets/sun.png");
  
  runnerImage = loadImage("player.png");
  
  haybariar=loadImage("hayb.png")
  
  
  
  
  
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  runner = createSprite(50,height-70,20,80);
  
  
  runner.addImage("running", runnerImage);
 runner.setCollider('circle',0,0,350)
  runner.scale = 0.1
  // trex.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false

 
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    
    if(keyDown("space") && runner .y  >= height-120) {
      jumpSound.play()
      runner.velocityY = -10;
       touches = [];
    }
    
    runner.velocityY = runner.velocityY + 0.8
  
    if (background.x < 0){
      background.x = background.width/2;
    }
  
    runner.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(runner)){
        collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    background.velocityX = 0;
    runner.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = 1;
    switch(rand) {
      case 1: obstacle.addImage(haybariar);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = runner.depth;
    runner.depth +=1;
    runner.scale=0.1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach()
  
  score = 0;
  
}
