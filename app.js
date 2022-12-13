'use strict';

// ********* GLOBAL VARIABLES ##########
let productArr = [];
let votingRounds = 25;

// ********* DOM WINDOWS ##########
let imgContainer = document.getElementById('image-container');
let imgOne = document.getElementById('image1');
let imgTwo = document.getElementById('image2');
let imgThree = document.getElementById('image3');

let resultBtn = document.getElementById('btnResult');
let resultList = document.getElementById('result-list');

// ********* CONSTRUCTOR FUNCTIONS ##########
function Product(name, imgExtension = 'jpg')
{
  this.name = name;
  this.img = `./img/${name}.${imgExtension}`;
  this.views = 0;
  this.clicks = 0;
  productArr.push(this);
}

// ********* HELPER FUNCTIONS ##########
function randomIndex(){
  return Math.floor(Math.random() * productArr.length);
}

function renderImg(){
  // TODO: 3 unique images and populate the images
  let img1Index = randomIndex();
  let img2Index = randomIndex();
  let img3Index = randomIndex();

  // ** Validation to make sure numbers are unique **
  while(img1Index === img2Index || img2Index === img3Index || img1Index === img3Index){
    // TODO: reassign one of the variables
    img1Index = randomIndex();
    img2Index = randomIndex();
    img3Index = randomIndex();
  }

  imgOne.src = productArr[img1Index].img;
  imgTwo.src = productArr[img2Index].img;
  imgThree.src = productArr[img3Index].img;

  imgOne.title = productArr[img1Index].name;
  imgTwo.title = productArr[img2Index].name;
  imgThree.title = productArr[img3Index].name;

  imgOne.alt = `Image  of an ${productArr[img1Index].name}`;
  imgTwo.alt = `Image  of an ${productArr[img2Index].name}`;
  imgThree.alt = `Image  of an ${productArr[img3Index].name}`;

  // TODO: increase the number of views on the images that have been rendered
  productArr[img1Index].views++;
  productArr[img2Index].views++;
  productArr[img3Index].views++;
}

// ********* EVENT HANDLERS ##########
function handleClick(event)
{
  let imgClicked = event.target.title;

    // TODO: Increase the number of votes to that specific image
    for(let i = 0; i < productArr.length; i++){
      if(imgClicked === productArr[i].name){
        productArr[i].clicks++;
      }
    }
    // TODO: decrement voting rounds
    votingRounds--;
  
    // TODO: Rerender 2 new images
    renderImg();
  
    // TODO: once voting rounds have ended - not allow any more clicks
    if(votingRounds === 0){
      imgContainer.removeEventListener('click', handleClick);
    }
}

function handleResults()
{
  if(votingRounds === 0)
  {
    for(let i = 0; i < productArr.length; i++)
    {
      let liElem = document.createElement('li');
      liElem.textContent = `${productArr[i].name} had ${productArr[i].clicks} votes and was seen ${productArr[i].views} times.`;
      resultList.appendChild(liElem);
    }
    resultBtn.removeEventListener('click', handleResults);
  }
}

// ********* EXECUTABLE ##########
let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen =new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');

renderImg();

imgContainer.addEventListener('click', handleClick);
resultBtn.addEventListener('click', handleResults);
