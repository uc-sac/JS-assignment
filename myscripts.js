let values=[];
let flag=false;
let maxScore=0;
let stopTimeInterval;
let stopTimeOut;

function onLoading(){
  let n=0;
  let parent = document.getElementById("radio-container");
  //intialise time
  document.getElementById("time").value=30;

  while(n<60){
    let e = document.createElement('input');
    e.setAttribute('type',"radio");
    e.setAttribute('class','radioButton');
    e.setAttribute('value',n);
    e.setAttribute('id','rdbtn'+n);
    e.setAttribute('onClick','return false');
    e.setAttribute('onClick',`event.preventDefault(); onClickOnRadioButton("rdbtn${n}")`);
    parent.appendChild(e);

    if(n%10==9)
      parent.appendChild(document.createElement('br'));
    n++;
  }
}

function reset() {
  let array = document.querySelectorAll('.radioButton');
  let m=0;
  while(m<array.length){
  array[m].checked = false;
  m++;
  }
}
function startGame(){
  let time=document.getElementById("time").value;
  if(time!=0){
    document.getElementById('result-container').innerHTML="";
    document.getElementById("message").innerHTML=`Test your skill. How many boxes can you check in ${time} seconds?`;
  reset();
  flag=true;
  document.getElementById("score").value=0;
  document.getElementById("time").readOnly=true;
  if(Number(time)!=0)
  maxScore=Number(time);
  time=time*1000;
  setRadios();
  clearInterval(stopTimeInterval);
  clearTimeout(stopTimeOut);
  stopTimeInterval=setInterval(()=>selectRandom(),1000);
  stopTimeOut=setTimeout(()=>stopGame(),time);
  }
}
function selectRandom() {
  let time=document.getElementById("time");
  let timeValue=(time.value)*1000;
  timeValue=timeValue-1000;
  time.value=timeValue/1000;
  if(timeValue!=0)
  setRadios();
}

function setRadios(){
  reset();
  let array = document.querySelectorAll('.radioButton');
  let m=0;
  values=[];
  while(m<5){
  let randomNumber=Math.floor(Math.random()*60);
  values.push(randomNumber)
  array[randomNumber].checked = true;
  m++;
  }
} 

function onClickOnRadioButton(valueId){
    if(flag==true){
    let radioButton=document.getElementById(valueId);
    let score= document.getElementById('score').value;
    score=Number(score);
    //console.log(radioButton);
    if(values.includes(Number(radioButton.value)))
        score=score+1;
    else{
      if(score!=0)
        score=score-1;
    }
    document.getElementById('score').value=score;
    }
}

function displayResult(){
  let e = document.getElementById('result-container');
  let score= document.getElementById('score').value;
  //calculate percent
  score=Number(score);
  //let percent=((score+maxScore)*100)/(2*maxScore);
  let percent=(score*100)/maxScore;
  percent=Math.round(percent);

  if(!Number.isNaN(percent)){
    if(percent>=80)
      e.innerHTML=`${percent}% Congratulations`;
      else if(percent>=60)
      e.innerHTML=`${percent}% Good job & try again to get more scores`;
      else
      e.innerHTML=`${percent}% Sorry, better luck next time`;
     // result.appendChild(e);
    }
}

function stopGame(){
  if(flag==true){
    clearInterval(stopTimeInterval);
    clearTimeout(stopTimeOut);
    flag=false;
    displayResult();
    document.getElementById("time").readOnly=false;
  }
}

function restartGame(){
  let time=document.getElementById("time");
  clearInterval(stopTimeInterval);
  clearTimeout(stopTimeOut);
//if(maxScore!=0)
  time.value=maxScore;
  startGame();
}
onLoading();