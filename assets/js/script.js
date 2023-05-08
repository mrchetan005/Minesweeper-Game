// javascript code goes here

const gridContainer = document.getElementById('gridContainer'),
    scoreDiv = document.getElementById('gameScore'),
    resultDiv = document.getElementById('resultDisplay'),
    resetButton = document.getElementById('resetButton');

const boxCount = 81, bombsCount = 10, bombLocation = [];
let gameScore = 0, playerWin = false;

// ? creating and adding 81 boxex to grid container
for (let i = 0; i < boxCount; i++) {
    const div = document.createElement('div');
    div.id = `cell_${i + 1}`;
    div.className = 'box';
    gridContainer.append(div);
}

// function to handle click on box
function handleClick(e) {
    let box = e.target;
    if (box.classList.contains('bomb')) {
        bombLocation.forEach((location) => {
            gridContainer.children[location - 1].classList.add('bomb-background');
        });
        gameOver();
        return;
    } else {
        if (box.classList.contains('box') && !box.classList.contains('green')) {
            scoreDiv.textContent = ++gameScore;
            box.classList.add('green');
        }
    }
    if (gameScore == boxCount - bombsCount) {
        playerWin = true;
        gameOver();
        return;
    }
}

// function for gameover 
function gameOver() {
    resultDiv.textContent = playerWin ? 'win' : 'game over';
    gridContainer.removeEventListener('click', handleClick);
}

// function to start the game
function startGame() {
    let bombs = 0;
    while (bombs < bombsCount) {
        let location = Math.floor(Math.random() * boxCount) + 1;
        if (!bombLocation.includes(location)) {
            bombLocation.push(location);
            bombs++;
            gridContainer.children[location - 1].classList.add('bomb');
        }
    }
    window.random = bombLocation;
    gridContainer.addEventListener('click', handleClick);
}

// function to reset game
function resetGame() {
    gameScore = 0;
    scoreDiv.textContent = gameScore;
    bombLocation.length = 0;
    resultDiv.textContent = '';
    Array.from(gridContainer.children).forEach(box => {
        box.classList.contains('bomb') && box.classList.remove('bomb');
        box.classList.contains('bomb-background') && box.classList.remove('bomb-background');
        box.classList.contains('green') && box.classList.remove('green');

    });
    startGame();
}

resetButton.addEventListener('click', resetGame);

window.onload = resetGame();