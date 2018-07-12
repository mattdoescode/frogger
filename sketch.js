//Matthew Loewen
//NMD160 Frogger Assignemnt
//Last edit: 10/13/16 

//the player must move from the bottom of the screen to the top 5 times without using their 3 lives
//the game ends when the player has died 3 times or reached the top of the screen 5 times

//credit 
// NOTE: ALL IMAGES were modified from the original 
// white car:    http://www.clipartkid.com/images/131/car-top-view-clipart-panda-free-clipart-images-xowH1I-clipart.jpg
// red car:      http://www.gaddidekho.com/wp-content/uploads/2013/05/Ferrari-599-SA-Aperta-Top-View.jpg
// truck:        http://previews.123rf.com/images/blueringmedia/blueringmedia1412/blueringmedia141200379/34640969-Illustration-of-a-side-and-top-view-of-a-pickup-truck-Stock-Vector.jpg
// log:          https://primpingyourhomefavorites.files.wordpress.com/2015/09/old-man-in-log-back-view-of-his-bark-200-b-1300-x-1368-jpg.jpg
//lilly pad:     https://s-media-cache-ak0.pinimg.com/236x/7f/4e/49/7f4e4916cc64edd89678e1078b551cdc.jpg


//variables to store sprites
var playerIMG;
var largeLog;
var smallLog;
var carLeft;
var carRight;
var truck;

//boolean to show game screen or game over screen
var gameOn = true;

//variables that keep track of game time
var seconds;
var gameOverTime = 0.0;

//x and y pos of the player
var playerX, playerY;

//arrars that hold the car objects perlane
var carRow1 = [];
var carRow2 = [];
var carRow3 = [];
var carRow4 = [];
var carRow5 = [];

//x pos of the car objects
var carRow1X = 200;
var carRow2X = 100;
var carRow3X = 200;
var carRow4X = 150;
var carRow5X = 300;

//y pos of the car objects
var carRow1Y = 550;
var carRow2Y = 500;
var carRow3Y = 450;
var carRow4Y = 400;
var carRow5Y = 350;

//arrays the hold the logs and tutrles
var logRow1 = [];
var logRow2 = [];
var logRow3 = [];
var logRow4 = [];
var logRow5 = [];

//y post of the logs and tutrtles
var logRow1Y = 250;
var logRow2Y = 200;
var logRow3Y = 150;
var logRow4Y = 100;
var logRow5Y = 50;

//x pos of the car objects
var logRow1X = 200;
var logRow2X = 200;
var logRow3X = 200;
var logRow4X = 200;
var logRow5X = 200;

//is a collison happening with the water and or logs?
var waterCol = false;
var logCol = false;

//total playermoves this life
var playerMoves = 0;
//total moves
var totalPlayerMoves = 0;
//player lives
var playerLives = 3;

//how many times has the player reached the top of the screen?
var endTimes = 0;

//LOAD the sprites before starting the game
function preload()
{
  playerIMG = loadImage('image.png');
  largeLog = loadImage('logBig.png');
  smallLog = loadImage('logSmall.png');
  carLeft = loadImage('carLeft.png');
  carRight = loadImage('carRight.png');
  truck = loadImage('truck.png');
}

function setup() {
  //screen size
  createCanvas(600,700);
 
  //generate all of the objects
  //each takes in the xpos, ypos, and speed
  for(var i=0;i<3;i++)
  {
    carRow1[i]=new car1(carRow1X,carRow1Y,3.2);
    carRow1X +=200;
    
    carRow2[i]=new car2(carRow2X,carRow2Y,2.5);
    carRow2X +=200;
    
    carRow3[i]=new car1(carRow3X,carRow3Y,.8);
    carRow3X +=200;
    
    carRow4[i]=new car2(carRow4X,carRow4Y,5);
    carRow4X +=200;
    
    logRow3[i]=new log1(logRow3X,logRow3Y,2);
    logRow3X += 200;
    
    logRow5[i]=new log1(logRow5X,logRow5Y,4);
    logRow5X += 450;
    
    logRow2[i]=new log2(logRow2X,logRow2Y,3.5);
    logRow2X += 250;
  }
  for(i=0;i<2;i++)
  {
    //generate 2 cars in lane 5
    carRow5[i]=new car5(carRow5X,carRow5Y,4);
    carRow5X +=300;
    
    logRow4[i]=new log2(logRow4X,logRow4Y,2.5);
    logRow4X += 400;
  }
  
  for(i=0;i<4;i++)
  {
    logRow1[i]=new log1(logRow1X,logRow1Y,3);
    logRow1X += 250;
    
  }
  
  //sets the player in the center of the bottom on the screen
  playerX = width/2;
  playerY = height-100;
}


