import { books } from "../../data/books.js";
import { storageService } from "./async-storage-service.js";
// import storage service

const BOOK_KEYS = "books";

export const bookService = {
  query,
  getById,
  save,
  saveReview,
  remove,
  removeReview,
  getNextBookId,
  ask,
  saveToOurDb,
  // getPrevBookId
};
function query() {
  return storageService.query(BOOK_KEYS);
}

function getById(bookId) {
  return storageService.get(BOOK_KEYS, bookId);
}

function save(book) {
  if (book.id) return storageService.put(BOOK_KEYS, book);
  else return storageService.post(BOOK_KEYS, book);
}

function saveReview(review, book) {
  review.id = _makeId();
  if (!book.reviews) {
    book["reviews"] = [];
  }
  book.reviews.push(review);
  return storageService.put(BOOK_KEYS, book);
}

function getNextBookId(bookId) {
  return query().then((books) => {
    const idx = books.findIndex((book) => book.id === bookId);
    if (idx === books.length - 1)
      return { next: books[0].id, prev: books[idx - 1].id };
    else if (idx === 0)
      return { next: books[idx + 1].id, prev: books[books.length - 1].id };
    return { next: books[idx + 1].id, prev: books[idx - 1].id };
  });
}

function _makeId(length = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function remove(bookId) {
  return storageService.remove(BOOK_KEYS, bookId);
}

function removeReview(book, reviewId) {
  const idx = book.reviews.findIndex((review) => review.id === reviewId);
  book.reviews.splice(idx, 1);
  storageService.put(BOOK_KEYS, book);
}

function ask(str) {
  let data = storageService.load(str);
  if (data) return data;
  return axios
    .get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${str}`)
    .then((books) => {
      console.log("Axios books:", books.data.items);
      storageService._save(str, books.data.items);
      return books.data.items;
    });
}

function saveToOurDb(newBook) {
  return query().then((books) => {
    let haveIt = books.some((book) => {
      return book.id === newBook.id;
    });
    if (!haveIt) {
      storageService.post("books", newBook);
    }
  });
}
