function createNewCard() {
	/* Step 1: Create a new div element and assign it to a variable called cardElement. */
// NOTE: Changed from var to let!
let cardElement = document.createElement("div");

	/* Step 2: Add the "card" class to the variable 'cardElement' from the previous step. */
	
cardElement.classList.add("card");
  
	/* Step 3: Write the HTML for the children of the card element (card-down and card-up) as a normal string and assign it as the innerHTML of cardElement. */
  var cardHTML = `
      <div class="card-down"></div>
      <div class="card-up"></div>
  `;

  cardElement.innerHTML = cardHTML;

  /* Step 4: Return the cardElement. */

  return cardElement;

}
createNewCardTest();


function appendNewCard(parentElement) {
	/* Step 1: Create a new card by calling createNewCard() and assign it to a variable named cardElement. */
	// NOTE: Changed from var to let!
  let cardElement = createNewCard();
  
	/* Step 2: Append the card element to the parentElement (making the card element a "child").  */
	
  parentElement.appendChild(cardElement);
  
  /* Step 3: Return the card element. */
	
  return cardElement;
  
}
appendNewCardTest();


function shuffleCardImageClasses() {
  /* Step 1: Create a new array that contains two of each image class string in order (e.g. "image-1", "image-1", "image-2", "image-2"...). Store the array in a variable called 'cardClasses'.  */
// NOTE: Changed from var to let! Also it seemed the array was spanning across a few lines instead of just one, which may cause some errors, so I put it all on just one line!
  let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];

	/* Step 2: We're going to use a library to randomly "shuffle" the array we created. The library is called "underscore.js" because it uses an "_" character as an object to contain helper methods. Load underscore.js in your HTML via the CDN then open up the documentation linked below to learn how to use the 'shuffle' method.  
         
  CDN: https://cdnjs.com/libraries/underscore.js/1.4.1
  Shuffle: https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm 
 
  NOTE: Ignore the "require" syntax shown in the documentation as this is for non-browser environments. The '_' variable will already be available to you from loading the CDN. */
// NOTE: Changed from const to let!
  let shuffledImageClasses = _.shuffle(cardClasses);
  
	/* Step 3: Return the shuffled array of class names. */

  return shuffledImageClasses;
  
}
shuffleCardImageClassesTest()

//OMG IDK why my card backs aren't showing :'(

function createCards(parentElement, shuffledImageClasses) {
	/* Step 1: Make an empty array to hold our card objects. */
  // NOTE: Changed from var to let!
  let cardObjects = [];

  /* Step 2: Write a for loop that loops 12 times to create the 12 cards we need. */
  // NOTE: Changed var to let!
  for (let i = 0; i < 12; i++) {
  
    /* Step 2(a): Use appendNewCard to create/append a new card and store the result in a variable. */
    // NOTE: Changed from var to let!
    let cardElement = appendNewCard(parentElement);
    
		/* Step 2(b): Add an image class to the new card element using shuffledImageClasses[i]. */
    cardElement.classList.add(shuffledImageClasses[i]);
    
    /* Step 2(c): Append a new object to the card object array. The object should contain the following properties:
			"index" -- Which iteration of the loop this is.
			"element" -- The DOM element for the card.
			"imageClass" -- The string of the image class on the card. */	
    cardObjects.push({
            index: i,
            element: cardElement,
            imageClass: shuffledImageClasses[i]
        });
    }
    
  /* Step 3: Return the array of 12 card objects. */
return cardObjects;
}
createCardsTest();

//OMG IDK why my card backs aren't showing :'(

function doCardsMatch(cardObject1, cardObject2) {
	/* Step 1: Determine if two cards match. Remember the properties of our card objects from the createCards() function: index, element, and imageClass. */
  return cardObject1.imageClass === cardObject2.imageClass;
	
}
doCardsMatchTest();


/* The 'counters' object below is used as a dictionary to store our counter names and their respective values. Do you remember using objects as dictionaries? If not, go back to that video lesson in HQ to review. This object is empty for now but we'll fill it up in the following function. */
let counters = {};


function incrementCounter(counterName, parentElement) {
  /* Step 1: If the 'counterName' property is not defined in the 'counters' object, initialize it with a value of 0. */
  if (!(counterName in counters)) {
      counters[counterName] = 0;
  }
  
  /* Step 2: Increment the counter for 'counterName'. */
  counters[counterName]++;

  // incrementCounter('flipCounter', document.getElementById('flip-counter'));

  /* Step 3: Change the HTML within 'parentElement' to display the new counter value. */
  // NOTE: Was getting an error message here, so changed "textContent" to "innerHTML"
  parentElement.innerHTML = counters[counterName];

}
incrementCounterTest();

