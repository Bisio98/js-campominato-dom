document.getElementById('start').addEventListener('click', start);


let numOfClicked = 0;
let bombElements = [];

function start() {
    const gameBox = document.getElementById('game_box');
    document.getElementById('box_game').innerHTML = "";

    let difficulty = document.getElementById("difficulty").value;
    let numOfBoxes;
    const bombs = 48;

    if(difficulty === 'Easy'){
        numOfBoxes = 100;
    }else if( difficulty === 'Medium'){
        numOfBoxes = 81;
    }else{
        numOfBoxes = 49;
    }

    bombElements.length = 0;
    bombElements = createBombs(bombs, numOfBoxes, bombElements);
    console.log(bombElements);


    for(let i = 1; i <= numOfBoxes; i++) {
        let divBox = document.createElement("div");

        divBox.className = "single_box";

        document.getElementById('box_game').appendChild(divBox);
        divBox.innerHTML = `<span>${i}</span>`;

        if(numOfBoxes === 100){
            divBox.classList.add('easy');
        }else if( numOfBoxes === 81){
            divBox.classList.add('medium');
        }else{
            divBox.classList.add('hard');
        }

        if(bombElements.includes[i]){
            divBox.classList.add('bomb');
        }

        divBox.addEventListener('click', clickedBox);
        if(numOfClicked === (numOfBoxes - bombs)){
            endGame('win');
        }
    }
    
}


function clickedBox() {
    for(let i = 0; i < (bombElements.length + 1); i++){
        let tmp = parseInt(this.textContent);
        if(bombElements[i] === tmp){
            this.classList.add('bomb');
            endGame('lost');
            return;
        }else{
            this.classList.add('active');
            numOfClicked++;
        }
    }    
}

function createBombs(num, max, myArray) {
        let el;
        el = createNumbers(max)
        myArray.push(el);
        for( let i = 1; i < num ; i++){
            do{
                el = Math.floor(Math.random() * max +1)
            } while(!(myArray.includes(el)))
            myArray.push(el);
        }
    return myArray;
}

function createNumbers(int) {
    return Math.floor(Math.random() * int +1);
}

function endGame(goodOrBad){
    console.log(goodOrBad);
}