//GAME LOOP
function draw() 
{
  //if player has lives remaining 
  if(gameOn)
  {
    //every loop set collions back to 0
    waterCol = false;
    logCol = false;
    
    //draw the game backgrounds
    gameBackGround();
    
    //set the time counter back to 0 after a new game is started
    seconds = (millis()/1000) - gameOverTime;
  
    seconds = parseFloat(seconds).toFixed(2);

    //testing trying to figure out how to make the timer with only 2 decimal places
    //seconds = nf(3);
    //console.log(String.format("%.2f",seconds));
    
    //draw the cars
    showCarsLogs();
   
    //show the player
    player();
    
    //show text on the game screen 
    showText();
    
    //checks for log collision
    checkCollLogWater(0,50,width,250);
    
    //checks for water collion
    fallIn();
    
    //have we won yet?
    checkGameWin();
  }
  else
  {
    //show game over screen
    gameOver("vistory");  
  }
}


function gameBackGround()
{
  background(0);
  //safe areas
  fill(170,66,244);
  rect(0,600,width,50);
  rect(0,300,width,50);
  //road
  fill(30);
  rect(0,350,width,250);
  //water
  fill(24,129,249);
  rect(0,50,width,250);
}


//draws the player
function player()
{
  //load player image
  image(playerIMG,playerX,playerY);
  
  //if the player moves off the screen kill them
  if(playerX < -30 || playerX > width+30)
  {
    //lose a life function
    lossLife();
  }
}

//HANDLES PLAYER MOVEMENT + move counter
function keyPressed()
{
  //restart the game
  if(keyCode == BACKSPACE)
  {
    gameOn = true;
    gameOverTime = millis()/1000;
    totalPlayerMoves = 0;
  }
  
  //if the game should be played handle momement and invalid key entry
  if(gameOn)
  {
    //move right
    if(keyCode == RIGHT_ARROW && playerX < 550)
    {
      playerX += 25;
      playerMoves++;
    
    }
    //move left
    else if(keyCode == LEFT_ARROW && playerX > 0)
    {
      playerX -= 25;
      playerMoves++;
  
    }
    //move up
    else if(keyCode == UP_ARROW && playerY > 0)
    {
      playerY -= 50;
      playerMoves++;
    
    }
    //move down
    else if(keyCode == DOWN_ARROW && playerY < 600)
    {
      playerY += 50;
      playerMoves++;
  
    }
    //don't let the player move off of the screen
    else if(keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW || keyCode == UP_ARROW || keyCode == DOWN_ARROW)
    {
      console.log("can not move off screen");
      return 0;
    }
    //invalid key entry detection
    else
    {
      console.log("Invalid Key");
      return 0;
    }
    //print out the total player moves to the concole //more of a testing thing
    //console.log("Player Moves: "+ playerMoves);
  }
}

//displays all of the objects and moves them
function showCarsLogs()
{
  for(var i=0; i < carRow1.length; i++)
  {
    carRow1[i].drive();
    carRow1[i].display();
  }
  for(i=0; i < carRow2.length; i++)
  {
    carRow2[i].drive();
    carRow2[i].display();
  }
  for(i=0; i < carRow3.length; i++)
  {
    carRow3[i].drive();
    carRow3[i].display();
  }
  for(i=0; i < carRow4.length; i++)
  {
    carRow4[i].drive();
    carRow4[i].display();
  }  
  for(i=0; i < carRow5.length; i++)
  {
    carRow5[i].drive();
    carRow5[i].display();
  }
  for(i=0;i<logRow1.length;i++)
  {
    logRow1[i].drive();
    logRow1[i].display();
  }
  for(i=0;i<logRow2.length;i++)
  {
    logRow2[i].drive();
    logRow2[i].display();
  }
  for(i=0;i<logRow3.length;i++)
  {
    logRow3[i].drive();
    logRow3[i].display();
  }
  for(i=0;i<logRow5.length;i++)
  {
    logRow5[i].drive();
    logRow5[i].display();
  }
  for(i=0;i<logRow4.length;i++)
  {
    logRow4[i].drive();
    logRow4[i].display();
  }
  
}

// car constructor
function car1(xpos,ypos,speedCar)
{
  //converts in given paramaters for local use
 this.xpos = xpos;
 this.ypos = ypos;
 this.speed = speedCar;

 // drive method
 this.drive = function()
 {
   //if it drives off of the screen reset
   if(this.xpos > width)
   {
     this.xpos = -250; // start offscreen
   }
   //move the car in 
   this.xpos += this.speed;  
   //check for collions for with the object
   checkColl(this.xpos,this.ypos,50);
 }

 // display method
 this.display = function()
 {
    //calls the car sprite and places it
    image(carRight,this.xpos,this.ypos);
 }
}

//see car 1
function car2(xpos,ypos,speedCar)
{
 this.xpos = xpos;
 this.ypos = ypos;
 this.speed = speedCar;

 // drive method
 this.drive = function()
 {
   if(this.xpos < -50)
   {
     this.xpos = 1000; // start offscreen
   }
   this.xpos -= this.speed;
   checkColl(this.xpos,this.ypos,50);
 }

 // display method
 this.display = function()
 {
    image(carLeft,this.xpos,this.ypos);
    // body of the car
    //fill(150);
    //rect(this.xpos, this.ypos, 50, 50);
 }
}


