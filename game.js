var buttonColours=["red","blue","green","yellow"];
var gameSequence=[];
var userClickedPattern=[];
var level=0;

function nextSequence(){
  userClickedPattern=[];
  var randomNumber= Math.floor(Math.random()*4);
  gameSequence.push(buttonColours[randomNumber]);

  $("h1").text("Level "+level);
  level++;
  playSound(buttonColours[randomNumber]);

  $("#"+buttonColours[randomNumber]).fadeOut();

  setTimeout(function(){
    $("#"+buttonColours[randomNumber]).fadeIn();
  }  ,100);
}

function playSound(name){
  var sound1= new Audio('sounds/'+name+'.mp3');
  sound1.play();
}

function onClick(idOfButton){
  $("#"+idOfButton).addClass("pressed");
  setTimeout(function(){
    $("#"+idOfButton).removeClass("pressed");
  }  ,100);
}

$(document).on("keydown",function(){
  nextSequence();
})

$(".btn").on("click",function(event){
  userChosenColour=event.target.id;
  userClickedPattern.push(userChosenColour);
  for(var i=0;i<userClickedPattern.length;i++){
    if(userClickedPattern[i]!==gameSequence[i]){
      playSound('wrong');
      gameSequence=[];
      level=0;
      $("h1").text("press any key to begin");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }  ,200);
    }
    else if(i+1===gameSequence.length){
      nextSequence();
    }
  }
  playSound(userChosenColour);
  onClick(userChosenColour);
})
