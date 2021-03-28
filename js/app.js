'use strict';

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
// Then we create function that render images on our web page
let leftIndex, midIndex, rightIndex;
function render(){
  leftIndex = random(0,imgNames.length-1);
  midIndex = random(0,imgNames.length-1);
  rightIndex = random(0,imgNames.length-1);
  while (leftIndex === midIndex || leftIndex === rightIndex || midIndex === rightIndex){
    leftIndex = random(0,imgNames.length-1);
    midIndex = random(0,imgNames.length-1);
    rightIndex = random(0,imgNames.length-1);
  }
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
}

let counter=1;
// Creating action when click on images
let imagesSection = document.getElementById('imgColumn');
imagesSection.addEventListener('click', clickFun);
// defining click function
function clickFun(event){
  if (event.target.id !== 'imgColumn'){
    if (event.target.id === leftImg.id){
      Stuff.all[leftIndex].vote++;
    }else if(event.target.id === rightImg.id){
      Stuff.all[rightIndex].vote++;
    }else{
      Stuff.all[midIndex].vote++;
    }
  }
  // console.table(Stuff.all);
  if (counter >= 25){
    imagesSection.removeEventListener('click', clickFun);
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
  // let uList = document.createElement('ul');
  // resultsSection.appendChild(uList);
//   <tr>
//   <th>Image</th>
//   <th>votes</th>
//   <th>shows</th>
// </tr>
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
    // let iList = document.createElement('li');
    // uList.appendChild(iList);
    // iList.textContent=`image${i+1}: ${Stuff.all[i].vote} votes`;
  }
  document.getElementById('myBtn').disabled = true;
}
