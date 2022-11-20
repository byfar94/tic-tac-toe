const board = document.querySelector(".gameboard");
const playerPrint = document.querySelector(".player-print");
const WinnerPrint = document.querySelector(".winner-print");
const startBtn = document.querySelector('.start-btn');

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
let PlayerTwo = createPlayer("player2", 0, false);

console.log(playerOne);
console.log(PlayerTwo);


//main player round function
function PushRenderSquares(){
    //count of number of x's and o's on board based on object attribute "symbol"
    let xCount = arCount("x");
    let oCount = arCount("o");
    playerPrint.innerText = "Player one's turn (x)";
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
       //Chaning array item attribute on eventListener 

        divSquare.addEventListener("click", function (){
        
        if (gameSquareArray[i].symbol == "b" && xCount == oCount && arCount("b") != 0){
            let newX = createGameSquare("x", i, divSquare)
            gameSquareArray.splice([i], 1, newX);
            board.innerHTML = "";
            PushRenderSquares();
            playerPrint.innerText = "Player two's turn (o)";
        }
        else if (gameSquareArray[i].symbol == "b" && xCount > oCount && arCount("b") != 0){
            let newO = createGameSquare("o", i, divSquare)
            gameSquareArray.splice([i], 1, newO);
            board.innerHTML = "";
            PushRenderSquares();
            playerPrint.innerText = "Player one's turn (x)";
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

function findWinner(){
    if(gameSquareArray[0].symbol == "x" && gameSquareArray[1].symbol == "x" && gameSquareArray[2].symbol == "x"){
        WinnerPrint.innerText = "Player 1 wins"
        playerOne.score++;
        clearBoard();
        console.log(playerOne.score);
    }

}

console.log(arCount("b"));

console.log(gameSquareArray);