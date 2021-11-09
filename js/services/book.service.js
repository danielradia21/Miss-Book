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
  getNextBookId
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

function getNextBookId(bookId){
  return query()
      .then(books =>{
        const idx = books.findIndex((book) => book.id === bookId);
        return (idx === books.length - 1) ? books[0].id : books[idx + 1].id;
      
      })

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
