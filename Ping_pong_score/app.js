const add_Player1 = document.querySelector("#add_Player1")
const player1 = document.querySelector("#team_A")
const add_Player2 = document.querySelector("#add_Player2")
const player2 = document.querySelector("#team_B")
const reset_game = document.querySelector("#reset_game")


let player1_score = 0;
let player2_score = 0;



add_Player1.addEventListener('click',function(e){
    player1_score++;
    player1.innerHTML = player1_score;
    if($("#goal_score").val() == player1_score){
        alert("player1 Win");
        player1.style.color = 'green';
        player2.style.color = 'red';
    }
}) 

add_Player2.addEventListener('click',function(e){
    player2_score++;
    player2.innerHTML = player2_score;
    if($("#goal_score").val() == player2_score){
        alert("player2 Win");
        player1.style.color = 'red';
        player2.style.color = 'green';
    }
}) 

reset_game.addEventListener('click',function(e){
    player1_score=0;
    player2_score=0;
    player1.innerHTML = player1_score;
    player2.innerHTML = player2_score;
    player1.style.color = 'black';
    player2.style.color = 'black';
}) 
