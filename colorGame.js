var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    //Setup Mode Buttons event listeners
    setupModeButtons();
    //Setup square event listeners
    setupSquares();
    resetValues();
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            var mode = this.textContent;
            switch (mode) {
                case "Easy":
                    numSquares = 3;
                    break;
                case "Medium":
                    numSquares = 6;
                    break;
                default:
                    numSquares = 9;
            }
            resetValues();
        })
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        //Add click listeners to squares
        squares[i].addEventListener("click", function () {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to picked color
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetBtn.textContent = "Play Again?"
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                //If we picked wrong color, fade out
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again!";
            }
        });
    }
}

function resetValues() {
    //generate all new colors
    colors = generateRandomColors(numSquares);
    //pick new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
        //Add initial colors to squares
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else
            squares[i].style.display = "none";

    }
    //change color of h1
    h1.style.backgroundColor = "steelblue";
    //reset button
    resetBtn.textContent = "New colors";
    messageDisplay.textContent = "";
}

resetBtn.addEventListener("click", function () {

    resetValues();

})

function changeColors(color) {
    //loop through all squares
    for (var i = 0; i < squares.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }

}

function pickColor() {
    //pick a random number
    var random = Math.floor(Math.random() * colors.length);
    //use the number to access the color out of the colors array and return that color
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = [];
    //add num random colors to array
    for (var i = 0; i < num; i++) {
        //get random color and push into array
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a red from 0-255
    var r = Math.floor(Math.random() * 256);
    //pick a green from 0-255
    var g = Math.floor(Math.random() * 256);
    //pick a blue from 0-255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}