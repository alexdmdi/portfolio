//Selecting and changing website elements (DOM manipulation):

//html file: blah blah

//js file: 
var div1 = document.getElementById('div1');  
//this will select everything with or within the id of "div1" in the html file

var unicycle = document.getElementsByClassName('unicyle');
//selects all elements with class set to "unicyle"

//now, if you want to only select things with the "unicycle" class, within a "div1" id scope:
// deepcode ignore RedeclarationVars: <please specify a reason of ignoring this>
var unicycle = div1.getElementsbyClassName('unicycle');


var paragraphs = document.getElementsByTagName('p');
//gets all html <p></p> tag elements


var queryUnicycle = document.querySelector('.unicycle');
//returns first element in the doc that matches this selection

var queryAll = document.querySelectorAll('.unicycle, #div2');
//returns an array of elements that match with class unicycle or with id div2



var text = "<h1>Hello World</h1>";
div1.innerHTML = text;  
//replaces all html in div1, to what is in the text variable

