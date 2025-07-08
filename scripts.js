const booksContainer = document.querySelector("#books-container");
const newBookForm = document.querySelector("dialog");

const myLibrary = [];

function Book(name, author, year) {
    if (!new.target) {
        throw Error("You need to use the 'new' keyword to create a new instance of Book")
    }
    this.name = name;
    this.author = author;
    this.year = year;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, year) {
    myLibrary.push(new Book(name, author, year));
}

addBookToLibrary("Emma", "Jane Austen", 1815);
addBookToLibrary("Northanger Abbey", "Jane Austen", 1818);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 1813);
addBookToLibrary("Sense and Sensibility", "Jane Austen", 1811);
addBookToLibrary("Mansfield Park", "Jane Austen", 1814);
addBookToLibrary("Persuasion", "Jane Austen", 1818);
addBookToLibrary("Lady Susan", "Jane Austen", 1871);

myLibrary.forEach((book) => {
    const newBook = document.createElement("div");
    newBook.classList += "book";
    newBook.id = book.id;

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

    detailsDiv.appendChild(authorP);
    detailsDiv.appendChild(yearP);
    detailsDiv.appendChild(idP);

    titleDiv.appendChild(titleText);

    newBook.appendChild(titleDiv);
    newBook.appendChild(detailsDiv);

    booksContainer.appendChild(newBook);
})

newBookForm.showModal();