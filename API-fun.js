"use strict";
    
// gets reference to the button and paragraph elements
const jokeButton = document.getElementById ('joke-button');
const jokeText = document.getElementById('joke-api-text');

jokeButton.addEventListener('click', () => {
    //send a GET request to the joke api using fetch and promises
    fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => response.json())
    .then(data => {
        // console.log(`joke data response: ${data.setup} \n ${data.punchline}`)
        jokeText.setAttribute ('style', 'color:white;');
        jokeText.setAttribute ('class', 'fw-medium fs-5 text-center');
        jokeText.textContent = `${data.setup} \n \n ${data.punchline}`;
    })
    .catch(error => console.error(error));
});

/**************************************************************************/

//gets reference to quote button and paragraph elements
const quoteButton = document.getElementById ('quote-button');
const quoteText = document.getElementById ('quote-api-text');

quoteButton.addEventListener('click', () => {getQuote()})

async function getQuote() {
    const randomNum = Math.floor(Math.random() * 16);  //16 is total length of the response object array
    try {
        const response = await fetch('https://quoteslate.vercel.app/api/quotes/random');
        const result = await response.json();
        console.log(result);
        console.log(`Quote is: ${result.quote} --- Author is ${result.author}`);
        let quote = result.quote;
        let responseAuthor = result.author;

        if (responseAuthor == null || responseAuthor == '' ){
            responseAuthor = 'unknown'
            console.log(`author is unknown`);
        }
    
        quoteText.setAttribute ('style', 'color: white;');
        quoteText.setAttribute ('class', 'fw-medium fs-5 text-center');
        quoteText.innerText = ('"' + quote + '" - ' + responseAuthor);
    } 
    catch (error) {
        console.error(error);
    }

}
    