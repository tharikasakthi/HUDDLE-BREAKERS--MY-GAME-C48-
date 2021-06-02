var boy, bg, pond,edges;
var boyImg, bgImg, pondImg, groud;
var vaccine, vaccineImage,corona ,coronaImage;
var vaccinesGroup, coronasGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var life=0;

function preload(){
  boyImg=loadImage ("sprites/boy.png");
  bgImg= loadImage ("sprites/BG.jpg ");
  vaccineImage=loadImage ("sprites/vaccine.png");
  coronaImage=loadImage ("sprites/corona.png");
  gameOverImg=loadImage ("sprites/gameOver.jpg");
}

function setup() {

  createCanvas(1000,700);

  bg= createSprite(700, 350, 50, 50);
  bg.addImage(bgImg);
  bg.scale=3.3;

  boy= createSprite(50,630, 25,25)
  boy.addImage(boyImg)
  boy.scale=0.7;
  bg.velocityX=-10 ;
  boy.debug=true;
  boy.setCollider("circle",0,0,120);

  ground=createSprite(500,690,1000,20);
  ground.visible = true;

  gameOver=createSprite(500,350,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale=1.8;
  gameOver.visible=false ;

  vaccinesGroup=new Group();
  coronasGroup=new Group();
}


function draw() {
  background(20,255,255);  

  edges= createEdgeSprites();
  boy.bounceOff(edges,true);

  console.log(gameState);

  if (gameState=== PLAY){
      boy.visible=true;

  if(bg.x<0 ){
      bg.x=bg.width /2 ;
  }

  console. log(boy.y );

  if(keyDown ("space")&& boy.y>=470){
      boy.velocityY=-20;
  }

  boy.velocityY = boy.velocityY + 1

  spawnVaccine();
  spawnCorona();

  if (vaccinesGroup.isTouching(boy)){
      life=life+5 ;
  }

  if (coronasGroup.isTouching(boy)){
      gameState=END;
  }

 }

  else if(gameState===END){
      bg.velocityX=0;
      boy.velocity=0;
  
      boy.scale=0.5;
  
      gameOver.visible=true;


    vaccinesGroup.destroyEach();
    coronasGroup.destroyEach();  
    vaccinesGroup.setVelocityXEach=0;
    coronasGroup.setVelocityXEach=0;


    if(mousePressedOver(gameOver)){
      reset ();
    }

 }

  drawSprites();

  textSize(35);
  fill(0);
  text("LIFE: "+life,800,60);
}

function spawnVaccine () {
  
  if (frameCount % 250 === 0) {
    var vaccine = createSprite(1000,650,40,10);
    
    vaccine.addImage(vaccineImage);
    vaccine.scale = 0.3;
    vaccine.velocityX = -9-life/50; 
    vaccine.lifetime = 170;
    vaccine.depth = boy.depth;

    boy.depth = boy.depth + 1;
    
    vaccinesGroup.add(vaccine);
  }
}


function spawnCorona () {
  
  if (frameCount % 150 === 0) {
    var corona = createSprite(1000,650,40,10);
    corona.addImage(coronaImage);
    corona.scale = 0.3;
    corona.velocityX = -8-life/100;
    corona.debug=true;
    corona.setCollider("circle",0,0,150);
    corona.lifetime = 130;
    
    corona.depth = boy.depth;
    boy.depth = boy.depth + 1;
    
    coronasGroup.add(corona);
  }
}

function reset (){

  gameState= PLAY;
  gameOver.visible=false;
  
}







