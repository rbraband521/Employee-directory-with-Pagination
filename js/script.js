/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


//Global variables - stores student list item elements
const listItem = document.querySelector(".student-list").children;
let page = document.querySelector('.page');
const searchResults = [];
//variable to store number of names to show per page//
const perPage = 10;

//function to show/hide the correct amount of students on each page
const showPage = (list, page) => {
   //dynamically determines the start and finish index of the list items to be displayed
   const startIndex = (page * perPage) - perPage;
   const endIndex = page * perPage; 
//this loops through the list parameter and either displays or hides based on it's index
   for (let i = 0; i < list.length; i ++ ) {
     if (i >= startIndex && i < endIndex) {
      list[i].style.display = '';
   } else  {
      list[i].style.display = 'none';
      }
   }
}


//function to create and append pagination links 
const appendPageLinks = (list) => {
   let numOfPages = Math.ceil(list.length / perPage); //how to find total number of pages with rounding up
   //Creates a new div with classname and appends it to the element with the page classname
   let paginationDiv = document.createElement('div')
   paginationDiv.className = "pagination";
   page.appendChild(paginationDiv);
   let ul = document.createElement('UL');
//loop that creates the correct number of LI elements based on total number of students.
   for (i = 1; i <= numOfPages; i ++ ) {
      let li = document.createElement('LI');
      let paginationLinks = document.createElement('A');
      //This assigns a text content and an href attribute
      paginationLinks.textContent = i;
      paginationLinks.href = '#';
      li.appendChild(paginationLinks);
      ul.appendChild(li);
      paginationDiv.appendChild(ul);
      if (paginationLinks.textContent == 1) {
         paginationLinks.className = 'active';
      }
   }
   //this loops through each A element and adds an event listener. The 'active' class name is assigned when the link is clicked
   let buttons = paginationDiv.querySelectorAll('a'); //querySelectorAll to return all of the elements not just the first one!//
      for ( let i = 0; i < numOfPages; i ++ ) {
         let pageLinks = buttons[i];
         pageLinks.addEventListener ('click', (event) => {
            for ( let i = 0; i < numOfPages; i ++ ) {
               buttons[i].className = '';
            }
            event.target.className = 'active';
            showPage(list, pageLinks.textContent);
         }
      );
   } 
}

function search() {
   const searchDiv = document.querySelector('.page-header');
   const noResultDiv = document.createElement('div'); //creates a new div when there are no results
   noResultDiv.className = '.no-results'; //creates class name 'no-results
   page.appendChild(noResultDiv);
   const input = document.createElement('input');
   const searchButton = document.createElement('button');
   input.placeholder = "Search for students here";
   searchButton.textContent = "Search";
   searchDiv.appendChild(input);
   searchDiv.appendChild(searchButton);

   //TODO return button after a search is made
   //CLEAR input after esarch TODO
   // const homeButton = document.createElement('button');
   // homeButton.textContent = "Return";
   // noResultDiv.appendChild(homeButton);

   //Event handler for search
   searchButton.addEventListener('click', (e) => {
      const searchLowerCase = input.value.toLowerCase(); 
      searchResults.length = 0; //This sets the inital search results length to zero so we can loop through them all later

      for (let i = 0; i < listItem.length; i += 1) {
         if (listItem[i].innerHTML.indexOf(searchLowerCase) > -1) {
            listItem[i].style.display = '';
         } else {
            listItem[i].style.display = 'none';
            searchResults.push(i);
         }
      }
      if (searchResults.length === listItem.length) {
         noResultDiv.innerHTML = '<h1> No Results... </h1>'
      } else {
         noResultDiv.innerHTML = '';
      }
   })
}

//Calling the functions passing in the global variable for the list items
showPage(listItem, 1);
appendPageLinks(listItem);
search();

/***
Pseudo Code 
  
   each LI has an A element (# and page number(loop index!))
      A - LI
      LI - UL
      UL - DIV

 I had to write out the logic for the last part of this. It definitely got confusing
 * 
 loop through each A element (paginationLinks) and assign to variable
(you'll have declare a pageLinks variable)
 Add click event listener to each
 loop through page links and set class = '';
 Add active class to clicked link WITH event.target

 call showPage function
  global variable and page number (use textContent of A element)

***/
