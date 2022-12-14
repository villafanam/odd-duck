'use strict';

// ********* GLOBAL VARIABLES ##########
let productArr = [];
let arrIndex = [];
let preProduct = [0, 0, 0];
let votingRounds = 25;

// ********* DOM WINDOWS ##########
let imgContainer = document.getElementById('image-container');
let imgOne = document.getElementById('image1');
let imgTwo = document.getElementById('image2');
let imgThree = document.getElementById('image3');

let resultBtn = document.getElementById('btnResult');
let resultList = document.getElementById('result-list');

let canvasElem = document.getElementById('chart');
document.querySelector('button').style.visibility = 'hidden';


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
  // ** Validation to make sure numbers are unique **
  while(arrIndex.length < 3)
  {
    let randNum = randomIndex();
    if(!arrIndex.includes(randNum) && !preProduct.includes(randNum))
    {
      arrIndex.push(randNum);
      //preProduct.pop();
    }

  }

  // TODO: 3 unique images and populate the images
  let img1Index = arrIndex.pop();
  let img2Index = arrIndex.pop();
  let img3Index = arrIndex.pop();
  preProduct.pop();
  preProduct.pop();
  preProduct.pop();

  preProduct.push(img1Index, img2Index, img3Index);

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

function renderChart() {
  // TODO: Build out my chart obj
  let proNames = [];
  let proVotes = [];
  let proViews = [];

  for (let i = 0; i < productArr.length; i++) {
    proNames.push(productArr[i].name);
    proVotes.push(productArr[i].clicks);
    proViews.push(productArr[i].views);
  }

  Chart.defaults.font.size = 20;
  Chart.defaults.font.weight = 'bold';

  let chartObj = {
    type: 'bar',
    data: {
      labels: proNames,
      datasets: [{
        label: '# of Votes',
        data: proVotes,
        borderWidth: 1,
        backgroundColor: ['hsl(224, 85%, 66%)',
          'hsl(269, 85%, 66%)',
          'hsl(314, 85%, 66%)',
          'hsl(359, 85%, 66%)',
          'hsl(44, 85%, 66%)',
          'hsl(89, 85%, 66%)',
          'hsl(134, 85%, 66%)',
          'hsl(179, 85%, 66%)'],
      },
      {
        label: '# of Views',
        data: proViews,
        borderWidth: 1,
        backgroundColor: ['hsl(224, 85%, 34%)',
        'hsl(269, 85%, 34%)',
        'hsl(314, 85%, 34%)',
        'hsl(359, 85%, 34%)',
        'hsl(44, 85%, 34%)',
        'hsl(89, 85%, 34%)',
        'hsl(134, 85%, 34%)',
        'hsl(179, 85%,34%)']
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // TODO: use the Chart Constructor - pass in canvas elem, and my chartObj with all the goat data
  new Chart(canvasElem, chartObj);
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
      document.querySelector('button').style.visibility = 'visible';
      imgContainer.removeEventListener('click', handleClick);

       // ****** LOCAL STORAGE STARTS HERE ******
      // ! STEP 1 - STRINGIFY DATA FOR LOCAL STORAGE
      let stringifiedProducts = JSON.stringify(productArr);

      // ! STEP 2 - SET TO LOCAL STORAGE
      localStorage.setItem('myProducts', stringifiedProducts);
    }
}

function handleResults()
{
  if(votingRounds === 0)
  {
    //result list rendering
    // for(let i = 0; i < productArr.length; i++)
    // {
    //   let liElem = document.createElement('li');
    //   liElem.textContent = `${productArr[i].name} had ${productArr[i].clicks} votes and was seen ${productArr[i].views} times.`;
    //   resultList.appendChild(liElem);
    // }
    
    renderChart();
    resultBtn.removeEventListener('click', handleResults);
  }
}

// ********* EXECUTABLE ##########

// ! STEP 3 - PULL DATA FROM LOCAL STORAGE
let retrProducts = localStorage.getItem('myProducts');

// ! STEP 4 - PARSE OUR LOCAL STORAGE DATA
let parsedProducts = JSON.parse(retrProducts);

//  ******* REBUILD GOATS USING CONSTRUCTOR *******
if (retrProducts)
{
  for (let i = 0; i < parsedProducts.length; i++)
  {
    if (parsedProducts[i].name === 'sweep') {
      let reconstructedSweep = new Product(parsedProducts[i].name, 'png');
      reconstructedSweep.views = parsedProducts[i].views;
      reconstructedSweep.votes = parsedProducts[i].clicks;
    } else {
      let reconstructedProduct = new Product(parsedProducts[i].name);
      reconstructedProduct.views = parsedProducts[i].views;
      reconstructedProduct.clicks = parsedProducts[i].clicks;
    }
  }
} 
else 
{
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
}

renderImg();

imgContainer.addEventListener('click', handleClick);
resultBtn.addEventListener('click', handleResults);
