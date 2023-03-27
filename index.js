/* Creating a variable that is equal to the element with the id of book-form and book-list. */
const booksForm = document.getElementById('book-form');
const booksList = document.getElementById('book-list');

/* Creating an empty array. */
const myBooks = [];

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

/* This is a method that is being added to the Book prototype.
It is a function that returns a string
that is the title and author of the book.
*/
Book.prototype.displayInfo = () => `${this.title.value} by ${this.author.value} `;

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
    li.textContent = book.displayInfo();
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
