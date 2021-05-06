class Food{
    constructor(){
        this.image = loadImage("Milk.png");
        this.foodstock = 0;
    }

display(){
 var x = 80, y = 150;

 imageMode(CENTER);

 if(this.foodstock != 0){
     for(var i=0;i < this.foodstock;i++){
         if(i%10 === 0){
             x = 80;
             y = y + 50;
         }
         image(this.image,x,y,50,50);
         x = x+30;
     }
 }
}

updateStock(foodstock){
    this.foodstock = foodstock;
}

} 