"use strict"; //The code is to be executed in strict mode

/*const toDoArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []; 
toDoArray.forEach(item => {addToDo(item)}); */

//Wrapping code in this helps prevent: Cannot read property 'addEventListener' null type of error
document.addEventListener('DOMContentLoaded', () => {  
    
  
    //Selects the submit button and input field based on their ID's
    const submitBtn = document.querySelector('#submitBtn');
    const inputText = document.querySelector('#inputText');
    const entryList = document.querySelector('#entryList');

    // function for toggling list items check boxes on click
    const toggleCheckBox = (checkbox) => {
        checkbox.checked = !checkbox.checked;
    }

    //adds an event listener to the unordered list
    entryList.addEventListener('click', (event) => {
        //tagName property always returns the element as upper case letters so this is why LI must be capitalized
        const target = event.target; 
        
        //first checks if the clicked element is a list item ('LI') then calls toggleCheckBox function 
        if (target.tagName ==='LI') { 
            const checkbox = target.querySelector(input[type="checkbox"]);
            toggleCheckBox(checkbox); 
        }   

    });


    // Adds event listener to the submit button
    submitBtn.addEventListener('click', (event) => {
      event.preventDefault();  //prevents the page from refreshing
      addToDo();
    });

    function addToDo()
    {
        if (inputText.value !== "") //ensures inputText value is not empty on submit
        {
          console.log(inputText.innerHTML);
          // Create the needed html elements
          const li = document.createElement("li");
          const checkbox = document.createElement('input');
          const label = document.createElement('label');
          const textValueNode = document.createTextNode(inputText.value.trim());
          const closeButton = document.createElement('button');

          /*toDoArray.push(textValueNode);*/
          /*localStorage.setItem('items', JSON.stringify(toDoArray));*/

          //sets attributes for the checkbox
          checkbox.setAttribute('type', 'checkbox');
          checkbox.setAttribute('class', 'form-check-input me-2');
          checkbox.setAttribute('value', '');
          checkbox.setAttribute('aria-label', 'an entry in the list');

          //set attributes for label
          label.setAttribute('class', 'form-check-label flex-grow-1');
          label.appendChild(textValueNode);

          //set attributes for close button
          closeButton.setAttribute('type', 'button');
          closeButton.setAttribute('class', 'btn-close');
          closeButton.setAttribute('aria-label', 'Close');

          //set attributes for list item
          li.setAttribute('class', 'list-group-item list-group-item-action d-flex list-group-item-secondary');
          li.setAttribute('id','to-do-list-item');
          li.appendChild(checkbox);    //adds checkbox element within the list item
          li.appendChild(label);       //adds label element within the list item
          li.appendChild(closeButton); //adds close button element within the list item

          //appends the whole new list item to the unordered list in the document
          entryList.appendChild(li);

        }
        else {
          window.alert("Cannot submit empty form!")
        }

        // Clears text input field
        inputText.value = "";
        
    }

    //Ensures that each list item checkbox can be toggled by clicking on any of the elements within it (except the close button) 
    entryList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'INPUT') {
          // Checkbox was clicked, toggle the strikethrough on label
          const label = target.nextElementSibling;
          label.classList.toggle('text-decoration-line-through');
        } 
        else if (target.tagName === 'LABEL') {
          // Label was clicked, trigger click event on associated checkbox
          const checkbox = target.previousElementSibling;
          checkbox.click(); 
        }
        else if (target.tagName === 'LI') {
            const checkbox = target.querySelector('input[type="checkbox"]');
            checkbox.click();

        }
        else if (target.classList.contains('btn-close')) {
          // Close button was clicked, remove list item
          const listItem = target.closest('li');
          listItem.remove();
        }
    });


  });
  
