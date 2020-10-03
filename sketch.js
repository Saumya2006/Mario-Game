var bg
var ground
var groundImage
var marioImage, mario
var obstactImage
var obstacleGroup
var bricksGroup
var gameState = "play"
var marioCollided
var restart
var score = 0
function preload(){

    bg = loadImage("bg.png")
    groundImage = loadImage("ground2.png")
marioImage = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png")
restartImage = loadImage("restart.png")
marioCollided = loadAnimation("collided.png")
obstacleImage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
bricksImage = loadImage("brick.png")
jumpSound = loadSound("jump.mp3")
dieSound = loadSound("die.mp3")
brickSound = loadSound("checkPoint.mp3")
}
function setup(){
createCanvas(600,350)
ground = createSprite(200,330,400,200);
ground.addImage("ground",groundImage)
ground.x = ground.width/2
ground.velocityX = -5


mario = createSprite(50,295,20,50);
mario.addAnimation("running",marioImage)
mario.addAnimation("collided",marioCollided)
mario.scale = 1.5
obstacleGroup = new Group();
bricksGroup = new Group();
restart = createSprite(300,140)
restart.addImage(restartImage)
restart.visible = false;
}
function draw(){
background(bg)
textSize(25)
fill("black")
textFont("jokerman")
text("score:"+score,480,30)
if(gameState === "play"){
if(ground.x < 0){
    ground.x = ground.width/2
}
if(keyDown("space")){
    mario.velocityY = -12
    
if(mario.y < 120){
    jumpSound.play()
}
}
mario.velocityY = mario.velocityY+1
spawnObstacles();
spawnBricks()
if(obstacleGroup.isTouching(mario)){
    dieSound.play()
    gameState = "end"
    restart.visible = true
}
for(var i = 0;i<bricksGroup.length;i++){
    if(bricksGroup.get(i).isTouching(mario)){
        brickSound.play()
        bricksGroup.get(i).remove();
        score = score+1
    }
}
}
else if(gameState === "end"){
ground.velocityX = 0
mario.velocityY = 0
mario.changeAnimation("collided",marioCollided)
obstacleGroup.setVelocityXEach(0)
bricksGroup.setVelocityXEach(0)
obstacleGroup.setLifetimeEach(-1);
bricksGroup.setLifetimeEach(-1);
}

if(mousePressedOver(restart)){
    reset()
}
mario.collide(ground)
drawSprites()
}
function reset(){
    gameState = "play"
    restart.visible = false;
    obstacleGroup.destroyEach()
    bricksGroup.destroyEach()
    mario.changeAnimation("running",marioImage)
    score = 0

}
function spawnObstacles(){
    if(frameCount%60===0){
    var obstacle = createSprite(600,270,10,40)
    obstacle.velocityX = -6
    obstacle.addAnimation("obstacles",obstacleImage)
    obstacle.scale = 1
    obstacleGroup.add(obstacle)
}
}
function spawnBricks(){
    if(frameCount%60===0){
    var bricks = createSprite(600,100,40,10)
    bricks.velocityX = -6
    bricks.addImage(bricksImage)
    bricks.depth = mario.depth;
    mario.depth = mario.depth + 1
    bricks.y = Math.round(random(100,150))
    bricks.x = Math.round(random(500,600))
    bricksGroup.add(bricks)
}
}