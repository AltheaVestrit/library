const booksContainer = document.querySelector("#books-container");
const dialog = document.querySelector("dialog");
const showDialog = document.querySelector("#add-new-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const submitBtn = document.querySelector("#submit-btn");
const nameField = document.querySelector("#new-title");
const authorField = document.querySelector("#new-author");
const yearField = document.querySelector("#new-year");

let myLibrary = [];

function Book(name, author, year, read) {
    if (!new.target) {
        throw Error("You need to use the 'new' keyword to create a new instance of Book")
    }
    this.name = name;
    this.author = author;
    this.year = year;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, year) {
    myLibrary.push(new Book(name, author, year, "NOT READ"));
}

addBookToLibrary("Emma", "Jane Austen", 1815);
addBookToLibrary("Northanger Abbey", "Jane Austen", 1818);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 1813);
addBookToLibrary("Sense and Sensibility", "Jane Austen", 1811);
addBookToLibrary("Mansfield Park", "Jane Austen", 1814);
addBookToLibrary("Persuasion", "Jane Austen", 1818);
addBookToLibrary("Lady Susan", "Jane Austen", 1871);

function renderBook(book) {
    const newBook = document.createElement("div");
    newBook.classList += "book";
    newBook.id = book.id;

    const readSpan = document.createElement("span");
    readSpan.innerText = book.read;
    readSpan.classList += "read-span";
    if (book.read === "READ") {
        readSpan.classList += " read";
    };

    const titleDiv = document.createElement("div");
    titleDiv.classList += "title";

    const titleText = document.createElement("h2");
    titleText.innerText = book.name;

    const detailsDiv = document.createElement("div");
    detailsDiv.classList += "details";

    const authorP = document.createElement("p");
    authorP.classList += "author";
    authorP.innerText = book.author;

    const yearP = document.createElement("p");
    yearP.classList += "year";
    yearP.innerText = book.year;

    const idP = document.createElement("p");
    idP.classList += "id";
    idP.innerText = book.id;

    const editDiv = document.createElement("div");
    editDiv.classList += "edit-div";

    const readBtn = document.createElement("button");
    if (book.read === "READ") {
        readBtn.innerText = "UNMARK AS READ";
    } else {
        readBtn.innerText = "MARK AS READ";
    };
    readBtn.classList += "read-btn book-btn";
    readBtn["data-id"] = book.id;
    readBtn.addEventListener("click", function () {
        const bookId = this["data-id"];
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);
        if (this.innerText === "MARK AS READ") {
            myLibrary[bookIndex].read = "READ";
        } else {
            myLibrary[bookIndex].read = "NOT READ";
        };
        loadLibrary();
    })

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "REMOVE"
    removeBtn["data-id"] = book.id;
    removeBtn.classList += "remove-btn book-btn";
    removeBtn.addEventListener("click", function () {
        const bookId = this["data-id"];
        myLibrary = myLibrary.filter(book => book.id != bookId);
        loadLibrary();
    });

    detailsDiv.appendChild(authorP);
    detailsDiv.appendChild(yearP);
    detailsDiv.appendChild(idP);

    titleDiv.appendChild(titleText);

    editDiv.appendChild(readBtn);
    editDiv.appendChild(removeBtn);

    newBook.appendChild(readSpan);
    newBook.appendChild(titleDiv);
    newBook.appendChild(detailsDiv);
    newBook.appendChild(editDiv);

    booksContainer.appendChild(newBook);
}

function resetLibrary() {
    while (booksContainer.hasChildNodes()) {
        booksContainer.removeChild(booksContainer.firstChild);
    }
}

function loadLibrary() {
    resetLibrary();
    myLibrary.forEach((book) => {
        renderBook(book);
    })
}

loadLibrary();

showDialog.addEventListener("click", () => {
    dialog.showModal();
})

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary(nameField.value, authorField.value, yearField.value);
    loadLibrary();
    dialog.close();
})