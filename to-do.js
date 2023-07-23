"use strict"; //The code is to be executed in strict mode

/*Wrapping this code in this helps prevent the Cannot read property 'addEventListener' null error although it 
should work fine without it in this case, due to the defer attribute added to the script tag in to-do-list.html */
document.addEventListener('DOMContentLoaded', () => {  

  //Selects the submit button and input field based on their ID's
  const submitBtn = document.querySelector('#submitBtn');
  const inputText = document.querySelector('#inputText');
  const entryList = document.querySelector('#entryList');

  let todos = [];
  if (localStorage.getItem("todoItems") !== null){
    todos = JSON.parse(localStorage.getItem("todoItems")) ;
    console.log (`To do items from local storage: ${todos} `);

    renderList(todos);
  }
  else console.log('local storage empty');


  // function for toggling list items check boxes on click
  const toggleCheckBox = (checkbox) => {
     checkbox.checked = !checkbox.checked;
  }


  // Adds event listener to the submit button
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();  //prevents the page from refreshing on submit
    if (inputText.value !== ""){
      // addToDo(inputText.value.trim());
      todos.push(inputText.value.trim());
      localStorage.setItem("todoItems", JSON.stringify(todos));
      inputText.value = "";
      entryList.innerHTML = "";
      renderList(todos);
    }
    else {
      window.alert("Cannot submit empty form!")
    }
  });

  function renderList (todos) {
    todos.forEach( (item) => {
      addToDo(item);
    });
  }
  
  function addToDo(item)
  {  
        // Create the needed html elements
        const li = document.createElement("li");
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        const textValueNode = document.createTextNode(item);
        const closeButton = document.createElement('button');
  
        //sets attributes for the checkbox
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'form-check-input me-2');
        checkbox.setAttribute('value', '');
        checkbox.setAttribute('aria-label', 'an entry in the list');
  
        //set attributes for label
        label.setAttribute('class', 'form-check-label flex-grow-1 todoItem');
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

   //Ensures that each list item checkbox can be toggled by clicking on any of the elements within it (except the close button) 
   entryList.addEventListener('click', (event) => {
      const target = event.target;
      if (target.tagName === 'INPUT') {
        // input was clicked, toggle the strikethrough on label and toggle checkbox
        const label = target.nextElementSibling;
        label.classList.toggle('text-decoration-line-through');
        
      } 
      else if (target.tagName === 'LABEL') {
        // Label was clicked, trigger click event on associated checkbox
        const checkbox = target.previousElementSibling;
        checkbox.click(); 
      }
      else if (target.tagName === 'LI') {
        // Checkbox was clicked, toggle the strikethrough on label
        const checkbox = target.querySelector('input[type="checkbox"]');
        checkbox.click();
      }
      else if (target.classList.contains('btn-close')) {
        // Close button was clicked, remove list item
        const listItem = target.closest('li');
        console.log (`list item text is: ${listItem.childNodes[1].innerText} with type of: ${typeof listItem.childNodes[1].innerText}`)
        listItem.remove();

        // console.log(`todo at index 0 type of is: ${typeof todos[0]} with value: ${todos[0]}`) //string
        
        console.log(`todos index of removed item is is: ${todos.indexOf(listItem.childNodes[1].innerText)}`)
        todos.splice(todos.indexOf(listItem.childNodes[1].innerText), 1)
        localStorage.setItem("todoItems", JSON.stringify(todos))

        console.log(`Item removed, storage todoItems is now: ${JSON.parse(localStorage.getItem("todoItems"))} `);
        console.log(`todos is now: ${todos}`)
        entryList.innerHTML = "";
        renderList(todos);
        
      }
  });


});
  
