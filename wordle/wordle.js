var height = 6;
var width = 5;

var row = 0;
var col = 0;

var gameOver = false;
var word = "ILOVU";

window.onload = function() {
    initialise();    
};

function initialise() {
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";  // Fix: Use empty string instead of space
            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        if (e.key.length === 1 && e.key.match(/[A-Z]/i)) { // Fix: Better key detection
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if (currTile.innerText === "") {
                    currTile.innerText = e.key.toUpperCase(); // Fix: Convert to uppercase
                    col += 1;
                }
            }
        } 
        else if (e.code === "Backspace") {
            if (col > 0) {
                col -= 1;
            }
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerText = "";
        } 
        else if (e.code === "Enter") {
            if (col === width) { // Only process if row is complete
                update();
                row += 1;
                col = 0;
            }

            if (!gameOver && row === height) {
                gameOver = true;
                document.getElementById("answer").innerText = word;
            }
        }
    });
}

function update() {
    let correct = 0;
    let letterCount = {}; // Track letter frequency in word

    for (let letter of word) {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    // First pass: check correct letters
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;

        if (word[c] === letter) {
            currTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        }
    }

    // Second pass: check misplaced letters
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;

        if (!currTile.classList.contains("correct")) {
            if (letterCount[letter] && letterCount[letter] > 0) {
                currTile.classList.add("present");
                letterCount[letter] -= 1;
            } else {
                currTile.classList.add("absent");
            }
        }
    }

    if (correct === width) {
        gameOver = true;
        alert("You win!");
    }
    //     alert("you lost");
    // }
}