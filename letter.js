function Letter (char) {
    this.character = char.toString();
    this.guessed = false;
    if (this.character == "\'" || this.character == "." || this.character == "(" || this.character == ")" || this.character == " " || this.character == "!" || this.character == "-" || this.character == "," || this.character == "?") {
        this.guessed = true;
    }
    this.displayer = function () {
        if (this.guessed === true) {
            return this.character;
        } else if (this.guessed !== true) {
            return "_";
        }
    }
    this.checker = function (input) {
        var inputLower = input.toLowerCase();
        var characterLower = this.character.toLowerCase();
        if (inputLower === characterLower) {
            this.guessed = true;
            return true;
        }
        return false;
    }
}

module.exports = Letter;