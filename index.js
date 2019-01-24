var Word = require("./word.js");
var inquirer = require("inquirer");

var wordChoices = ["Love Me Do", "From Me to You", "Thank You Girl", "She Loves You", "I'll Get You", "I Saw Her Standing There", "Misery", "Ask Me Why", "Please Please Me", "P.S. I Love You", "Do You Want to Know a Secret", "There's a Place", "I Want to Hold Your Hand", "This Boy", "It Won't Be Long", "All I've Got to Do", "All My Loving", "Little Child", "Hold Me Tight", "I Wanna Be Your Man", "Not a Second Time", "I Call Your Name", "A Hard Day's Night", "I Should Have Known Better", "If I Fell", "I'm Happy Just to Dance with You", "And I Love Her", "Tell Me Why", "Can't Buy Me Love", "Any Time at All", "I'll Cry Instead", "Things We Said Today", "When I Get Home", "You Can't Do That", "I'll Be Back", "I Feel Fine", "She's a Woman", "No Reply", "I'm a Loser", "Baby's in Black", "I'll Follow the Sun", "Eight Days a Week", "Every Little Thing", "I Don't Want to Spoil the Party", "What You're Doing", "Help!", "The Night Before", "You've Got to Hide Your Love Away", "Another Girl", "You're Going to Lose That Girl", "Ticket to Ride", "Tell Me What You See", "I've Just Seen a Face", "Yesterday", "Yes It Is", "I'm Down", "Drive My Car", "Norwegian Wood (This Bird Has Flown)", "You Won't See Me", "Nowhere Man", "The Word", "Michelle", "What Goes On", "Girl", "I'm Looking Through You", "In My Life", "Wait", "Run for Your Life", "Day Tripper", "We Can Work It Out", "Paperback Writer", "Rain", "Eleanore Rigby", "I'm Only Sleeping", "Here, There, and Everywhere", "Yellow Submarine", "She Said She Said", "Good Day Sunshine", "And Your Bird Can Sing", "For No One", "Doctor Robert", "Got to Get You into My Life", "Tomorrow Never Knows", "Penny Lane", "Strawberry Fields Forever", "Sgt. Pepper's Lonely Hearts Club Band", "With a Little Help from My Friends", "Lucy in the Sky with Diamonds", "Getting Better", "Fixing a Hole", "She's Leaving Home", "Being for the Benefit of Mr. Kite!", "When I'm Sixty-Four", "Lovely Rita", "Good Morning Good Morning", "A Day in the Life", "Magical Mystery Tour", "The Fool on the Hill", "Your Mother Should Know", "I Am the Walrus", "Hello Goodbye", "Baby You're a Rich Man", "All You Need Is Love", "Lady Madonna", "All Together Now", "Hey Bulldog", "Hey Jude", "Revolution", "Back in the U.S.S.R.", "Dear Prudence", "Glass Onion", "Ob-La-Di, Ob-La-Da", "Wild Honey Pie", "The Continuing Story of Bungalow Bill", "Happiness Is a Warm Gun", "Martha My Dear", "I'm So Tired", "Blackbird", "Rocky Raccoon", "Why Don't We Do It in the Road?", "I Will", "Julia", "Birthday", "Yer Blues", "Mother Nature's Son", "Everybody's Got Something to Hide Except Me and My Monkey", "Sexy Sadie", "Helter Skelter", "Honey Pie", "Cry Baby Cry", "Good Night", "Come Together", "Maxwell's Silver Hammer", "Oh! Darling", "I Want You (She's So Heavy)", "Because", "You Never Give Me Your Money", "Sun King", "Mean Mr. Mustard", "Polythene Pam", "She Came in Through the Bathroom Window", "Golden Slumbers", "Carry That Weight", "The End", "Her Majesty", "Get Back", "Dig a Pony", "The Long and Winding Road", "Two of Us", "I've Got a Feeling", "One After Nine-O-Nine", "Don't Let Me Down", "The Ballad of John and Yoko", "Across the Universe", "Let It Be", "You Know My Name (Look Up the Number)", "Don't Bother Me", "I Need You", "You Like Me Too Much", "Think for Yourself", "If I Needed Someone", "Taxman", "Love You To", "I Want to Tell You", "Within You Without You", "Flying", "Blue Jay Way", "The Inner Light", "Only a Northern Song", "It's All Too Much", "While My Guitar Gently Weeps", "Piggies", "Long, Long, Long", "Savoy Truffle", "Something", "Here Comes the Sun", "For You Blue", "Old Brown Shoe", "I Me Mine", "Dig It", "Don't Pass Me By", "Octopus's Garden"];
var wordSelected;
var letterArr = [""];
var guessRem = 9;
var wins = 0;
var losses = 0;

//Selects the song from the array and makes it into a new Word object.
function wordGenerator () {
    var index = Math.floor(Math.random() * wordChoices.length);
    wordSelected = new Word(wordChoices[index]);
}

//Starts / Restarts the game.
function newGame () {
    guessRem = 9;
    letterArr = [""];
    console.log("\r\nNew Beatles song!\r\n");
    wordGenerator();
    console.log(wordSelected.wordShower() + "\r\n");
    letterGuess();
}

//Gives the user the option to play again when they win or lose.
function playAgain () {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to play again?",
            name: "again",
            default: true
        }
    ]). then(function(input) {
        if(input.again === true) {
            newGame();
        } else {
            console.log("\r\nThanks for playing!");
        }
    });
}

//Displays the number of wins and losses at the end of each round.
function winLoss () {
    console.log("Wins: " + wins + "   Losses: " + losses + "\r\n");
}

//Function for the user guessing a letter.  Validates to make sure it is the correct length.
function letterGuess () {
    inquirer.prompt([
        {
            type: "input",
            message: "Guess a letter! ",
            name: "letter",
            validate: function validateLetter (letter) {
                if (letter.length == 1) return true;
            }
        }
    ]).then(function(input) {
        var letGuess = input.letter + "";
        var correct = wordSelected.guessChecker(letGuess);
        console.log("\r\n" + wordSelected.wordShower() + "\r\n");
        if (correct == false && letterArr.indexOf(letGuess.toLowerCase()) == -1) {
            letterArr.push(letGuess.toLowerCase());
            guessRem--;
            console.log("Incorrect!\r\nGuesses Remaining: " + guessRem + "\r\n");
            if (guessRem == 0) {
                console.log("Sorry, you lose.  Try again.\r\n");
                losses++;
                winLoss();
                playAgain();
            } else {
                letterGuess();
            }
        } else {
            if (letterArr.indexOf(letGuess.toLowerCase()) != -1) {
                console.log("You already guessed that...\r\n");
            } else {
                console.log("Correct!\r\n");
            }
            var complete = wordSelected.completed();
            if (complete) {
                console.log("Congratulations! You guessed the song!\r\n");
                wins++;
                winLoss();
                playAgain();
            } else {
                letterGuess();
            }
        }
    });
}

newGame();