/* The 'onCardFlipped' function below will be called each time the user flips a card. The 'lastCardFlipped' variable is used to remember the first card flipped while we wait for the user to flip another card. We need to keep track of this value to determine if the two cards flipped match or not. 'lastCardFlipped' should be reset to 'null' each time a second card is flipped. */
let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
  /* Step 1: Use the 'incrementCounter' function to add one to the flip counter UI.  */
  
  // incrementCounter('flipsCounter', document.getElementById('flip-counter'));
// NOTE: Changed up some element/id names here, again you were SO close and those names are super similar!
  // incrementCounter('flips', document.getElementById('flip-count'));
  incrementCounter("flip", document.getElementById("flip-count"));
	/* Step 2: If 'lastCardFlipped' is null (this is the first card flipped), update 'lastCardFlipped' and return (nothing else to do) */
  if (lastCardFlipped === null) {
      lastCardFlipped = newlyFlippedCard;
      return;
  }

  /* If the above condition was not met, we know there are two cards flipped that should be stored in 'lastCardFlipped' and 'newlyFlippedCard', respectively. */
  

  /* Step 3: If the cards don't match, remove the "flipped" class from each, reset 'lastCardFlipped' to null, and use a 'return' to exit the function. Remember that newlyFlippedCard and lastCardFlipped are both objects made with the createCards function. This means that, to access each card's classList, you must access the card object's .element property first!  */
   
  // if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    //     lastCardFlipped.element.classList.remove('flipped');
    //     newlyFlippedCard.element.classList.remove('flipped');
    //     lastCardFlipped = null;
    //     return;
    // }

  if (lastCardFlipped.imageClass !== newlyFlippedCard.imageClass) {
    setTimeout(() => {
      lastCardFlipped.element.classList.remove('flipped');
      newlyFlippedCard.element.classList.remove('flipped');
      lastCardFlipped = null;
    }, 1000);
    return;
  }
  	
  /* Step 4: Now we have two matching cards. Increment the match counter and optionally add a "glow" effect to the matching cards. */
  // NOTE: SUPER close here, just some of the element/id names here were slightly off so I fixed it a little bit, but I know it can get confusing given how similar the names are!
      // incrementCounter('matchesCounter', document.getElementById('match-counter'));
  incrementCounter("match", document.getElementById("match-count"));
        lastCardFlipped.element.classList.add('border-glow');
        newlyFlippedCard.element.classList.add('border-glow');

  /* Step 5: Play either the win audio or match audio based on whether the user has the number of matches needed to win. Both sounds have been loaded in provided.js as matchAudio and winAudio, respectively. */
  // NOTE: AHHH so close here!!! I did replace the condition for the if statement from "counters.matchesCounter" to "counters["match"]"" as we want to match whatever is called in the incrementCounter part above, in this case "match" since I changed it up a bit!
  if (counters["match"] === 6) {
      winAudio.play();
  } else {
      matchAudio.play();
  }

  /* Step 6: Reset 'lastCardFlipped' to null */
 lastCardFlipped = null;

}

/* This function should remove all children from the #card-container, reset the flip and match counts displayed in the HTML, reset the counters dictionary to an empty object, reset lastCardFlipped to null, and set up a new game. */
function resetGame() {
	/* Step 1: Get the card container by its id and store it in a variable. */
  // NOTE: Changed from var to let!
  let cardContainer = document.getElementById('card-container');
	
	/* Step 2: Clear all the cards by using a while loop to remove the first child of the card container as long as a first child exists.
	See "To remove all children from an element:" in the Examples section of the MDN removeChild documentation -> https://mzl.la/3bklFxP */
  while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
  }
	
	/* Step 3: Get the HTML elements that display the flip and match counts and reset their inner text to 0. */
  // NOTE: Would get an error when trying to reset the game here with "textContent", and since we are getting an element by id from the HTML, I am going to use "innerText", similar to "innerHTML", here in place of that! Also, since it is a number value, we are going to just say 0 as opposed to '0' since that technically makes it a string! Also, such a minor error here, but instead of 'counter' for both flip and match, it is actually 'count' (very close and funky, I know!), so it was not getting the right elements and could not properly reset them! You had the right idea though!
  document.getElementById('flip-count').innerText = 0;
    document.getElementById('match-count').innerText = 0;
  
  /* Step 4: Reassign the value of the `counters` dictionary to an empty object  */
  counters = {}; 
	
	/* Step 5: Set lastCardFlipped back to null. */
  lastCardFlipped = null;
	
	/* Step 6: Set up a new game. */
  // NOTE: Added this back here to properly set up that new game! You had a "new" in there too, but it is just setUpGame();, super close though!!
  setUpGame();

}



// ⛔️ Set up the game. Do not edit below this line! ⛔
setUpGame();