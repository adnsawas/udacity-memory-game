/*
 * Create a list that holds all of your cards
 */

let openedCards = [];
let matchesCount = 0;
let attempts = 0;
let unmatchedCardsTimerIsRunning = false;
let shuffeledContent = [];

const cardsContent =   ["fa-diamond",
						"fa-paper-plane-o",
						"fa-heart",
						"fa-home",
						"fa-bicycle",
						"fa-car",
						"fa-camera",
						"fa-money"];

resetGame();

// for (var i = 0; i < cardsContent.length; i++) {
// 	shuffeledContent.push(cardsContent[i]);
// 	shuffeledContent.push(cardsContent[i]);
// }

// shuffeledContent = shuffle(shuffeledContent);

// let virtualDeck = document.createDocumentFragment();

// for (let i = 0; i < 16; i++) {
// 	let card1 = document.createElement("li");
// 	let card1Content = document.createElement("i");

// 	card1Content.classList.add("fa");
// 	card1Content.classList.add(shuffeledContent[i]);

// 	card1.classList.add("card");

// 	// This is for testing only, remove when game is complete
// 	//card1.classList.add("show");
// 	card1.appendChild(card1Content);
// 	virtualDeck.appendChild(card1);
// }

//  // Add the shuffeled cards into the deck
//  document.getElementsByClassName("deck")[0].appendChild(virtualDeck);

 document.getElementsByClassName("deck")[0].addEventListener("click", function(event) {
 	if (unmatchedCardsTimerIsRunning) {return;}
 	let clickedTarget;
 	if (event.target.tagName == "UL") // User clicked on the canvas but not on a card
 	{
 		return;
 	}
 	else if (event.target.tagName == "I") // User clicked exactly on the card symbol
 	{
 		clickedTarget = event.target.parentElement;
 	}
 	else // User for sure clicked on the card
 	{
 		clickedTarget = event.target;
 	}

 	// clickedTarget is now pointing to the right clicked card

 	// First open the card by adding the show and open classes
 	clickedTarget.classList.add("show");
 	clickedTarget.classList.add("open");

 	// Add the opened card to the openedCards array
 	openedCards.push(clickedTarget);

 	// Check if the clicked card is the first or second card
 	if (openedCards.length == 1) {return;}
 	if (openedCards.length == 2) {

 		// Check that the user did not click the same card twice
 		if (openedCards[0] == openedCards[1])
 		{
 			openedCards.pop();
 			return;
 		}

 		document.getElementsByClassName("moves")[0].innerText = ++attempts;
 		// The user selected the second card and it is time to evaluate
 		if (isCardsMatched()) {

 			
 			console.log("Match");

 			// Keep the card open and mark it as match
 			openedCards[0].classList.remove("open");
 			openedCards[0].classList.add("match");

 			openedCards[1].classList.remove("open");
 			openedCards[1].classList.add("match");

 			// Increase the match counter
 			matchesCount++;

 			openedCards.pop();
 			openedCards.pop();

 			if (matchesCount >= 8) { // The winning condition
 				console.log("You Won !");
 				document.getElementById("winning").showModal();
 			}
 			
 		}
 		else {
 			console.log("Not Match");

 			// Animate here if possible

 			unmatchedCardsTimerIsRunning = true;
 			// Close the two cards after 0.5 second
 			setTimeout(function(){ 
	 			openedCards[0].classList.remove("open");
	 			openedCards[0].classList.remove("show");

	 			openedCards[1].classList.remove("open");
	 			openedCards[1].classList.remove("show"); 

				// Remove the open cards from the openedCards array to prepare for the next round
			 	openedCards.pop();
			 	openedCards.pop();
			 	unmatchedCardsTimerIsRunning = false;
			 }, 750);

 				
 		}

 		
 	}
 });

function isCardsMatched() {
	let isMatch = false;
	return (openedCards[0].children[0].className == openedCards[1].children[0].className);

}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function resetGame() {
	if (document.getElementById("winning").open) {
		document.getElementById("winning").close();
	}

	// Reset all deck cards
	if (document.getElementsByClassName("deck")[0].children.length > 0) {
		let currentCards = document.getElementsByClassName("card");
		for (let i = 0; i < 16; i++) {
			currentCards[0].remove();
		}
	}

	openedCards = [];
	matchesCount = 0;
	attempts = 0;
	unmatchedCardsTimerIsRunning = false;
	shuffeledContent = [];

	for (var i = 0; i < cardsContent.length; i++) {
		shuffeledContent.push(cardsContent[i]);
		shuffeledContent.push(cardsContent[i]);
	}

	shuffeledContent = shuffle(shuffeledContent);

	let virtualDeck = document.createDocumentFragment();

	for (let i = 0; i < 16; i++) {
		let card1 = document.createElement("li");
		let card1Content = document.createElement("i");

		card1Content.classList.add("fa");
		card1Content.classList.add(shuffeledContent[i]);

		card1.classList.add("card");

		// This is for testing only, remove when game is complete
		//card1.classList.add("show");
		card1.appendChild(card1Content);
		virtualDeck.appendChild(card1);
	}

	 // Add the shuffeled cards into the deck
	 document.getElementsByClassName("deck")[0].appendChild(virtualDeck);
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
