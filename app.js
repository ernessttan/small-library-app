const libraryFeed = document.getElementById("library-feed");
const booksGrid = document.querySelector(".books-grid");
const addButton = document.getElementById("add-btn");
const addModal = document.getElementById("add-modal");
const closeModal = document.querySelector(".close-modal");
const saveBook = document.querySelector(".save-btn");


// Books will be stored here
let myLibrary = localStorage.getItem('library')

if (localStorage.getItem('library')) {
    myLibrary = JSON.parse(localStorage.getItem('library'))
} else {
    myLibrary = []
}

localStorage.setItem('library', JSON.stringify(myLibrary))
const bookData = JSON.parse(localStorage.getItem('library'));

const book = (id, title, author, pages, isRead) => {
    return {id, title, author, pages, isRead}
}

const library = (() => {
    const addBook = () => {
        let currentId = 3;
        currentId++;
        const bookTitle = document.getElementById("title-entry").value;
        const bookAuthor = document.getElementById("author-entry").value;
        const bookPages = document.getElementById("page-entry").value;
        const isRead = document.getElementById("read").checked;

        const newBook = book(currentId, bookTitle, bookAuthor, bookPages, isRead);
        myLibrary.push(newBook);
        localStorage.setItem('library', JSON.stringify(myLibrary))
    }
    const displayBooks = () => {
        booksGrid.innerHTML = '';
        bookData.forEach((book) => {
            // BOOK CARD
            let bookCard = document.createElement("div");
            bookCard.classList.add("card");
            bookCard.setAttribute("id", book.id)
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
        localStorage.setItem('library', JSON.stringify(myLibrary))
        library.displayBooks();
    }
    return {
        addBook,
        displayBooks,
        deleteBook
    };
})();

// Function to change read status
const changeReadStatus = (id, button) => {
    let bookToChange = myLibrary[id];

    if(bookToChange.isRead === true) {
        bookToChange.isRead = false;
        localStorage.setItem('library', JSON.stringify(myLibrary))
        button.classList.remove("read");
        button.classList.add("not");
        button.textContent = "Not Read";
    } else if(bookToChange.isRead === false) {
        bookToChange.isRead = true;
        localStorage.setItem('library', JSON.stringify(myLibrary))
        button.classList.remove("not");
        button.classList.add("read");
        button.textContent = "Read";
    }
}

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