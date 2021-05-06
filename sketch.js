//Create variables here
var dog
var happydog
var database
var foods = 0;
var foodstock
var FoodMilk
var lastFed
var fedTime

function preload() {
  dogImg = loadImage("dogImg.png");
  dogImg1 = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(800, 500);
  
  dog = createSprite(550,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2

  database = firebase.database();
  foodstock = database.ref('food');
  foodstock.on("value",readStock);

  button = createButton(' Add Food ');
  button.position(500,100);

  button2 = createButton( 'Feed Food ');
  button2.position(600,100);

  button.mousePressed(addFood);
  button2.mousePressed(feedFood);

  FoodMilk = new Food();

}

function draw() { 
  
  background(46,139,87);


  textSize(20);
  fill("black");
  text("food left: " + foods, 20,50);
  text("Last fed at " + lastFed + " o' clock", 20, 100)

  FoodMilk.display();

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
   lastFed = data.val();
  });

  drawSprites();
  
}

function readStock(data){
  foods = data.val();
  FoodMilk.updateStock(foods);
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    food:x
  })
}

function addFood(){
  dog.addImage(dogImg);
  foods = foods + 1;
  database.ref('/').update({
    food: foods
  })
}

function feedFood(){
  dog.addImage(dogImg1);
  foods = foods - 1;
  database.ref('/').update({
    food: foods,
    feedTime: hour()
  })
}

