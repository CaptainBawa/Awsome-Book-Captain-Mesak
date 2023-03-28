/* Creating a variable that is equal to the element with the id of book-form and book-list. */
const booksForm = document.getElementById('book-form');
const booksList = document.getElementById('book-list');

/* Creating an empty array. */
let myBooks = [];

/*
 The Book function is a constructor function that creates objects with two properties, title and
 author.
 title - The title of the book.
 author - The author of the book.
 */
function Book(title, author) {
  this.title = title;
  this.author = author;
}

/*
 It loops through the array of books, creates an HTML element for each one, and adds a
 remove button to each element
 */
function displayBook() {
  // Clearing the existing list.
  booksList.innerHTML = '';

  /* Looping through the array of books, creating an HTML element for each one, and adding a remove
button to each element. */
  myBooks.forEach((book, index) => {
  /* Creating a list item and adding the book's title and author to it. */
    const li = document.createElement('li');
    /* Checking to see if the book has a displayInfo method. If it does, it calls the method.
    If it doesn't, it displays the title and author. */
    if (typeof book.displayInfo === 'function') {
      li.textContent = book;
    } else {
      li.textContent = `${book.title} by ${book.author}`;
    }
    li.style.listStyle = 'none';

    // Add a remove button for each book
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
    /* Removing the book from the array and re-displaying the list. */
      myBooks.splice(index, 1);
      displayBook();
    });
    /* Adding the remove button to the list item. */
    li.appendChild(removeButton);

    // Add the book element to the list
    booksList.appendChild(li);
  });
}

// Save the books array to local storage as a string.
function saveBookToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(myBooks));
}

/*
 We create a new book object, add it to the myBooks array, save the array to local storage,
 and then display the book
 title - The title of the book
 author - The author of the book.
 */
function addBook(title, author) {
  const book = new Book(title, author);
  myBooks.push(book);
  saveBookToLocalStorage();
  displayBook();
}

/*
 If there are books in local storage, parse them and store them in the myBooks array.
 If there are no books in local storage, display a message to the user
 */
function getBooksFromLocalStorage() {
  const books = localStorage.getItem('books');
  if (books) {
    myBooks = JSON.parse(books);
  } else {
    myBooks.innerHTML = 'No books found';
  }
}
// Call the function to retrieve the list of books from local storage
getBooksFromLocalStorage();
// Call the displayBook function here to display the list of books on the page.
displayBook();

/* Adding an event listener to the form that listens for a submit event.
When the event is triggered, it prevents the form from submitting and reloading the page.
It then retrieves the title and author input values and adds the book to the list and clears
the input fields.
*/
booksForm.addEventListener('submit', (e) => {
  // Prevent the form from submitting and reloading the page
  e.preventDefault();

  // Retrieve the title and author input values
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  // Add the book to the list and clear the input fields
  addBook(titleInput.value, authorInput.value);
  titleInput.value = '';
  authorInput.value = '';
});
