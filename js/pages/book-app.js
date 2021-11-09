import { bookService } from "../services/book.service.js";
import bookList from "../cmps/book-list.cmp.js";
import bookDetails from "./book-details.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";

export default {
  props: [],
  components: {
    bookService,
    bookList,
    bookDetails,
    bookFilter,
  },
  template: `
  <div>
     <book-filter v-if="!selectedBook" @filtered="setFilter"/>
    <book-details></book-details>
    <book-list  v-if="!selectedBook" :books="booksToShow" @selected="selectBook"></book-list>
    <book-details :book="selectedBook" ></book-details>  
</div>
    `,
  data() {
    return {
      books: null,
      filterBy: null,
      selectedBook: null,
    };
  },
  created() {
    bookService.query()
    .then(books=>{
      this.books = books
    })
     
  },
  destroyed() {},
  methods: {
    selectBook(book) {
      this.selectedBook = book;
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
   
  },

  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books;
      const fromPrice = this.filterBy.fromPrice;
      const toPrice = this.filterBy.toPrice;
      const name = this.filterBy.byName.toLowerCase();
      let booksToShow = this.books.filter((book) => {
        return (
          book.title.toLowerCase().includes(name) &&
          book.listPrice.amount >= fromPrice &&
          book.listPrice.amount <= toPrice
        );
      });
      return booksToShow;
    },
  },
};
