// VARIABLES >>
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//CODE >>
$(document).keypress(function (){
    if (!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// sets user game pattern/other actions when clicked.
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

    console.log(userClickedPattern);
    console.log(userClickedPattern.slice(-1));
    console.log(gamePattern);
});

// FUNCTIONS >>
// sets the next in sequence/pattern and plays sound.
function nextSequence(){
    // Displays Next Level >>7
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    // Selects Random Color >>
    var randomNumber = Math.floor(Math.random()* 4);
    var randomChosenColour = buttonColours[randomNumber];
    // Adds Color to the Game Pattern >>
    gamePattern.push(randomChosenColour);
    // Animates the Selected Button >>
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // logs the current level >>
    console.log(level);
}

// plays sound when user clicks a button.
// Continues off of anyButtonClick() function.
function playSound(colourName){
    var audio = new Audio("sounds/" + colourName + ".mp3");
        audio.play();
}

// animates button click.
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    console.log(userClickedPattern[currentLevel]);
    console.log(gamePattern[currentLevel]);
   
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("Success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    
   }
   else {
    console.log("Wrong");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    setTimeout(function () {
        $("h1").text("Game Over, Press Any Key to Restart");
    }, 500);

    startOver();
    
}

}

function startOver() {
    level = 0;
    gamePattern = [];
    
    started = false;
}


