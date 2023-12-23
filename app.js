let boxes = document.querySelectorAll('.box');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true;  // playerO
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const newGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    for(let pattern of winPatterns){
        boxes[pattern[0]].classList.remove("win");
        boxes[pattern[1]].classList.remove("win");
        boxes[pattern[2]].classList.remove("win");
    }
    count = 0;
}

boxes.forEach(box => {
    box.addEventListener("click",() => {
        // console.log("Box was clicked");
        if(turnO){
            box.innerText = "O";
            box.style.color = "green";
            box.style.cursor = "no-drop";
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "orange";
            box.style.cursor = "no-drop";
            turnO = true;
        }
        count++;
        box.disabled = true;

        checkWinner();  // function for finding winner
    });
})

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.cursor = "pointer";
    }
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
        box.style.cursor = "no-drop";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();     // disabling the boxes after any player win
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        // console.log(pattern[0], pattern[1], pattern[2]);
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText; 
        let pos3Val = boxes[pattern[2]].innerText;
        
        if((pos1Val!="" && pos2Val!="" && pos3Val!="")
            && (pos1Val===pos2Val && pos2Val===pos3Val))
        {
            // console.log(`Winner is `,pos1Val);  // for checking
            // now highlight the winning position
            boxes[pattern[0]].classList.add("win");
            boxes[pattern[1]].classList.add("win");
            boxes[pattern[2]].classList.add("win");

            showWinner(pos1Val);
        }
        else if(count===9){
            // console.log(count);    // for checking
            msg.innerText = "Game Draw !";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    }
}

newGameBtn.addEventListener('click', newGame);