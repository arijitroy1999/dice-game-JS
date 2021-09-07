var score,roundscore,activePlayer,gamePlaying;
var prevDice;

init();


function init(){
    score=[0,0];
roundscore=0;
activePlayer=0;
    document.querySelector(".dice").style.display='none';

document.getElementById("score-0").textContent="0";
document.getElementById("score-1").textContent="0";
document.getElementById("current-0").textContent="0";
document.getElementById("current-1").textContent="0";
    document.querySelector("#name-0").textContent='PLAYER 1';
    document.querySelector("#name-1").textContent='PLAYER 2';
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner"); 
     document.querySelector(".player-0-panel").classList.remove("active");
     document.querySelector(".player-0-panel").classList.add("active");
    
    gamePlaying=true;//state variable
    prevDice=0;
}



document.querySelector(".btn-roll").addEventListener("click",function(){
    if(gamePlaying===true){//only when gamePlaying is true
        //getting a random no.
        
    var dice=(Math.floor(Math.random()*6))+1; // gives a no bw 1 and 6
    
    //display result
    var diceDOM=document.querySelector(".dice");//selecting the element
    diceDOM.style.display='block';//displaying the dice again
    diceDOM.src="dice-"+dice+".png";//setting the image accordingly
    
    //update the score
    if(dice!==1){
        if(prevDice===6 && dice===6){//two consequetive 6 then 0
            roundscore=0;
            document.querySelector("#current-"+activePlayer).textContent=roundscore;
            score[activePlayer]=0;
            document.querySelector("#score-"+activePlayer).textContent=score[activePlayer];
        }    
         else{
             roundscore+=dice;
        document.querySelector("#current-"+activePlayer).textContent=roundscore;//changing the content of current variable
         }   
        
    }    
     else{//if dice is 1 then the control is transferred to next player and score becomes 0 
        
        nextPlayer();
     } 
    prevDice=dice;    
    }  
    
});

function nextPlayer(){
     activePlayer===0?activePlayer=1:activePlayer=0;//toggling activeplayer
        roundscore=0;//resetting roundscore 
        document.getElementById("current-0").textContent=0; //resetting current scores of both players
        document.getElementById("current-1").textContent=0; 
         
        document.querySelector(".player-0-panel").classList.toggle("active"); //if player 0 is playing then this method wil add active class and remove it if player 0 is not playing
        document.querySelector(".player-1-panel").classList.toggle("active"); //if player 1 is playing then this method wil add active class and remove it if player 1 is not playing  
     document.querySelector(".dice").style.display='none';
    prevDice=0;
 }

document.querySelector(".btn-hold").addEventListener("click",function(){
    if(gamePlaying){
        //add the current score
    score[activePlayer]+=roundscore;// updating the score arry
    // dispaly it to the ui
    document.querySelector("#score-"+activePlayer).textContent=score[activePlayer];
    // check if player won the game
    if(score[activePlayer]>=20){
     document.querySelector("#name-"+activePlayer).textContent="Winner";
        document.querySelector(".dice").style.display='none'; 
        document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
        document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
        gamePlaying=false;
    }
    else{
        nextPlayer();//changing the player
    }
    }
});

document.querySelector(".btn-new").addEventListener("click",init);


