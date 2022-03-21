// function Book (title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read
//     this.info = function() {
//         return `${title} by ${author}, ${pages} pages, ${read}`;
//     }
// }

// const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'not read yet');
// console.log(theHobbit.info());

const libraryFeed = document.getElementById("library-feed");
const booksGrid = document.querySelector(".books-grid");
const addButton = document.getElementById("add-btn");
const addModal = document.getElementById("add-modal");
const closeModal = document.querySelector(".close-modal");


// Books will be stored here
let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R Tolkien",
        pages: 295,
        read: false
    },
    {
        title: "Star Wars",
        author: "George Lucas",
        pages: 295,
        read: true
    },
    {
        title: "Charlie and The Chocolate Factory",
        author: "Roald Dahl",
        pages: 420,
        read: true
    }
]

// Book Constructor
function Book() {

}

// Function to add book to library
function addBookToLibrary() {
}

// Function to display all books
function displayBooks(library) {
 
    for(let i = 0; i < library.length; i++) {
        let book = library[i];


        // BOOK CARD
        let bookCard = document.createElement("div");
        bookCard.classList.add("card");
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
    }
}

addButton.addEventListener("click", function(e) {
    e.preventDefault();
    addModal.classList.toggle("active");
});

closeModal.addEventListener("click", function(e) {
    e.preventDefault();
    addModal.classList.toggle("active");
});

displayBooks(myLibrary);