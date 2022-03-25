const libraryFeed = document.getElementById("library-feed");
const booksGrid = document.querySelector(".books-grid");
const addButton = document.getElementById("add-btn");
const addModal = document.getElementById("add-modal");
const closeModal = document.querySelector(".close-modal");
const saveBook = document.querySelector(".save-btn");


// Books will be stored here
let myLibrary;

const DEFAULT_LIBRARY = [
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

const book = (title, author, pages, isRead) => {
    return {title, author, pages, isRead}
}

/* Library Module */
const library = (() => {
    const addBook = () => {
        const bookTitle = document.getElementById("title-entry").value;
        const bookAuthor = document.getElementById("author-entry").value;
        const bookPages = document.getElementById("page-entry").value;
        const isRead = document.getElementById("read").checked;

        const newBook = book(bookTitle, bookAuthor, bookPages, isRead);
        myLibrary.push(newBook);
        storage.setItems();
    }
    const displayBooks = () => {
        // Checks if localStorage has data if not defaults to DEFAULT_LIBRARY
        storage.reload();
        booksGrid.innerHTML = '';
        myLibrary.forEach((book) => {
            // BOOK CARD
            let bookCard = document.createElement("div");
            bookCard.classList.add("card");
            bookCard.setAttribute("id", myLibrary.indexOf(book));
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
            deleteButton.addEventListener("click", () => {
                let id = deleteButton.parentNode.parentNode.id
                deleteBook(id);
                window.location.reload();
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
            cardRead.addEventListener("click", (e) => {
                e.preventDefault();
                let id = cardRead.parentNode.parentNode.id
                changeReadStatus(id, e.target);
            });
        });
    };
    const deleteBook = (id) => {
        myLibrary.splice(id, 1);
        storage.setItems();
        library.displayBooks();
    };
    const changeReadStatus = (id, button) => {
        let bookToChange = myLibrary[id];

        if(bookToChange.isRead === true) {
            bookToChange.isRead = false;
            storage.setItems();
            button.classList.remove("read");
            button.classList.add("not");
            button.textContent = "Not Read";
        } else if(bookToChange.isRead === false) {
            bookToChange.isRead = true;
            storage.setItems();
            button.classList.remove("not");
            button.classList.add("read");
            button.textContent = "Read";
        }
    }
    return {
        addBook,
        displayBooks,
        deleteBook,
        changeReadStatus
    };
})();

/* Storage Module */
const storage = (() => {
    const setItems = () => {
        // Updates localStorage data
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    };
    const reload = () => {
        if(localStorage.getItem("myLibrary")) {
            // Retrives Data from localStorage
            myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        } else {
            myLibrary = DEFAULT_LIBRARY;
        }
    };
    return {
        setItems,
        reload
    }
})();

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    addModal.classList.toggle("active");
});

closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    addModal.classList.toggle("active");
});

saveBook.addEventListener("click", () => {
    library.addBook();
    addModal.classList.toggle("active");
    library.displayBooks(myLibrary);
    window.location.reload();
});

library.displayBooks();