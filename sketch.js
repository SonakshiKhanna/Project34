//Create variables here
var database;
var img, dog, happyDog, foodS,foodStock,textColor,value;

function preload(){
  img = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
    
  database = firebase.database();
  
  dog = createSprite(200,200,10,10);
  dog.addImage(img);
  dog.scale = 0.15
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  //add styles here
  fill("white");
  text("Food remaining:" + foodS,200,100);
  textSize(100);
  stroke(0);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
  
}