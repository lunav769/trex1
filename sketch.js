var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstacles;
var score=0;
var score;
var obstaclesGroup,cloudsGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameObear, gameObearImg;
var restart, restartImg;
var jumpsound,diesound, checkpointsound;
var backgroundIMG;
var sun;

function preload(){
  sunAnimation=loadImage("sun.png");
  trex_running = loadAnimation("trex_1.png","trex_2.png");
  trex_collided = loadAnimation("dog.png");
  backgroundIMG=loadImage("backgroundImg.png");
  groundImage = loadImage("ground.png");
  cloudImage  = loadImage("cloud.png");
  restartImg=loadImage("restart.png")
 gameObearImg=loadImage("gameOver.png");
  obstacle1= loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3= loadImage("obstacle3.png");
  obstacle4= loadImage("obstacle4.png");
  obstacle5= loadImage("obstacle5.png");
  obstacle6= loadImage("obstacle6.png");
  jumpsound= loadSound("jump.mp3");
  checkpointsound= loadSound("checkpoint.mp3");
  diesound= loadSound("die.mp3");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  sun=createSprite(width-50,100,10,10);
  sun.addAnimation("sun",sunAnimation);
  sun.scale=0.1;

  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.08;
  trex.debug=false;
  trex.setCollider("circle",0,0,40)
  //crear sprite de suelo
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  gameObear=createSprite(width/2,height/2-50);
  gameObear.addImage(gameObearImg);
gameObear.scale=0.5;
  restart=createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.scale=0.1;
  //crear sprite de suelo invisible
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  //generar números aleatorios
  obstaclesGroup=new Group();
  cloudsGroup=new Group();

}

function draw() {
  //establecer color de fondo
  background(backgroundIMG);
  textSize(20);
  fill("black");
  text("puntuación  "+score,30,50);
 

  if(gameState === PLAY){
    gameObear.visible=false;
    restart.visible=false;
    ground.velocityX = -(4+3*score/100); 
    score=score+Math.round(frameCount/60);
    if(score>0 && score%100===0){
      checkpointsound.play();
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(touches.length>0 && trex.y >= 120 || keyDown("space") ) {
      trex.velocityY = -10;
      jumpsound.play();
      touches=[]
    }
    
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();
  spamobstacles();
  if (obstaclesGroup.isTouching(trex)){
    gameState=END
    diesound.play();
  }
  }
  else if(gameState=== END){
    gameObear.visible=true;
    restart.visible=true;
    ground.velocityX = 0;
    trex.velocityY=0;
    
    trex.changeAnimation( "collided",trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    if (mousePressedOver(restart)){
      resed();
      touches=[]
    }
    if (touches.length>0){
      resed();
      touches=[]
    }
  
  }
  
  
  
  //hacer que el trex salte al presionar la barra espaciadora
  
  

  
  //evitar que el trex caiga
  trex.collide(invisibleGround);
  
  //aparecer nubes
  
  drawSprites();
}

//función para aparecer las nubes
function spawnClouds(){
 //escribir aquí el código 
 if (frameCount %60===0){
 cloud=createSprite(width+20,height-300,40,10);
 cloud.addImage(cloudImage);
 cloud.velocityX=-5; 
 cloud.lifetime=300;
  cloud.y= Math.round(random(100,220))
  cloud.depth=trex.depth
  trex.depth=trex.depth+1
  cloudsGroup.add(cloud);
}
}
function spamobstacles (){
  if (frameCount %60===0){
    obstacles=createSprite(600,height-95,20,30);
    //obstacles.addImage(cloudImage);
    obstacles.velocityX=-(6+score/100); 
    obstacles.scale=0.3;
    obstacles.lifetime=300;
    var rand=Math.round(random(1,2))
    switch(rand){
      case 1: obstacles.addImage(obstacle1);
              break;
      case 2: obstacles.addImage(obstacle2);
              break;
     
      
      
    }
    obstacles.depth=trex.depth;
   trex.depth=trex.depth+1;
   obstaclesGroup.add(obstacles);
   }
   
}
function resed(){
  gameState=PLAY;
  gameObear.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  score=0;
}

