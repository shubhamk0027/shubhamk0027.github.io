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
//Variables
let rotateAnimation = 'rotate 0.3s';
let cardBackground = '#2e3d49';
let selected =0;
let moves = 0;
let matched =0;
let starRating = 5;
//Timer variables
let timer =-1;
let startingTime = 0;
let totalMins=0;
let totalSecs=0;

//Shuffling the cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
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

    target = event.target;
    if(selected!=0)
        secondCard(target);              
    else{
        firstCard(target);
        selected=target;
    }    
}

function firstCard(target){
    // console.log(target,selected)
    // console.log('1st card selected')
    target.className = 'card open show';
}

function secondCard(target){
    updateScore();
    if(target.className.includes('open')){
        target.className = 'card';
        // console.log('same selection')
        selected=0;
    return
    }
    // console.log('2nd card selected');
    if(selected.innerHTML==target.innerHTML){
        target.className=selected.className='card show match';
        selected.removeEventListener('click',whenClicked);
        target.removeEventListener('click',whenClicked);
        matched++;
        if(matched==8)
            winText();
        selected=0;
        rotate(target);
        console.log("Now Correctly matched!");
    }
    else{
        selected.className=target.className='show open card';
        let referenceToSelected = selected;
        selected = 0;
        setTimeout(()=>{
            console.log('started shaking');
            target.classList.add('wrong');
            referenceToSelected.classList.add('wrong');
            setTimeout(() => {
                target.className='card';
                referenceToSelected.className='card';
                referenceToSelected=0;
            }, 300);
        },300);
        // console.log("Incorrect match");
        moves--;
    }
}

function rotate(target){
    target.style.animation= 'none';    
    target.style.animation= rotateAnimation;        
}

function updateScore(){
    moves++;
    movesBox.innerText=moves;
    if (moves <9 && moves%2==0){
        starBox.children[0].remove(); starRating--;
    }
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

//Run all the functions
shuffle(cards);
addEvents(cards);
