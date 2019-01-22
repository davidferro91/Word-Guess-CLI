var Letter = require("./letter.js");

function Word (wordSelected) {
    var letArr = wordSelected.split("");
    var wordArr = [];
    for (var i = 0; i < letArr.length; i++) {
        wordArr.push(new Letter(letArr[i]));
    }
    this.wordShower = function () {
        var wordShown = "";
        for (var i = 0; i < wordArr.length; i++) {
            wordShown += wordArr[i].displayer() + " ";
        }
        return wordShown.trim();
    }
    this.guessChecker = function (char) {
        var trueCounter = 0;
        for (var i = 0; i < wordArr.length; i++) {
            var boolHolder = wordArr[i].checker(char + "");
            if (boolHolder) {
                trueCounter++;
            }
        }
        if (trueCounter > 0) {
            return true;
        }
        return false;
    }
    this.completed = function () {
        var wordCompleted = true;
        for (var i = 0; i < wordArr.length; i++) {
            wordCompleted = wordArr[i].guessed;
            if (!wordCompleted) return wordCompleted;
        }
        return wordCompleted;
    }
}

module.exports = Word;