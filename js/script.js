document.getElementById('start').addEventListener('click', start);


let numOfClicked = [];
let bombElements = [];
let numOfBoxes;
const bombs = 16;
let attempts = 0;
let attemptsH = document.getElementById('main_attempts');

function start() {
    attemptsH.classList.add('hide');
    const gameBox = document.getElementById('game_box');
    document.getElementById('box_game').innerHTML = "";
    let difficulty = document.getElementById("difficulty").value;
    
    

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
        
        attempts = numOfBoxes - bombs;

        divBox.addEventListener('click', clickedBox);
    }
    
}


function clickedBox() {
    let tmp = parseInt(this.textContent);
    if(bombElements.includes(tmp)){
        this.classList.add('bomb');
        endGame('lost');
        return;
    }else{
        this.classList.add('active');
        numOfClicked.push(tmp);
        console.log(numOfClicked)
        if(numOfClicked.length === attempts){
            endGame('win');
        }
    }
}

function createBombs(num, max, myArray) {
    let el;
    for(let i = 0; i < num; i++){
        do{
            el = createNumbers(max);
        }while(myArray.includes(el))
        myArray.push(el);
    }
    return myArray;
}

function createNumbers(int) {
    return Math.floor(Math.random() * int +1);
}

function endGame(goodOrBad){
    if(goodOrBad === 'win'){
        alert('HAI VINTO, CONGRATULAZIONI');
    }else{
        alert(`Mi spiace, hai perso, hai fatto ${numOfClicked.length} tentativi`);
        let attemptsS = document.getElementById('attempts');
        attemptsH.classList.remove('hide');
        attemptsS.innerHTML = `${numOfClicked.length}`;
    }
    let allDivs = document.getElementsByClassName('single_box');
    let thisDivBox = allDivs[0]
    for( let i = 0; i < numOfBoxes; i++){
        thisDivBox = allDivs[i]
        thisDivBox.classList.add('disable');
        if(bombElements.includes(i)){
            thisDivBox.classList.add('bomb');
        }
    }

}