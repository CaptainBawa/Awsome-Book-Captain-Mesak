// Book Class: Represents a Book

// UI Class: Handle UI Tasks
class AddBook {
  constructor(title, author, bookId) {
    this.title = title;
    this.author = author;
    this.bookId = bookId;
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(title, author, id) {
    let idExist = false;
    const books = AddBook.getBooks();
    books.forEach((item) => {
      if (item.bookID === id) {
        idExist = true;
        const getError = document.getElementById('error');
        getError.textContent = 'Opps try agaian';
      }
    });

    if (idExist === false) {
      const book = new AddBook(title, author, id);
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.location.reload();
    }
  }
}

// It removes a book from the local storage
class RemoveBook {
  static removeBook(id) {
    const bookID = parseInt(id, 10);
    const books = AddBook.getBooks();
    /* Filtering the books array and returning a new array with the book that has
    the same bookID as the one passed in. */
    const filteredBooks = books.filter((book) => book.bookId !== bookID);
    localStorage.setItem('books', JSON.stringify(filteredBooks));
    document.location.reload();
  }
}

// Display books
function displayBooks() {
  const books = AddBook.getBooks();
  books.forEach((book) => {
    const list = document.querySelector('#book-list');
    const li = document.createElement('li');
    li.className = 'book-lists';
    li.innerHTML = `"${book.title}" by ${book.author}`;
    const gap = document.createElement('span');
    gap.className = 'uniqueId';
    gap.innerHTML = `${book.bookId}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';
    li.prepend(gap);
    li.appendChild(removeButton);
    list.prepend(li);
  });
}

document.addEventListener('DOMContentLoaded', displayBooks());

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Validate
  if (title === '' || author === '') {
    const list = document.querySelector('#book-list');
    const getError = document.getElementById('error');
    getError.textContent = 'Please fill out all fields';
  } else {
    // Add Book to UI
    const randomId = Math.random() * 1000;
    const id = Math.floor(randomId);
    AddBook.addBook(title, author, id);
    const getError = document.getElementById('error');
    getError.textContent = '';
  }
});

// Event: Remove a Book

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const removeBooks = document.querySelectorAll('.remove-btn');
    removeBooks.forEach((item) => item.addEventListener('click', (e) => {
      RemoveBook.removeBook(e.target.parentElement.firstChild.innerHTML);
    }));
  },
);

/* Changing the background color of the book list. */
const bookLists = document.querySelectorAll('.book-lists');
bookLists.forEach((bookList, index) => {
  if (index % 2 === 0) {
    bookList.style.background = '#F2F2F2';
  }
});