//see car 1
function car5(xpos,ypos,speedCar)
{
 this.xpos = xpos;
 this.ypos = ypos;
 this.speed = speedCar;

 // drive method
 this.drive = function()
 {
   if(this.xpos > width)
   {
     this.xpos = -250; // start offscreen
   }
   this.xpos += this.speed;
   checkColl(this.xpos,this.ypos,100);
 }

 // display method
 this.display = function()
 {
    // body of the car
    //fill(60);
    //rect(this.xpos, this.ypos, 100, 50);
    image(truck,this.xpos,this.ypos);
 }
}

//see car 1
function log1(xpos,ypos,speedLog)
{
  this.xpos = xpos;
  this.ypos = ypos;
  this.speed = speedLog;
  

 //move method
 this.drive = function()
 {
   if(this.xpos < -150)
   {
     this.xpos = 1050; // start offscreen
   }
   
   if(checkCollLog(this.xpos,this.ypos,100))
   {
     playerX -= this.speed;
   }
   this.xpos -= this.speed;
 }
 // display method
 this.display = function()
 {
    image(smallLog,this.xpos,this.ypos);
    // body of the car
    //fill(145,114,37);
    //rect(this.xpos, this.ypos, 100, 50);
 }
}

//see car 1
function log2(xpos,ypos,speedLog)
{
  this.xpos = xpos;
  this.ypos = ypos;
  this.speed = speedLog;
  
 //move method
 this.drive = function()
 {
   if(this.xpos > width+50)
   {
     this.xpos = -300; // start offscreen
   }
   this.xpos += this.speed;
   if(checkCollLog(this.xpos,this.ypos,150))
   {
     playerX += this.speed;
   }
 }
 
 // display method
 this.display = function()
 {
    image(largeLog,this.xpos,this.ypos);
    // body of the log
    //fill(145,114,37);
    //rect(this.xpos, this.ypos, 150, 50);
 }
}

//collision detection for the cars if any kind of touch player will die
function checkColl(xPosC,yPosC,widthC)
{
  if(playerX + 10 < xPosC + widthC && playerX + 50 -10 > xPosC && playerY < yPosC + 50 && 50 + playerY > yPosC )
  {
    lossLife();
  }
}

//check for a collision with a log 
function checkCollLog(xPosC,yPosC,widthC)
{
  //CHANGED detection so that the player must at least be 50% on the log
  if(playerX + 15 < xPosC + widthC && playerX + 50 - 15 > xPosC && playerY < yPosC + 50 && 50 + playerY > yPosC )
  {
    logCol = true;
    return 1; 
  }
}

//check for a collion with the water and the player
function checkCollLogWater(xPosC,yPosC,widthC,heightC)
{
  if(playerX < xPosC + widthC && playerX + 50 > xPosC && playerY < yPosC + heightC && 50 + playerY > yPosC)
  {
    waterCol= true;
  }
}

//resets the player to the start or ends the game depending on the number of lives
function lossLife()
{
  playerLives -= 1;
  totalPlayerMoves += playerMoves;
  playerMoves = 0;
  if(playerLives <= 0)
  {
    gameOver("loss");
  }
  else
  {
    console.log("Player Lives Remaining " + playerLives);
  }
  playerX = width/2;
  playerY = height-100;
}

//should the frog be killed when over the water?
function fallIn()
{
  //if the frog has a collison with the water but not a log kill the player
  if(logCol == false && waterCol == true)
  {
    lossLife();
  }
}

//if the player reaches the top of the screen increase the top reached amount 
//if the player has done this 5 times they win!
function checkGameWin()
{
  if(playerY <= 25)
  {
    endTimes++;
    playerY = height-100;
  }
  if(endTimes >= 5)
  {
    textSize(48);
    text("GAME WON!!!!",width/2 - 150,height/2-8)
  }
}


function showText()
{
  fill(255);
  textSize(18);
  text("Total Time (S): "+ seconds, 10, 670);
  text("Lives Remaining: " + playerLives,10,690);
  textSize(24);
  text("Reach me 5 times to win!",150,20);
  text(endTimes + " of 5",250,44);
}

//reset everything and show the gameover screen
function gameOver(winCondition)
{
  gameOn = false;
  playerLives = 3;
  endTimes = 0;
  
  background(0);
  textSize(40);
  text("Total Moves: "+ totalPlayerMoves,30,40);
  text("Total Time (S): "+ seconds, 30, 120);
  if(winCondition == "victory"){
    text("Game WON!", 30, 200); 
  }else{
    text("Game OVER!", 30, 200); 
  }
  text("Crossing Amount: "+ endTimes,30, 280);
  text("Backspace to play again", 30, 400);
  text("Matthew Loewen",100,600);
}