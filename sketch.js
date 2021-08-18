var car, road, obstacle1, obstacle2, obstacle3, a, b, gameOver; 
var car_image, road_image, obstacle1_image, obstacle2_image, obstacle3_image, a_image, b_image, gameover_image, horn_sound;  

var PLAY = 1; 
var END = 0; 
var gameState = PLAY; 

var distance = 0; 

function preload(){
  car_image = loadImage("Lamborghini.png"); 
  road_image = loadImage("Road.png");
  obstacle1_image = loadImage("obstacle1.png");
  obstacle2_image = loadImage("obstacle2.png");
  obstacle3_image = loadImage("obstacle3.png");
  gameover_image = loadImage("gameOver.png"); 
  a_image=loadImage("policecar1.png"); 
  b_image=loadImage("policecar2.png"); 
  car_horn=loadSound("Car Horn.mp3"); 
}

function setup() {
  createCanvas(1000,300);
  
  road = createSprite(100,150); 
  road.addImage(road_image); 
  
  car = createSprite(100,150,25,25); 
  car.addImage(car_image); 
  car.scale = 0.11;  
  
  gameOver = createSprite(500,150,25,25);
  gameOver.addImage(gameover_image); 
  
  obstacleGroup = new Group();
  policeGroup = new Group(); 
}

function draw() {
  background(0);

  drawSprites(); 
  
  textSize(22); 
  fill("White"); 
  text("Distance - "+distance,850,30)
  
  edges = createEdgeSprites(); 
  car.collide(edges); 
  
  if (gameState === PLAY){ 
    
    gameOver.visible = false;
    
    distance = distance+Math.round(getFrameRate()/60); 
    
    road.velocityX = -(6+2*distance/150);
    
    if (road.x < 0){
      road.x = width/2; 
    }
    
  if (keyDown("UP_ARROW")){
    car.y = car.y - 4; 
  }
  if (keyDown("DOWN_ARROW")){
    car.y = car.y + 4; 
  }
    
    if (keyDown("a"))
      {
        car_horn.play();   
      }
    
    var select_opponent = Math.round(random(1,2)); 
    
    if (World.frameCount%150===0){
        if(select_opponent===1){
            police1(); 
          }
        else{
            police2(); 
          }
      } 
    
    var select_obstacle = Math.round(random(1,3)); 
    
    if (World.frameCount%200===0){
        if(select_opponent===1)
          {
            obstacle_1(); 
          }
        else if (select_opponent===2)
          {
            obstacle_2(); 
          }
        else 
          {
            obstacle_3(); 
          }
      } 
    
    if (obstacleGroup.isTouching(car)||policeGroup.isTouching(car)){
      gameState=END; 
    }
  }
  
  if (gameState===END){
    road.velocityX = 0;
    gameOver.visible=true;  
    textSize(25); 
    fill("White"); 
    text("Press Space Key To Restart The Game",285,215); 
    
    obstacleGroup.setVelocityXEach(0); 
    obstacleGroup.setLifetimeEach(-1); 
    
    
      if (keyDown("space")){
  reset(); 
}
    
    policeGroup.setVelocityXEach(0); 
    policeGroup.setLifetimeEach(-1); 
  }
  
}

function obstacle_1(){ 
  obstacle1 = createSprite(950,Math.round(random(50,250)),25,25)
  obstacle1.addImage(obstacle1_image); 
  obstacle1.velocityX = -(7+2*distance/150); 
  obstacle1.lifetime = 150; 
  obstacleGroup.add(obstacle1); 
  obstacle1.scale = 0.15;
}

function obstacle_2(){ 
  obstacle2 = createSprite(950,Math.round(random(50,250)),25,25)
  obstacle2.addImage(obstacle2_image); 
  obstacle2.velocityX = -(7+2*distance/150); 
  obstacle2.lifetime = 150; 
  obstacleGroup.add(obstacle2); 
  obstacle2.scale = 0.15;  
}

function obstacle_3(){
  obstacle3 = createSprite(950,Math.round(random(50,250)),25,25)
  obstacle3.addImage(obstacle3_image); 
  obstacle3.velocityX = -(7+2*distance/150); 
  obstacle3.lifetime = 150; 
  obstacleGroup.add(obstacle3); 
  obstacle3.scale = 0.15;
}

function police1(){
  a = createSprite(1100,Math.round(random(50,250)),25,25); 
  a.addImage(a_image);
  a.velocityX = -(6+2*distance/150);
  a.scale = 0.175; 
  policeGroup.add(a); 
  a.lifetime = 175; 
}

function police2(){
  b = createSprite(1100,Math.round(random(50,250)),25,25); 
  b.addImage(b_image);
  b.velocityX = -(6+2*distance/150);
  b.scale = 0.175; 
  b.lifetime = 175; 
  policeGroup.add(b); 
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false; 
  obstacleGroup.destroyEach();
  policeGroup.destroyEach();
  distance = 0;
  car.y=150;
}
  