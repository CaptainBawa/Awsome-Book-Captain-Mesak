// A Book is a thing that has a title and an author.
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// It creates a form that allows you to add books to a list, and it saves the list to local storage
class BooksList {
  /* The constructor function is called when the class is instantiated. It sets the initial state of
  the class and calls other functions to set up the class */
  constructor() {
    // Setting the initial state of the class.
    this.myBooks = [];
    // Setting the initial state of the class.
    this.bookForm = document.querySelector('#book-form');
    this.bookList = document.querySelector('#book-list');
    this.errorMessage = document.querySelector('#error');
    // Calling the functions getBooksFromLocalStorage, displayBooks, and bookFormEvent.
    this.getBooksFromLocalStorage();
    this.displayBooks();
    this.bookFormEvent();
  }

  /* We loop through the array of books, create a list item for each book, and append the
  list item to the book list */
  displayBooks() {
    // Setting the innerHTML of the bookList to an empty string.
    this.bookList.innerHTML = '';
    /* Looping through the array of books, creating a list item for each book, and appending the
    list item to the book list. */
    this.myBooks.forEach((book, index) => {
      const li = document.createElement('li');
      /* Checking to see if the book has a displayInfo method. If it does, it will call the
      displayInfo method. If it doesn't, it will display the title and author. */
      if (typeof book.displayInfo === 'function') {
        li.textContent = book;
      } else {
        li.textContent = `"${book.title}" by ${book.author}`;
      }
      li.style.listStyle = 'none';
      // Setting the background color of the list item to either #f2f2f2 or #fff.
      li.style.backgroundColor = index % 2 === 0 ? '#f2f2f2' : '#fff';
      li.style.padding = '1%';
      li.style.margin = '10px 0';

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.className = 'remove-btn';
      /* Adding an event listener to the remove button. When the button is clicked, it will call the
      removeBook method and pass in the index of the book. */
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });
      /* Appending the remove button to the list item and then appending the list item to the book
      list. */
      li.appendChild(removeButton);
      this.bookList.appendChild(li);
    });
  }

  /* If the title and author are not empty strings, create a new Book object, add it to the myBooks
   array, save the array to local storage, display the books, and hide the error message
   The title of the book. The author of the book. */
  addBook(title, author) {
    // Checking to see if the title and author are not empty strings.
    if (title.trim() !== '' && author.trim() !== '') {
      // Creating a new Book object and assigning it to the variable book.
      const book = new Book(title, author);
      // Adding the book to the myBooks array.
      this.myBooks = this.myBooks.concat(book);
      // Saving the books to local storage and then displaying the books.
      this.saveBooksToLocalStorage();
      this.displayBooks();
      /* Checking to see if the error message exists. If it does, it will hide it. If it doesn't,
      it will display the error message. */
      if (this.errorMessage) {
        this.errorMessage.style.display = 'none';
      }
    } else {
      this.displayErrorMessage('Please enter a title and author for the book.');
    }
  }

  /* The function removes a book from the array of books, saves the array to local storage, and then
   displays the books, the index of the book to be removed */
  removeBook(index) {
    // Filtering the array of books and returning a new array with the book at the index removed.
    this.myBooks = this.myBooks.filter((book, i) => i !== index);
    this.saveBooksToLocalStorage();
    this.displayBooks();
  }

  /* We add an event listener to the form, and when the form is submitted, we prevent the default
  action, grab the values from the title and author inputs, and then pass those values to the
  addBook function */
  bookFormEvent() {
    this.bookForm.addEventListener('submit', (e) => {
      // It prevents the default action of the event from happening.
      e.preventDefault();
      const titleInput = document.querySelector('#title');
      const authorInput = document.querySelector('#author');
      // Calling the addBook method and passing in the values of the title and author inputs.
      this.addBook(titleInput.value, authorInput.value);
      titleInput.value = '';
      authorInput.value = '';
    });
  }

  // We're taking the array of books, converting it to a string, and saving it to local storage
  saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.myBooks));
  }

  // If there are books in local storage, parse them and set them to the myBooks array
  getBooksFromLocalStorage() {
    const books = localStorage.getItem('books');
    if (books) {
      this.myBooks = JSON.parse(books);
    }
  }

  /* If the errorMessage property is not null, set the textContent property of the errorMessage
   property to the message parameter and set the style.display property of the errorMessage property
   to 'block'. */
  displayErrorMessage(message) {
    if (this.errorMessage) {
      this.errorMessage.textContent = message;
      this.errorMessage.style.display = 'block';
    }
  }
}

// Creating a new instance of the BooksList class.
const newBooksList = new BooksList();
