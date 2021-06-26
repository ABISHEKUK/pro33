var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score =0;
var particle;
var score =0;
var count = 0;
var gameState ="start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //create division objects
  for (var k = 0; k <=80; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var k = 10; k <=100; k = k + 100) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }
  for(var d=0; d<=width; d=d+80)
   {
     divisions.push(new Divisions(d,height-divisionHeight/2,10,divisionHeight));
   }
  //create 1st row of plinko objects
  for (var j = 75; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  //create 2nd row of plinko objects
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  } 

  //create 3rd row of plinko objects
  for (var j = 25; j <=width-20; j=j+50) 
  {
    plinkos.push(new Plinko(j,275));
  }
  
  //create 4th row of plinko objects
  for (var j = 10; j <=width-30; j=j+50) 
  {
    plinkos.push(new Plinko(j,375));
  }

 
  
    
}
 


function draw() {
  background("black");
  textSize(30)
  text("Score : "+score,20,30);
  fill("white");
  
  textSize(35)
  text(" 500 ", 5, 530);
  text(" 500 ", 80, 530);
  text(" 500 ", 160, 530);
  text(" 500 ", 240, 530);
  text(" 100 ", 320, 530);
  text(" 100 ", 400, 530);
  text(" 100 ", 480, 530);
  text(" 200 ", 560, 530);
  text(" 200 ", 640, 530);
  text(" 200 ", 720, 530);
  Engine.update(engine);
  ground.display();
  
  if (gameState =="end") {
    
    textSize(35);
    text("GameOver", 280, 220);
    
  }

  if(score>=2500){
    textSize(50);
    text("You Won",280,350)
    gameState="end";
  }

  

  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
  }
 
    if(particle!=null)
    {
       particle.display();
        
        if (particle.body.position.y>500)
        {
              if (particle.body.position.x < 300) 
              {
                  score=score+500;      
                  particle=null;
                  if ( count>= 5) gameState ="end";                          
              }          
              else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) 
              {
                    score = score + 100;
                    particle=null;
                    if ( count>= 5) gameState ="end";

              }
              else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
              {
                    score = score + 200;
                    particle=null;
                    if ( count>= 5)  gameState ="end";

              } 
        }
      }

   for (var k = 0; k < divisions.length; k++) 
   {
     divisions[k].display();
   }
 
}


function mousePressed()
{
  if(gameState!=="end")
  {
      count++;
     particle=new Particle(mouseX, 10, 10, 10); 
  }   
}