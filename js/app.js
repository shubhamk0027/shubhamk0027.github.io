//HTML Elements
let cards = document.getElementsByClassName('card');
let deck = document.getElementById('deck');
let starBox =document.getElementById('stars');
let minBox =document.getElementById('mins');
let secBox =document.getElementById('secs');
let movesBox = document.getElementById('moves');
let textBox = document.getElementById('text');
let commentBox=document.getElementById('comment');
let restartButton = document.getElementsByClassName('restart');
let hintsActive =false;
//Variables
let cardBackground = '#2e3d49';
let selected =0;
let moves = 0;
let matched =0;
let starRating = 5;
let wrongAttempts=0;
//Timer variables
let timer =-1;
let startingTime = 0;
let totalMins=0;
let totalSecs=0;
//Shuffling the cards
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex].innerHTML;
        array[currentIndex].innerHTML = array[randomIndex].innerHTML;
        array[randomIndex].innerHTML = temporaryValue;
    }
    // console.log(array);
    return array;
}

//Adding event to each card individually
function addEvents(){
    for(var i=0; i<cards.length;i++)
        cards[i].addEventListener('click',whenClicked);
}

function whenClicked(event){
   if (timer ==-1){
        startingTime =(new Date).getTime();
        timer = setInterval(function() {
            let now = (new Date).getTime();
            let delta = now-startingTime;
            // console.log(delta);
            totalMins = Math.floor(delta/(1000*60));
            totalSecs = Math.floor((delta%(60*1000))/1000); 
            minBox.innerHTML =totalMins;
            secBox.innerHTML =totalSecs;
        }, 1000);
    }

    if(hintsActive) return;

    target = event.target;
    if(target.children.length==0) //means target is the icon not the list element
    target =target.parentElement
    if(selected!==0)
        secondCard(target);              
    else
        firstCard(target);
    console.log(selected)
}

function firstCard(target){
    // console.log('1st card selected')
    target.className = 'card open';
    selected=target;
}

function secondCard(target){
    if(target.className.includes('open')){
        console.log('same selection')
        return
    }
    let refToSelected=selected;
    selected=0;
    console.log('2nd card selected');
    if(refToSelected.innerHTML==target.innerHTML){
        refToSelected.removeEventListener('click',whenClicked);
        target.removeEventListener('click',whenClicked);
        matched++;
        if(matched==8)
            winText();
        refToSelected.className=target.className='card match';
        console.log("Now Correctly matched!");
    }
    else{
        aWrongAttempt()
        refToSelected.className=target.className='card wrong';
        setTimeout(()=>{target.className=refToSelected.className='card'},300)
        console.log('Wrong Selection');
    }
    updateScore();
}

function updateScore(){
    moves++;
    movesBox.innerText=moves;

}
function winText(){
    commentBox.style.display='block';
    clearInterval(timer);
    textBox.innerHTML
        =`<p>Congratulation! You Did it!</p>
        <p>Moves :${moves}</p>
        <p>Star  :${starRating}</p>
        <p>Time  :${totalMins}m ${totalSecs}s</p>
        </p>Do you want to play again?</p>`;
}

restartButton[0].addEventListener('click',function(){
    location.reload(true);
})

restartButton[1].addEventListener('click',function(){
    location.reload(true);
})
function aWrongAttempt(){
    wrongAttempts++;
    if (wrongAttempts<9 && wrongAttempts%2==0){
        starBox.children[0].remove(); starRating--;
    }
}

function hint(){
    if(timer==-1){ 
        alert('You must start the game in order to use Hint!')
        return;
    }
    console.log('hints active')
    aWrongAttempt();
    aWrongAttempt();
    aWrongAttempt();
    updateScore();
    updateScore();
    updateScore();
    hintsActive=true;
    for (let i=0; i<cards.length;i++){
        if(!cards[i].className.includes('match'))
            cards[i].classList.add('open');   
    }
    setTimeout(()=>{
        for (let i=0; i<cards.length;i++){
            if(selected!==cards[i])
                cards[i].classList.remove('open');   
        }
        console.log('hints disabled')
        hintsActive=false; 
    },1500)    

}
//Run all the functions
shuffle(cards);
addEvents(cards);
