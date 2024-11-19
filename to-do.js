"use strict"; //The code is to be executed in strict mode

/*Wrapping this code in this helps prevent the Cannot read property 'addEventListener' null error, although it would probably
work fine either way without it in this case, due to the defer attribute added to the script tag in to-do-list.html */
document.addEventListener('DOMContentLoaded', () => {  

  //Selects the submit button and input field based on their ID's
  const submitBtn = document.querySelector('#submitBtn');
  const inputText = document.querySelector('#inputText');
  const entryList = document.querySelector('#entryList'); // this will contain the listItem elements

  let todos = [];
  if (localStorage.getItem("todoItems") !== null){
    todos = JSON.parse(localStorage.getItem("todoItems")) ;
    console.log (`To do items from local storage: ${JSON.stringify(todos)} `);

    renderList(todos);
  }
  else console.log('local storage empty');

  // Adds event listener to the submit button
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();  //prevents the page from refreshing on submit
    if (inputText.value !== "") {
      const todo = {
        text: inputText.value.trim(),
        id: generateHexID(),
        isChecked: false
      }
      todos.push(todo);          //push this todo object to the todos[] array

      localStorage.setItem("todoItems", JSON.stringify(todos));
      inputText.value = "";      //resets input field
      entryList.innerHTML = "";
      renderList(todos);         //calls function to re-render entire to-do list of elements when a new item is added
    }
    else {
      window.alert("Cannot submit empty form!")
    }
  });

  function renderList (todos) {
    todos.forEach( (todoObj) => {addToDo(todoObj);} );
  }

  //non library dependent way to generate random ID value, sufficiently 'random' for this demo use case
  function generateHexID() {
    // Generate 8 random bytes and convert to hexadecimal
    return Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  
  function addToDo(todoObj)
  {  
        // Creates the 5 required elements
        const listItem = document.createElement('listItem');
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        const textValueNode = document.createTextNode(todoObj.text);
        const closeButton = document.createElement('button');
  
        //sets attributes for the checkbox
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'form-check-input me-2');
        checkbox.setAttribute('value', '');
        checkbox.setAttribute('aria-label', 'An entry in the list');
        checkbox.checked = todoObj.isChecked;
  
        //set attributes for label, and sets strikethrough styling based on whether or not the listItem is set to checked (through setting the class name for bootstrap styling)
        label.setAttribute('class', 'form-check-label flex-grow-1 todoItem');
        if (checkbox.checked == true){
          label.classList.toggle('text-decoration-line-through');
        }
        label.appendChild(textValueNode);
  
        //set attributes for the eclose 'X" button
        closeButton.setAttribute('type', 'button');
        closeButton.setAttribute('class', 'btn-close');
        closeButton.setAttribute('aria-label', 'Close');
  
        //set attributes for list item
        listItem.setAttribute('class', 'list-group-item list-group-item-action d-flex list-group-item-secondary');
        listItem.setAttribute('id',todoObj.id);
        listItem.appendChild(checkbox);    //adds checkbox element within the list item
        listItem.appendChild(label);       //adds label element within the list item
        listItem.appendChild(closeButton); //adds close button element within the list item
  
        //appends the prepared new listItem to the entryList element in the document, so it actually displays on the page
        entryList.appendChild(listItem);

  }

   //Ensures that each list items checkbox can be toggled by clicking on any of the elements within it (except the close button) 
   entryList.addEventListener('click', (event) => {
      
      const target = event.target; 
      // console.log(`target is: ${target.innerHTML}`); 
      /*this console log runs twice due to event bubbling. The click event listener on entryList will be triggered for each element within it that is clicked*/
      
      const listItem = target.closest('listItem')    //Gets the parent list item which contains the 3 inner elements for the input, label, and close button
      if (!listItem) return;                         //If no list item is found, then exit
      
      const todoId = listItem.id;                    //gets the ID of the listItem HTML element that was clicked
      const todoIndex = todos.findIndex(todo => todo.id === todoId)  //searches through the todos array to find the index of the given todo object, based on the id property 
      if (todoIndex === -1) return;                  //if no matching to do found, exit
      
      if (target.tagName === 'INPUT') {              //reminder: even if the original tag name is/contains lowercase, when referring to the tagName it should be in all uppercase
        // input was clicked, toggle the strikethrough on label and toggle checkbox
        const label = target.nextElementSibling;
        label.classList.toggle('text-decoration-line-through');
        todos[todoIndex].isChecked = target.checked;
      } 
      else if (target.tagName === 'LABEL') {
        // Label was clicked, trigger click event on associated checkbox
        const checkbox = target.previousElementSibling;
        checkbox.click(); // Toggles checkbox and triggers the INPUT case above
      }
      else if (target.tagName === 'LISTITEM') {
        // Checkbox was clicked, toggle the strikethrough on label
        const checkbox = target.querySelector('input[type="checkbox"]');
        checkbox.click(); // Toggles checkbox and triggers the INPUT case above
      } 

      else if (target.classList.contains('btn-close')) {
        // Close button was clicked, remove list item
        const listItem = target.closest('listItem');
        console.log (`list item text is: ${listItem.childNodes[1].innerText} with type of: ${typeof listItem.childNodes[1].innerText}`)
        listItem.remove();

        console.log(`todos index of removed item is is: ${todoIndex}`)
        todos.splice(todos.indexOf(listItem.childNodes[1].innerText), 1)
        localStorage.setItem("todoItems", JSON.stringify(todos))

        console.log(`Item removed, storage todoItems is now: ${localStorage.getItem("todoItems")} `);
        console.log(`todos is now: ${todos}`)
        entryList.innerHTML = "";
        
        renderList(todos);
        return;
      }

      //Saves a copy of the updated todos array to local storage
      localStorage.setItem("todoItems", JSON.stringify(todos));

  });


});
  
