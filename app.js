/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, player1, player2, isGamePlaying, lastRoll;
init();
document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
player1 = localStorage.getItem('one');
player2 = localStorage.getItem('two');
setPlayerName(player1,player2);
function setPlayerName(player1,player2){
    document.getElementById('name-0').textContent = player1;
    document.getElementById('name-1').textContent = player2;
}

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    isGamePlaying = true;
}

//Roll dice

    document.querySelector('.btn-roll').addEventListener('click',function(){
        if(isGamePlaying){
        var dice  = Math.floor(Math.random()*6) + 1;
        lastRoll = dice;
        if(lastRoll !== 6){
            var diceDom = document.querySelector('.dice');
            diceDom.style.display = 'block';
            diceDom.src = 'dice-' + dice +'.png';
            if (dice !== 1){
                //Add score to round/global score
                roundScore += dice;
                document.querySelector('#current-'+ activePlayer).textContent = roundScore;
            }
            else {
                //Next player's turn
                document.getElementById('current-' + activePlayer).textContent = '0';
                activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
                roundScore = 0;
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.player-0-panel').classList.toggle('active');
                document.querySelector('.player-1-panel').classList.toggle('active');
            }
        }
        else{
            console.log('Loses!')
        }
    } 
});

//New Game
    document.querySelector('.btn-new').addEventListener('click',function(){   
    init();
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active')
    setPlayerName(player1,player2);
});

//Hold
    document.querySelector('.btn-hold').addEventListener('click',function(){
        console.log('hold button clicked');
        if(isGamePlaying){
            scores[activePlayer] += roundScore;
            document.getElementById('score-' + activePlayer).textContent =  scores[activePlayer];
            if(scores[activePlayer] >= 10){
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.player-'+ activePlayer + '-panel').classList.add("winner");
                document.querySelector('.player-'+ activePlayer + '-panel').classList.remove("active");
                isGamePlaying = false;
                console.log(isGamePlaying);
            }
            else{
                document.querySelector('.dice').style.display = 'none';              
                document.getElementById('score-' + activePlayer).textContent =  scores[activePlayer];
                activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
                roundScore = 0;
                document.querySelector('.player-0-panel').classList.toggle('active');
                document.querySelector('.player-1-panel').classList.toggle('active');
            }
        }
    });