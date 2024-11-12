const state ={
  view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeleft: document.querySelector("#timeleft"),
    meuscore: document.querySelector("#seuscore"),
  },
  values:{ 
    tempo:null,
    velocidade: 1000,
    ultimaposicao: 0, /*ultima id do quadrado sorteado*/
    pontuacao:0, /* quantidade de  clicks do mouse */
    tempojogo: 10, /* tempo para jogar */
  },


  actions: {
     tempocorrendo: setInterval(temporizador,1000),
  },


};


function tocasom(){
    let audio = new Audio("../../src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function temporizador()
{
    state.values.tempojogo--;
    state.view.timeleft.textContent = state.values.tempojogo;

        if(state.values.tempojogo<=0){
            clearInterval(state.values.tempo);
            clearInterval(state.actions.tempocorrendo);
            alert("Fim de Jogo! sua pontuacao foi "+state.values.pontuacao);
        }   
}

function movimento(){
  state.values.tempo = setInterval(randomica,state.values.velocidade);
}

function randomica(){
  state.view.squares.forEach((conta)=>{
    conta.classList.remove("enemy");
  })

  let sorteia = Math.floor(Math.random()*9);
  let quadrado = state.view.squares[sorteia];
  quadrado.classList.add("enemy");
  state.values.ultimaposicao = quadrado.id;
}

function pegamouse()
{
    state.view.squares.forEach((contador)=>{
        contador.addEventListener("mousedown", ()=>{
            if(contador.id === state.values.ultimaposicao){
                state.values.pontuacao++;
                state.view.meuscore.textContent=state.values.pontuacao;
                /* atualiza pontuacao*/
                state.values.ultimaposicao = null;
                tocasom();
                /*state.view.timeleft[0].innerHTML = "Time left: " + state.values.velocidade/1000;
                state.view.score[0].innerHTML = "Score: " + (9-sorteia);
                */
            }
        });
    });
 
}


function initialize(){
    movimento();   
    pegamouse();
}

initialize();