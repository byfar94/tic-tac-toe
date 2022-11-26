const board = document.querySelector(".gameboard");
const playerPrint = document.querySelector(".player-print");
const WinnerPrint = document.querySelector(".winner-print");
const resetBtn = document.querySelector('.reset-btn');
const ScoreOneText = document.querySelector(".p-score-one");
const ScoreTwoText = document.querySelector(".p-score-two");

gameSquareArray = [];

//factory function to create gameSquares
function createGameSquare(symbol, space, div){
    return {symbol, space, div};
}

//factory function to create gameSquares
function createPlayer(name, score, final){
    return{name, score, final};
}

let playerOne = createPlayer("player1", 0, false);
let playerTwo = createPlayer("player2", 0, false);

function displayScore(){
ScoreOneText.innerText = `Player One Score: ${playerOne.score}`;
ScoreTwoText.innerText = `Player Two Score: ${playerTwo.score}`;

}

displayScore();

//main player round function
function PushRenderSquares(){
    //count of number of x's and o's on board based on object attribute "symbol"
    let xCount = arCount("x");
    let oCount = arCount("o");
    playerPrint.innerText = `Player one's turn "x"`;
    WinnerPrint.innerText = "---------";
    //create and render board/ push items to boardGameArray
    for(let i = 0; i < 9; i++){
        let divSquare = document.createElement("div");
        divSquare.classList.add("square");
        board.appendChild(divSquare);
        if (gameSquareArray.length < 9){
        gameSquareArray.push(createGameSquare("b", i, divSquare));
        }
       //Rendering x or o innerHTML inside divSquare based on array object atrribute "symbol"
       if (gameSquareArray[i].symbol == "x"){
        divSquare.innerText = "x";
       }
       else if (gameSquareArray[i].symbol == "o"){
        divSquare.innerText = "o";
       }
       else if (gameSquareArray[i].symbol == "b"){
        divSquare.innerText = "";
       }
       //Changing array item attribute on eventListener 

        divSquare.addEventListener("click", function (){
        
        if (gameSquareArray[i].symbol == "b" && xCount == oCount && arCount("b") != 0){
            let newX = createGameSquare("x", i, divSquare)
            gameSquareArray.splice([i], 1, newX);
            board.innerHTML = "";
            PushRenderSquares();
            playerPrint.innerText = `Player two's turn "o"`;
        }
        else if (gameSquareArray[i].symbol == "b" && xCount > oCount && arCount("b") != 0){
            let newO = createGameSquare("o", i, divSquare)
            gameSquareArray.splice([i], 1, newO);
            board.innerHTML = "";
            PushRenderSquares();
            playerPrint.innerText = `Player one's turn "x"`;
        }

        findWinner();
        if (arCount("b") == 0){
            clearBoard()
        }
        })
    }

}
PushRenderSquares();


function arCount(sym){
    return gameSquareArray.filter((obj) => obj.symbol === sym).length;
}

function clearBoard(){
            board.innerHTML = "";
            gameSquareArray = [];
            PushRenderSquares();
}


//function to find the winner of each round and add points to the winning player
function findWinner(){
    if(
    // player "x"
    //horizontal rows
    (gameSquareArray[0].symbol == "x" && gameSquareArray[1].symbol == "x" && gameSquareArray[2].symbol == "x") ||
    (gameSquareArray[3].symbol == "x" && gameSquareArray[4].symbol == "x" && gameSquareArray[5].symbol == "x") || 
    (gameSquareArray[6].symbol == "x" && gameSquareArray[7].symbol == "x" && gameSquareArray[8].symbol == "x") ||
    //vertical rows
    (gameSquareArray[0].symbol == "x" && gameSquareArray[3].symbol == "x" && gameSquareArray[6].symbol == "x") ||
    (gameSquareArray[1].symbol == "x" && gameSquareArray[4].symbol == "x" && gameSquareArray[7].symbol == "x") ||
    (gameSquareArray[2].symbol == "x" && gameSquareArray[5].symbol == "x" && gameSquareArray[8].symbol == "x") ||
    //diagonal
    (gameSquareArray[0].symbol == "x" && gameSquareArray[4].symbol == "x" && gameSquareArray[8].symbol == "x") ||
    (gameSquareArray[2].symbol == "x" && gameSquareArray[4].symbol == "x" && gameSquareArray[6].symbol == "x")
    ){
        playerOne.score++;
        clearBoard();
        WinnerPrint.innerText = "Player 1 wins"
        displayScore();
    } 

    else if(
    // player "o"
    //horizontal rows
    (gameSquareArray[0].symbol == "o" && gameSquareArray[1].symbol == "o" && gameSquareArray[2].symbol == "o") ||
    (gameSquareArray[3].symbol == "o" && gameSquareArray[4].symbol == "o" && gameSquareArray[5].symbol == "o") || 
    (gameSquareArray[6].symbol == "o" && gameSquareArray[7].symbol == "o" && gameSquareArray[8].symbol == "o") ||
    //vertical rows
    (gameSquareArray[0].symbol == "o" && gameSquareArray[3].symbol == "o" && gameSquareArray[6].symbol == "o") ||
    (gameSquareArray[1].symbol == "o" && gameSquareArray[4].symbol == "o" && gameSquareArray[7].symbol == "o") ||
    (gameSquareArray[2].symbol == "o" && gameSquareArray[5].symbol == "o" && gameSquareArray[8].symbol == "o") ||
    //diagonal
    (gameSquareArray[0].symbol == "o" && gameSquareArray[4].symbol == "o" && gameSquareArray[8].symbol == "o") ||
    (gameSquareArray[2].symbol == "o" && gameSquareArray[4].symbol == "o" && gameSquareArray[6].symbol == "o")
    ){
    playerTwo.score++;
    clearBoard();
    WinnerPrint.innerText = "Player 2 wins"
    displayScore();
    }

}

//reset button

function resetGame(){
    clearBoard();
    playerOne.score = 0;
    playerTwo.score = 0;
    displayScore();
}

resetBtn.addEventListener("click", resetGame);
