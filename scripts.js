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

addBookToLibrary("Pride and Prejudice", "Jane Austen", 1813);
addBookToLibrary("Sense and Sensibility", "Jane Austen", 1811);

myLibrary.forEach((book) => {
    console.log(book.name);
})