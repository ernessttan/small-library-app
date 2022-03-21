const libraryFeed = document.getElementById("library-feed");
const booksGrid = document.querySelector(".books-grid");
const addButton = document.getElementById("add-btn");
const addModal = document.getElementById("add-modal");
const closeModal = document.querySelector(".close-modal");
const saveBook = document.querySelector(".save-btn");


// Books will be stored here
let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R Tolkien",
        pages: 295,
        isRead: false
    },
    {
        title: "Star Wars",
        author: "George Lucas",
        pages: 295,
        isRead: true
    },
    {
        title: "Charlie and The Chocolate Factory",
        author: "Roald Dahl",
        pages: 420,
        isRead: true
    }
]

// Book Constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead
}

// Function to add book to library
function addBookToLibrary() {
    const bookTitle = document.getElementById("title-entry").value;
    const bookAuthor = document.getElementById("author-entry").value;
    const bookPages = document.getElementById("page-entry").value;
    const isRead = document.getElementById("read").checked;

    console.log(isRead);

    const newBook = new Book(bookTitle, bookAuthor, bookPages, isRead);
    myLibrary.push(newBook);

}

// Function to display all books
function displayBooks(library) {
    booksGrid.innerHTML = '';
    for(let i = 0; i < library.length; i++) {
        let book = library[i];
        // BOOK CARD
        let bookCard = document.createElement("div");
        bookCard.classList.add("card");
        bookCard.setAttribute("id", i)
        booksGrid.appendChild(bookCard);

        // CARD HEADER CONTAINER
        let cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        bookCard.appendChild(cardHeader);

        // DELETE BOOK
        let deleteButton = document.createElement("button")
        deleteButton.setAttribute("type", "text");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerHTML = "&times;";
        deleteButton.addEventListener("click", function(e) {
            e.preventDefault();
            let id = this.parentNode.parentNode.id
            deleteBook(id);
        });
        cardHeader.appendChild(deleteButton);

        // CARD BODY CONTAINER
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        bookCard.appendChild(cardBody);

        // BOOK TITLE
        let cardTitle = document.createElement("h3");
        cardTitle.classList.add("book-title");
        cardTitle.textContent = book.title;
        cardBody.appendChild(cardTitle);

        // BOOK AUTHOR
        let cardAuthor = document.createElement("h4");
        cardAuthor.classList.add("author");
        cardAuthor.textContent = book.author;
        cardBody.appendChild(cardAuthor);

        // CARD FOOTER CONTAINER
        let cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");
        bookCard.appendChild(cardFooter);

        // BOOK PAGES
        let cardPages = document.createElement("p");
        cardPages.classList.add("book-pages");
        cardPages.textContent = book.pages + " Pages";
        cardFooter.appendChild(cardPages);

        // READ
        let cardRead = document.createElement("button");
        cardRead.classList.add("read-btn");
        cardFooter.appendChild(cardRead);
        if(book.isRead === true) {
            cardRead.textContent = "Read"
            cardRead.classList.toggle("read");
        } else if (book.isRead === false) {
            cardRead.textContent = "Not Read";
            cardRead.classList.toggle("not");
        }

    }
}

// Function to delete a book
function deleteBook(id) {
    myLibrary.splice(id, 1);
    displayBooks(myLibrary);
}

addButton.addEventListener("click", function(e) {
    e.preventDefault();
    addModal.classList.toggle("active");
});

closeModal.addEventListener("click", function(e) {
    e.preventDefault();
    addModal.classList.toggle("active");
});

saveBook.addEventListener("click", function(e) {
    e.preventDefault();
    addBookToLibrary();
    addModal.classList.toggle("active");
    displayBooks(myLibrary);
});




displayBooks(myLibrary);