"use strict";
    
// gets reference to the button and paragraph elements
const boredButton = document.getElementById ('bored-button');
const boredText = document.getElementById('bored-api-text');

boredButton.addEventListener('click', () => {
    //send a GET request to bored api using fetch and promises
    fetch('https://www.boredapi.com/api/activity')
    .then(response => response.json())
    .then(data => {
        boredText.setAttribute ('style', 'color:white;');
        boredText.setAttribute ('class', 'fw-medium fs-4 text-center');
        boredText.textContent = data.activity;
    })
    .catch(error => console.error(error));
});

/**************************************************************************/

//gets reference to quote button and paragraph elements
const quoteButton = document.getElementById ('quote-button');
const quoteText = document.getElementById ('quote-api-text');

quoteButton.addEventListener('click', () => {getQuote()})

async function getQuote() {
    const randomNum = Math.floor(Math.random() * 1644);  //1643 is total length of the response object array
    try {
        const response = await fetch('https://type.fit/api/quotes');
        const result = await response.json();
        quoteText.setAttribute ('style', 'color: white;');
        quoteText.setAttribute ('class', 'fw-medium fs-5 text-center');
        quoteText.innerHTML = ('"' + (result[randomNum].text) + '" - ' + (result[randomNum].author === null ? 'Unknown' : result[randomNum].author));
    } 
    catch (error) {
        console.error(error);
    }

}
    