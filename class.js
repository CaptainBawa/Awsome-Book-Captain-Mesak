// A Book class that has a title and an author.
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// It creates a form that allows you to add books to a list
class BooksList {
/*
 We're creating a constructor function that will run when we
 create a new instance of the Book class
 */
  constructor() {
    this.myBooks = [];
    this.bookForm = document.querySelector('#book-form');
    this.bookList = document.querySelector('#book-list');
    this.getBooksFromLocalStorage();
    this.displayBooks();
    this.bookFormEvent();
  }

  // Creating a list of books and adding a remove button to each book.
  displayBooks() {
    this.bookList.innerHTML = '';

    this.myBooks.forEach((book, index) => {
      const li = document.createElement('li');
      /* It's checking if the book has a displayInfo method. If it does, it will display the book.
     If it doesn't, it will display the title and author. */
      if (typeof book.displayInfo === 'function') {
        li.textContent = book;
      } else {
        li.textContent = `${book.title} by ${book.author}`;
      }
      li.style.listStyle = 'none';
      /* It's setting the background color of the list item to either #f2f2f2 or #fff depending on
      whether the index is even or odd. */
      li.style.backgroundColor = index % 2 === 0 ? '#f2f2f2' : '#fff';

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      /* It's adding an event listener to the remove button. When the button is clicked,
        it will call the removeBook method and pass in the index of the book. */
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });

      /* It's adding the remove button to the list item and then adding the
      list item to the book list. */
      li.appendChild(removeButton);
      this.bookList.appendChild(li);
    });
  }

  /*
   If the title and author are not empty, create a new book object, add it to the array of books,
   save the books to local storage, and display the books
   The title of the book, the author of the book. */
  addBook(title, author) {
    if (title.trim() !== '' && author.trim() !== '') {
      const book = new Book(title, author);
      this.myBooks.push(book);
      this.saveBooksToLocalStorage();
      this.displayBooks();
    }
  }

  /*
   The removeBook() function removes a book from the myBooks array and then saves the array to local
   storage and displays the books, the index of the book to be removed */
  removeBook(index) {
    this.myBooks.splice(index, 1);
    this.saveBooksToLocalStorage();
    this.displayBooks();
  }

  /*
   We add an event listener to the form, and when the form is submitted, we prevent the default
   action, grab the values from the title and author inputs, and then pass those values to the
   addBook function */
  bookFormEvent() {
    this.bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = document.querySelector('#title');
      const authorInput = document.querySelector('#author');
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
}

// It's creating a new instance of the BooksList class.
const newBooksList = new BooksList();
