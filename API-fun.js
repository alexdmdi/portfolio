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
        const response = await fetch('https://type.fit/api/quotes');
        const result = await response.json();
        const responseAuthor = result[randomNum].author;
        let author = 'Unknown';

        if (responseAuthor !== null && responseAuthor !== '' && responseAuthor !== 'type.fit' ){
            author = result[randomNum].author.replace(', type.fit', '');
            console.log(`author is ${author}`);
        }
    
        console.log(result);
        quoteText.setAttribute ('style', 'color: white;');
        quoteText.setAttribute ('class', 'fw-medium fs-5 text-center');
        quoteText.innerText = ('"' + (result[randomNum].text) + '" - ' + author);
    } 
    catch (error) {
        console.error(error);
    }

}
    