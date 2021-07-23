var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 3;
var cashG,diamondsG,jwelleryG,swordGroup;
var virus,virusImg,virusGroup;
var medi,mediImg,mediGroup;
var end;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
  virusImg = loadImage("virus.png");
  mediImg = loadImage("medi.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.debug = true;
  
end = createSprite(800,400);
end.addImage(endImg);
end.visible=false;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
virusGroup=new Group();
mediGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  createCash();
    createSword();

    if(treasureCollection===0){
      gameState=END;
    }

    if (mediGroup.isTouching(boy)) {
      mediGroup.destroyEach();
      treasureCollection=treasureCollection+1;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(virusGroup.isTouching(boy)) {
        treasureCollection +=-1;       
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        virusGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
        virusGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Immunity: "+ treasureCollection,150,30);
  }

  if(gameState===END){
    virusGroup.destroyEach();
        
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    virusGroup.setVelocityYEach(0);
    boy.destroy();
    end.visible = true;
  }

if(gameState===END&& keyDown("up")){
  restart();
  boy.scale = 0.8;

  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var medi = createSprite(Math.round(random(50, 350),40, 10, 10));
  medi.addImage(mediImg);
  medi.scale=0.12;
  medi.velocityY = 3;
  medi.lifetime = 300;
  mediGroup.add(medi);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 300;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 300;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 100 == 0) {
  var virus = createSprite(Math.round(random(50, 350),40, 10, 10));
  virus.addImage(virusImg);
  virus.scale=0.1;
  virus.velocityY = 3;
  virus.lifetime = 300;
  virusGroup.add(virus);
  }
}

function restart(){
  gameState=PLAY;
  jwelleryG.destroyEach();
  swordGroup.destroyEach();
  cashG.destroyEach();
  diamondsG.destroyEach();
  treasureCollection = 0;
  boy.addAnimation("SahilRunning", boyImg);
}