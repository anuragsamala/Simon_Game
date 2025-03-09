var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern = [];
var started=false;
function nextSequence() {
  userClickedPattern = [];
    level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#level-title").text("Level " + level);
   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  
}
$(".btn ").click(function(){
    //var userChosenColour = $(this).attr("id");//this refers to the clicked button and .attr("id") specofes the value of the clikced object id
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    
    console.log(userClickedPattern);
    var music=new Audio("sounds/"+userChosenColour+".mp3");
    music.play();
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    });
function animatePress(userChosenColour){
$("#"+userChosenColour).addClass("pressed");

setTimeout(function () {
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);
}
let flag=0;
var level=0;
$(document).keypress(function(){

    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;


});

function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    var music=new Audio("sounds/"+"wrong"+".mp3");
    music.play();
    setTimeout(function(){
      $(document).addClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    alert("You Lost");
    startover();
  }

}
function startover(){
  level=0;
  gamePattern=[];
  
  started=false;
}