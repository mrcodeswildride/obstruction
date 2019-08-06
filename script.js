var rows = document.querySelectorAll(".row");
var squares = document.querySelectorAll(".row div");
var messageDisplay = document.getElementById("message");

var gameInProgress = true;
var turn = "O";

for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", clickSquare);
}

function clickSquare() {
    if (gameInProgress && this.innerHTML == "" && !this.classList.contains("touching")) {
        selectSquare(this);

        if (gameOver()) {
            gameInProgress = false;
            messageDisplay.innerHTML = turn + " wins!";
        }
        else {
            turn = turn == "O" ? "X" : "O";
        }
    }
}

function selectSquare(square) {
    square.innerHTML = turn;

    for (var yDiff = -1; yDiff <= 1; yDiff++) {
        for (var xDiff = -1; xDiff <= 1; xDiff++) {
            if (xDiff != 0 || yDiff != 0) {
                markNeighbor(square, xDiff, yDiff);
            }
        }
    }
}

function markNeighbor(square, xDiff, yDiff) {
    var x = parseInt(square.getAttribute("index"), 10);
    var y = parseInt(square.parentElement.getAttribute("index"), 10);

    var row = rows[y + yDiff];
    var neighbor = null;

    if (row) {
        neighbor = row.querySelectorAll("div")[x + xDiff];
    }

    if (neighbor) {
        neighbor.classList.add("touching");
    }
}

function gameOver() {
    for (var i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == "" && !squares[i].classList.contains("touching")) {
            return false;
        }
    }

    return true;
}
