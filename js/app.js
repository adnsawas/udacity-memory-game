/*
 * Create a list that holds all of your cards
 */

const cardsContent =   ["fa-diamond",
						"fa-paper-plane-o",
						"fa-heart",
						"fa-home",
						"fa-bicycle",
						"fa-car",
						"fa-camera",
						"fa-money"];

let shuffeledContent = [];
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
	card1.classList.add("show");
	card1.appendChild(card1Content);
	virtualDeck.appendChild(card1);
}

 // Add the shuffeled cards into the deck
 document.getElementsByClassName("deck")[0].appendChild(virtualDeck);



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
