

const groceryList = {
    fruits: ['apple', 'banana', 'orange', 'grapes'],
    vegetables: ['carrot', 'tomato', 'onion', 'potato'],
    drinks: ['soda', 'juice', 'milk', 'bubble water'],
    meat: ['beef', 'chicken', 'pork', 'lamb'],
    sweets: ['candy', 'chocolate', 'ice cream', 'cake']

}

let randomItems = [];


function fruitGenerator() {
    let randomIndex= Math.floor(Math.random() * groceryList.fruits.length);


    let randomFruit = groceryList.fruits[randomIndex];

    randomItems.push(randomFruit);
    return randomFruit;
 
}

function vegetablesGenerator() {
    let randomIndex = Math.floor(Math.random() * groceryList.vegetables.length);

    let randomVegetable = groceryList.vegetables[randomIndex];

    randomItems.push(randomVegetable);
    return randomVegetable;
}

function drinksGenerator() {
    let randomIndex = Math.floor(Math.random() * groceryList.drinks.length);

    let randomDrink = groceryList.drinks[randomIndex];

    randomItems.push(randomDrink);
    return randomDrink;
}

function meatGenerator() {  
    let randomIndex = Math.floor(Math.random() * groceryList.meat.length);

    let randomMeat = groceryList.meat[randomIndex];
    randomItems.push(randomMeat);
    return randomMeat;

}

function sweetsGenerator() {
    let randomIndex = Math.floor(Math.random() * groceryList.sweets.length);

    let randomSweet = groceryList.sweets[randomIndex];
    randomItems.push(randomSweet);
    return randomSweet;
}



let goButton = document.querySelector('.goButton')
let againButton = document.querySelector('.againButton')
let continueButton = document.querySelector('.continueButton')

againButton.style.display = 'none';
continueButton.style.display = 'none';


//TEXT CONTAINER ETC
let textContainer = document.querySelector('.textContainer');
let displayContainer = document.querySelector('.displayContainer');

let clickedItems = [];
let clickCount = 0;

let level = document.querySelector('.level');
let levelCount = 1;


const progressBar = document.querySelector('.timerInner');

let timeIDs = [];
function countDown(duration)  {
    const timerElement = document.querySelector('.timerInner');

    for (let i = 0; i <= duration; i++) {
        let timeID = setTimeout(() => {
            let progressWidth = ((duration - i) / duration) * 100;
            timerElement.style.width = progressWidth + '%';

            if(i=== duration) {
                textContainer.innerHTML = 'Time is up!';
            }

        }, i * 1200);
     timeIDs.push(timeID);  
    }
    
}

let achievementAudio = new Audio('./resurssit/music/achievement.wav');

//levelCount++ and winning condition
function checkGameCompletion(){
    if(randomItems.every(item => clickedItems.includes(item))) {
        levelCount++;

        level.innerHTML = levelCount;


        if(levelCount === 4) {
            displayContainer.innerHTML = 'You are the ultimate grocery shopper!'; //does not work
            continueButton.style.display = 'none';




            levelCount = 'You won the game!'; // works


            
            achievementAudio.pause(); //works
            achievementAudio.src = ''; 
            achievementAudio.currentTime = 0;  

            let winAudio = new Audio('./resurssit/music/winfretless.ogg');  //works
            winAudio.play();
        }


    }
}






//USE this on the other project!
function createButtons() {
    textContainer.innerHTML = ''; //clears the buttonareas, so they wont duplicate
    //timertest
    countDown(10);

    let allList = Object.values(groceryList);
    

    if (levelCount === 1) {
        allList = allList.filter(category => category !== groceryList.meat && category !== groceryList.sweets);
    }else if(levelCount === 2) {
        allList = allList.filter(category => category !== groceryList.sweets);
    }


    //gets every category and creates a button for each item
    allList.forEach(category => {
        category.forEach(item => {

    let newBtn = document.createElement('button');
    newBtn.className = 'itemButton';
 
    newBtn.innerText= `${item}`;
    document.querySelector('.textContainer').appendChild(newBtn);










    newBtn.addEventListener('click', function() {
        displayContainer.innerHTML += `${this.innerText}` + ', '; 
        clickedItems.push(this.innerText);
        clickCount++;
        let clickAudio = new Audio('./resurssit/music/click.wav');
        clickAudio.play();
        if(clickCount === randomItems.length) {
            checkGameCompletion();
        }


        
    if(randomItems.every(item => clickedItems.includes(item)))  {

        
        displayContainer.innerHTML = 'You got everything!';
        
        level.textContent = levelCount;
        continueButton.style.display = 'block';
        goButton.style.display = 'none';

        achievementAudio.play();


        const timerElement = document.querySelector('.timerInner');
        timerElement.style.width = '100%';
        
        timeIDs.forEach(timeID => clearTimeout(timeID));
        







    }
    else if(clickCount === randomItems.length) {
        displayContainer.innerHTML = 'You missed some items!';

        let failAudio = new Audio('./resurssit/music/negative.mp3');
        failAudio.play();
        
        const timerElement = document.querySelector('.timerInner');
        timerElement.style.width = '100%';
        timeIDs.forEach(timeID => clearTimeout(timeID));
    }
    else {
        displayContainer.innerHTML += '';
    }

});

});


});
 
return newBtn;
    }
    

   //why inside upper function? well, it works
    function startOver() {
        goButton.style.display = 'block'; 
        againButton.style.display = 'none';
        continueButton.style.display = 'none';    

        textContainer.innerHTML = '';
        displayContainer.innerHTML = '';
        clickedItems = [];
        clickCount = 0;
        randomItems = [];
        levelCount = 1;
        level.textContent = levelCount;
   
        const timerElement = document.querySelector('.timerInner');
        timerElement.style.width = '100%';


       goButton.addEventListener('click', yourList); {

    }
}


againButton.addEventListener('click', startOver); {
}









//Your randomly generated list
function yourList() {
    randomItems = []; //clears the list
    clickedItems = []; //clears the clicked items
    clickCount = 0; //clears the click count

    continueButton.removeEventListener('click', yourList);
    goButton.removeEventListener('click', yourList);




goButton.addEventListener('click', yourList);
continueButton.addEventListener('click', yourList);



    againButton.style.display = 'block';
    goButton.style.display = 'none';
    
    fruitGenerator();
    vegetablesGenerator();
    drinksGenerator();

    if(levelCount >= 2) {
        meatGenerator();
    }
     if(levelCount >= 3) {
        sweetsGenerator();
    }

    
        //textContainer.innerHTML = 'Your list: <br><br>'
        textContainer.innerHTML = '<br><br><br>'
     
        

        textContainer.innerHTML += randomItems.join('<br>'); 

        
        //textContainer.style.backgroundColor = 'white';
        // works textContainer.style.backgroundImage = "url('./resurssit/kuvat/myList.png')";

        textContainer.style.cssText = " background: no-repeat center/cover url('./resurssit/kuvat/myList.png'); background-size: 140%; background-position: -15px -70px;";

  
        displayContainer.innerHTML = '';

    setTimeout(() => {
        textContainer.innerHTML = '';
        textContainer.style.backgroundColor = ''; //modify the background
        textContainer.style.cssText = '';

    }, 1800);

    setTimeout(() => {
        textContainer.innerHTML = createButtons();

    }, 1900);

    


    goButton.addEventListener('click', yourList);
    continueButton.addEventListener('click', yourList);
    
};



goButton.addEventListener('click', yourList);
continueButton.addEventListener('click', yourList);



//create buttons of every GroceryList key, test

