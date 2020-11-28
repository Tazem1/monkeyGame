
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var gameState;
var PLAY = 0;
var END = 1;
var wallGone;
var restart,restartImg
var bk,bkImg;

var stamina,staminaBar;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  restartImg = loadImage("904768-200.png");
  bkImg = loadImage("2a0e4aedfe11ec30c9fc5b6f20567479.jpg")
  
}



function setup() {
  monkey = createSprite(50,200,20,20)
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale = 0.15

  score = 0;
  
  bk = createSprite(200,200,20,20)
  bk.addImage("bk",bkImg);
  bk.scale = 1.75
 
  
  
  fill("black")
  
 
  
  gameState = PLAY;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  restart = createSprite(200,200,20,20)
  restart.addImage("hi",restartImg);
  restart.scale = 0.4
  
  stamina = 100;
  
  wallGone = createSprite(50,395,80,5)
  wallGone.visible = false;
  
  
}


function draw() {
  background(120,120,80)
 
  monkey.collide(wallGone)
monkey.depth = monkey.depth+2
  
   bk.velocityX = -2;
   
  
  if(bk.x<0){
    bk.x = bk.width/2
  }
  
  if(gameState === PLAY){
    monkey.velocityY = monkey.velocityY+0.8
    
    if(keyDown("space")&&monkey.y === 346.45){
      monkey.velocityY = -(stamina/5)
     stamina = stamina-5
    }
    
   if(stamina === 0){
    gameState = END
  }
    
    restart.visible = false;
    
    spawnObstacles();
    spawnFruit();
    staminaRating();
    
   if(obstaclesGroup.isTouching(monkey)){
     gameState = END
  } 
    
      if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score=score+1
      stamina = stamina+5
    }
    
  }
  else if(gameState === END){
    bk.velocityX = 0;
    foodGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    foodGroup.setLifetimeEach(-1);
    restart.visible = true;
    score = 0
    stamina = 100;
    if(mousePressedOver(restart)){
      gameState = PLAY
      foodGroup.destroyEach()
      obstaclesGroup.destroyEach()
      staminaBar.destroy();
      staminaBar = createSprite(300,50,stamina,25)
      staminaBar.destroy();
    }
    
  }
  
  drawSprites();
   textSize(25)
  text("score"+" "+"="+" "+score,50,40)
  text("stamina"+" "+"=",250,30)
}
function spawnFruit(){
  if(frameCount%60 === 0){
    banana = createSprite(400,random(30,300),20,20)
    banana.addImage("b",bananaImage)
    banana.scale = 0.15
    banana.velocityX= -3
    banana.lifetime = 200
    foodGroup.add(banana)   
    }
  }
function spawnObstacles(){
   if(frameCount%150 === 0){
     obstacle = createSprite(400,390,20,20)
     obstacle.scale = 0.15
     obstacle.addImage("me",obstaceImage)
     obstacle.velocityX = -3
     obstacle.lifetime = 200
     obstaclesGroup.add(obstacle);
     obstacle.setCollider("rectangle",0,0,125,125)
     
   }
}
function staminaRating(){
  
  
  
  if(stamina > 95){
     staminaBar = createSprite(300,50,stamina,25)
    staminaBar.shapeColor = "darkgreen";
    staminaBar.destroy();
  }
  
  staminaBar.depth = staminaBar.depth+3
  
  if(stamina < 95){
    staminaBar.destroy();
    staminaBar = createSprite(300,50,stamina,25)
    staminaBar.shapeColor = "green"; 
  }
  if(stamina < 75){
     staminaBar.destroy();
   staminaBar = createSprite(300,50,stamina,25)
    staminaBar.shapeColor = "lime";
    
  }
  if(stamina < 50 ){
    staminaBar.destroy();
    staminaBar = createSprite(300,50,stamina,25)
    staminaBar.shapeColor = "orange";
  }
  if(stamina < 25){
    staminaBar.destroy();
    staminaBar = createSprite(300,50,stamina,25)
    staminaBar.shapeColor = "red";
  }
}




