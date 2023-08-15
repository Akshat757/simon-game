var buttonColors= ["red", "blue", "green", "yellow"];

var userClickedPattern=[];

var gamePattern=[];

var gamePattern1=[];

var level=-1;
var score=0;

var started=false;

function nextSequence(){
    var randomNumber= Math.floor(Math.random() * 4);
    console.log("randomNumber=  "+randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    console.log("randomChosenColor=  "+randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log("initialized new gamePattern for level "+level+" :"+gamePattern);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++;

    $("h1").text("level "+level);


   }

   $(".btn").click(function(event){
    
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    console.log("userClickedPattern  " + userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(level,userChosenColor);
    });

    function playSound(name){
        var sound = new Audio("sounds/" + name + ".mp3");
     sound.play();
    }


    function animatePress(currentColor){
            $("#"+currentColor).addClass("pressed");
           setTimeout(function(){$("#"+currentColor).removeClass("pressed")} , 100);
            
    }


   

 $(document).keydown(function gameStarted(){
     if(started===false){
        nextSequence();
        started = true;
        $("h1").text("level 0");
     }

 });

 function checkAnswer(userChosenColor){

   if(userChosenColor===gamePattern[0]){
    gamePattern1.push(gamePattern.shift());
    
      console.log("your current click is right remaining pattern :"+gamePattern);
      
      if(gamePattern.length===0){
       
        console.log("success");
        score=score+100;
        $("h2").text("Score="+ score);

        while(gamePattern1.length!=0){
        gamePattern.push(gamePattern1.shift());
        }

        console.log("copied game pattern  :"+gamePattern);

        setTimeout(function(){ nextSequence();} , 1000);
    
      }


   /*  pattern- red , green 
    first click= red 
  checks ( red = red)
  remove red from pattern and store in pattern1
  second click = green 
  checks green = green 
  remove green from pattern and store in pattern1
  pattern = pattern1
  pattern1 ko empty kardo
  */

   }
   else{
    console.log("failure");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")},1000);

    $("h1").text("Game Over! press any key to restart");
    started=false;
    level=0;
    gamePattern=[];
    $("h2").text("Score = 0");

    /* 1st h1 will change
       2nd level =0
       3rd gamepattern =[] empty array
       4th started = false*/
   }

 }


