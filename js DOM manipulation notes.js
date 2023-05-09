//BASICS: Selecting and changing website elements (DOM manipulation):

//this will select everything with or within the id of "div1" in the html file
var div1 = document.getElementById('div1');  

//selects all elements with class set to "unicyle"
var unicycle = document.getElementsByClassName('unicyle');


//now, if you want to only select things with the "unicycle" class, within a "div1" id scope:
// deepcode ignore RedeclarationVars: <please specify a reason of ignoring this>
var unicycle = div1.getElementsbyClassName('unicycle');

//gets all html <p></p> tag elements
var paragraphs = document.getElementsByTagName('p');


//returns first element in the doc that matches this selection
var queryUnicycle = document.querySelector('.unicycle');

//returns an array of elements that match with class unicycle or with id div2
var queryAll = document.querySelectorAll('.unicycle, #div2');


//replaces inner HTML in div1, to what is in the text variable
var text = "<h1>Hello World</h1>";
div1.innerHTML = text;  


// --------------------------------------------------------------------------------------------------
//STLYING:
const rainbowButton = document.querySelector("rainbow");
rainbowButton.style.backgroundColor = "green"; 
rainbowButton.style.color = "blue" //changes text color to blue
rainbowButton.style.fontSize = '2rem'; 

//Trying to select multiple list items then changing their color all at once:
//must be done by looping through them:

const listItems = document.querySelectorAll('list-items');   //listItems.style.fontSize = '2rem' DOESNT WORK
for (i = 0; i < listItems.length; i++){
    listItems[i].style.fontSize = '2rem';
}

// ------------------------------------------------------------------------------------------------
// Creating/appending elements, modifying them, and deleting them:

const my_ul = document.querySelector('ul');
const my_li document.createElement('li');  //this just creates it, but doesn't automaticaly add it to the unordered list
my_ul.append(my_li);


const firstListItem = document.querySelector('list-items') //actually grabs only the first item not all
firstListItem.innerText       //just the inner text in the node , between the >  <
firstListItem.innerContent    //displays the inner content whatevr it is, with the same formatting as in the HTML file. If there is text that is on 2 lines in the html file it will be 2 lines here too.
firstListItem.innerHTML       //also shows any inner html elements such as span tags if you put that in. (example: <li> <span>The Matrix<span> </li>)

//NOTE: be careful with using innerHTML, you normally don't want to allow user input to control inner HTML as they may inject their code


//modifying attributes:
my_li.setAttribute('id', 'main-heading'); //adds id and sets it as 'main-heading'
my_li.removeAttribute('id'); //removes the currently set ID

const title = document.querySelector('#main-heading')
console.log(title.getAttribute('id')); //gets and displays the value of id attribute for "title" , outputs "main-heading" in console



my_li.classList.add('class1') //adds class1 to the list of existing classes for that element
my_li.classlist.remove('class1') //removes class1

console.log(li.classList.contains("class1")); //checks if my_li contains "class1" in its list of classes, returns true or false

//REMOVE ELEMENT:
my_li.remove();  //removes entire my_li element

// ---------------------------------------------------------------------------------------------
//TRAVERSING THE DOM: 
//note: indentations count as text nodes

my_ul.parentNode;     //more commonly used, tries to retrieve any kind of node not just elements, 
my_ul.parentElement;  //slight difference between the 2

//can also traverse more than once up or down:
my_ul.parentElement.parentElement

console.log (my_ul.childNodes) //returns list of child nodes
console.log(my_ul.children) //returns list of elements only 


console.log(my_ul.firstChild) // returns first child node 
console.log(my_ult.firstElementChild) //returns first element child

console.log(my_ul.lastChild) //returns last child node, or do lastElementChild for last element child

//SIBLINGS:
console.log(my_ul.previousSibling)
console.log(my_ul.previousElementSibling)

console.log(my_ul.nextSibling)
console.log(my_ul.nextElementSibling)


// ------------------------------------------------------------------------------------------------
//EVENT LISTENERS:

//in HTML file you can do inline eventlistener: <button onclick = "alert('hello')"> press me! </button> 
//can only apply one event listener to the element though in this case.

//in JavaScript file instead:
myElement.addEventListener ('click', theFunction);
myElement.addEventListener ('mouseover', changeBgColor);

function changeBgColor () {
    myElement.style.backgroundColor = 'blue';
}



//-------------------------------------------------------------------------------------------------
//EVENT PROPOGATION: how an event travels through the DOM 
//...



// ---------------------------------------------------------------------------------------------------
//Event delegation:

// Allows users to append a SINGLE event listener to a parent element that adds it to all of its present AND future descendants that match a selector.
//Helps reduce lines of code and repetition, instead of making a function/selector for each possible inner list item 

//changes background of list item to light gray. The way its done here is that the sports parent element is selected
//as it detects the click that propogates upward from any of its child nodes, and then based on the exact list item that was pressed
//and its own unique ID, it will be reported through the use of "eventObject.target.getAttribute('id')"" line
document.querySelector('#sports').addEventListener ('click', function(eventObject) {
    console.log(eventObject.target.getAttribute('id') + ' was clicked!');

    const target =  eventObject.target;

    if (target.matches('li')) {
        target.style.backgroundColor = 'lightgrey'
    }
})







