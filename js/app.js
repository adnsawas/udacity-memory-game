/*
 * Create a list that holds all of your cards
 */

let stars = document.getElementsByClassName("stars")[0];
let openedCards = [];
let matchesCount = 0;
let attempts = 0;
let unmatchedCardsTimerIsRunning = false; // This variable is used to prevent selecting any card when an animation is running
let shuffeledContent = [];

// Timer variables
let seconds = 0;
let minutes = 0;
let secondsText = document.getElementById("seconds");
let minutesText = document.getElementById("minutes");
let interval;

const cardsContent =   ["fa-diamond",
						"fa-paper-plane-o",
						"fa-heart",
						"fa-home",
						"fa-bicycle",
						"fa-car",
						"fa-camera",
						"fa-money"];

resetGame();

// Adding the event listener and handling of a click
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

 		// Increase moves by one
 		document.getElementsByClassName("moves")[0].innerText = ++attempts;

 		// evaluate how many stars should appear
 		evaluateStars();

 		// The user selected the second card and it is time to evaluate
 		if (isCardsMatched()) {
 			console.log("Match");
 			// Keep the matched cards open and mark them as match
 			openedCards[0].classList.remove("open");
 			openedCards[0].classList.add("match");
 			openedCards[0].classList.add("selected"); // Added this class to use jQuery selector to animate cards with "selected" class

 			openedCards[1].classList.remove("open");
 			openedCards[1].classList.add("match");
 			openedCards[1].classList.add("selected"); // Added this class to use jQuery selector to animate cards with "selected" class

 			// Animate here if possible
 			$( ".card.selected" ).effect( "highlight", {}, 500);

 			// Remove the "selected" calss from so they do not get animated again when another match is found
 			openedCards[0].classList.remove("selected");
 			openedCards[1].classList.remove("selected");

 			// Increase the match counter
 			matchesCount++;

 			openedCards.pop();
 			openedCards.pop();

 			if (matchesCount >= 8) { // The winning condition
 				console.log("You Won !");

 				// Show the dialog (the winning page)
 				document.getElementById("winning").showModal();
 				stopTimer();
 			}
 			
 		}
 		else { // The two selected cards did not match
 			console.log("Not Match");

 			// Animate here if possible
 			$( ".card.open" ).effect( "shake", {}, 500);

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
	document.getElementsByClassName("moves")[0].innerText = "0";

	// Use the list of cards content (list of images to be used in the deck) to create an array to be shuffled later
	for (var i = 0; i < cardsContent.length; i++) {
		shuffeledContent.push(cardsContent[i]);
		shuffeledContent.push(cardsContent[i]);
	}

	// Same array was used to store the shuffled array to reduce number of variables
	shuffeledContent = shuffle(shuffeledContent);

	let virtualDeck = document.createDocumentFragment();
	// This virtal deck will contain the DOM of all cards

	// This loop creates the DOM content of all cards
	for (let i = 0; i < 16; i++) {
		let card1 = document.createElement("li");
		let card1Content = document.createElement("i");

		card1Content.classList.add("fa");
		card1Content.classList.add(shuffeledContent[i]);

		card1.classList.add("card");

		card1.appendChild(card1Content);
		virtualDeck.appendChild(card1);
	}

	 // Add the virtal deck containing the shuffeled cards into the deck
	 document.getElementsByClassName("deck")[0].appendChild(virtualDeck);

	 // Aplying animation when adding cards to the deck
	 $( ".card" ).show( "size", {}, 500, function(){
	 	let cards = document.getElementsByClassName("card");
	 	for (let i = 0; i < cards.length; i++)
	 	{
	 		cards[i].setAttribute("style", "display: flex");
	 	}
	 });

	 // Reset stars
	 evaluateStars();

	 // Reser Timer
	 resetTimer();

}

function evaluateStars() {

	if (attempts == 0) { // Make all stars filled
		stars.children[1].children[0].classList.remove("fa-star-o");
		stars.children[2].children[0].classList.remove("fa-star-o");
		
		stars.children[1].children[0].classList.add("fa-star");
		stars.children[2].children[0].classList.add("fa-star");
	}

	else if (attempts < 14) { // Do nothing when attempts is below 12
		return;
	}

	else if (attempts < 17) { // Reduce one star (the last star in the right)
		stars.children[2].children[0].classList.remove("fa-star");
		stars.children[2].children[0].classList.add("fa-star-o");
	}

	else if (attempts > 17) { // Reduce one more star (the middle star)
		stars.children[1].children[0].classList.remove("fa-star");
		stars.children[1].children[0].classList.add("fa-star-o");
	}
	
}


function startTimer() {
	seconds++;

	if (seconds <  10) {secondsText.innerHTML = "0" + seconds;}
	if (seconds >  9) {secondsText.innerHTML = seconds;}
	if (seconds > 59) {
		minutes++;
		seconds = 0;
		secondsText.innerHTML = "00";
		minutesText.innerHTML = "0" + minutes;
	}

	if (minutes > 9) {minutesText.innerHTML = minutes;}
}

function stopTimer() {
	clearInterval(interval);
}

function resetTimer() {
	seconds = 0;
	minutes = 0;

	secondsText.innerHTML = "00";
	minutesText.innerHTML = "00";

	clearInterval(interval);
	interval = setInterval(startTimer, 1000);
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
