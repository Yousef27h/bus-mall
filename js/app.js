'use strict';

let votes = [];
let shows = [];
// Products names

const imgNames = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];

// Creating a constructor

function Stuff(name){
  this.name = name;
  this.path = `./img/${name}.jpg`;
  this.show = 0;
  this.vote = 0;
  Stuff.all.push(this);
}
Stuff.all = [];

// Creating objects using imgNames array

for (let i=0; i<imgNames.length; i++){
  new Stuff(imgNames[i]);
}
console.log(Stuff.all);


// Creating random number

function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// render random images

// First we create constants to attach image ids
const leftImg = document.getElementById('leftImg');
const midImg = document.getElementById('midImg');
const rightImg = document.getElementById('rightImg');
// Variable to store random images so they dont appear on next round
let imgpaths = [0,0,0];
// Then we create function that render images on our web page
let leftIndex, midIndex, rightIndex;
function render(){
  leftIndex = random(0,imgNames.length-1);
  midIndex = random(0,imgNames.length-1);
  rightIndex = random(0,imgNames.length-1);
  while (leftIndex === midIndex || leftIndex === rightIndex || midIndex === rightIndex || leftIndex === imgpaths[0] || midIndex === imgpaths[0] || rightIndex === imgpaths[0] || leftIndex === imgpaths[1] || midIndex === imgpaths[1] || rightIndex === imgpaths[1] || leftIndex === imgpaths[2] || midIndex === imgpaths[2] || rightIndex === imgpaths[2] ){
    leftIndex = random(0,imgNames.length-1);
    midIndex = random(0,imgNames.length-1);
    rightIndex = random(0,imgNames.length-1);
  }
  console.log(imgpaths);
  console.log(leftIndex);
  console.log(midIndex);
  console.log(rightIndex);

  leftImg.src = Stuff.all[leftIndex].path;
  leftImg.alt = Stuff.all[leftIndex].name;
  leftImg.title = Stuff.all[leftIndex].name;
  Stuff.all[leftIndex].show++;

  midImg.src = Stuff.all[midIndex].path;
  midImg.alt = Stuff.all[midIndex].name;
  midImg.title = Stuff.all[midIndex].name;
  Stuff.all[midIndex].show++;

  rightImg.src = Stuff.all[rightIndex].path;
  rightImg.alt = Stuff.all[rightIndex].name;
  rightImg.title = Stuff.all[rightIndex].name;
  Stuff.all[rightIndex].show++;

  imgpaths[0] = leftIndex;
  imgpaths[1] = midIndex;
  imgpaths[2] = rightIndex;
}

let counter=1;
// Creating action when click on images
let imagesSection = document.getElementById('imgColumn');
imagesSection.addEventListener('click', clickFun);
// defining click function
function clickFun(event){
  if (event.target.id !== 'imgColumn'){
    if (counter > 25){
      for (let i=0; i<Stuff.all.length ; i++){
        votes.push(Stuff.all[i].vote);
        shows.push(Stuff.all[i].show);
      }
      imagesSection.removeEventListener('click', clickFun);
      chartRender();
    }else{
      if (event.target.id === leftImg.id){
        Stuff.all[leftIndex].vote++;
      }else if(event.target.id === rightImg.id){
        Stuff.all[rightIndex].vote++;
      }else{
        Stuff.all[midIndex].vote++;
      }
    }
  }
  counter++ ;
  console.log(counter);
  if (counter <= 25){
    render();
  }
}
render();


// Creating Results Section

let resultBtn = document.getElementById('myBtn');
resultBtn.addEventListener('click', resultsFun);
function resultsFun(){
  let resultsSection = document.getElementById('leftColumn');
  let tableEl = document.getElementById('myTable');
  let thrEl = document.createElement('tr');
  tableEl.appendChild(thrEl);
  let th1El = document.createElement('th');
  thrEl.appendChild(th1El);
  th1El.textContent='Image';
  let th2El = document.createElement('th');
  thrEl.appendChild(th2El);
  th2El.textContent='Votes';
  let th3El = document.createElement('th');
  thrEl.appendChild(th3El);
  th3El.textContent='Shows';
  for (let i=0 ; i<imgNames.length ; i++){
    let trEl = document.createElement('tr');
    tableEl.appendChild(trEl);
    let thEl = document.createElement('th');
    trEl.appendChild(thEl);
    thEl.textContent = `Image${i+1}`;
    let tdEl1 = document.createElement('td');
    trEl.appendChild(tdEl1);
    tdEl1.textContent = Stuff.all[i].vote;
    let tdEl2 = document.createElement('td');
    trEl.appendChild(tdEl2);
    tdEl2.textContent = Stuff.all[i].show;
  }
  document.getElementById('myBtn').disabled = true;
}

function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: imgNames,
      datasets: [{
        label: 'Img votes',
        backgroundColor: '#d00000',
        borderColor: '#eae2b7',
        data: votes,
        hoverBackgroundColor: '#dc2f02'
      },
      {
        label: 'Img shows',
        backgroundColor: '#f48c06',
        borderColor: '#eae2b7',
        data: shows,
        hoverBackgroundColor: '#ffba08'
      }]
    },

    // Configuration options go here
    options: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontColor: 'black'
        }
      }
    }
  });
}