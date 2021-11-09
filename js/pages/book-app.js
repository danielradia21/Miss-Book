import { bookService } from "../services/book.service.js";
import bookList from "../cmps/book-list.cmp.js";
import bookDetails from "./book-details.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import bookAdd from "../cmps/book-add.cmp.js";

export default {
  props: [],
  components: {
    bookService,
    bookList,
    bookDetails,
    bookFilter,
    bookAdd,
  },
  template: `
  <div>
    <div class="filters">
      <book-filter v-if="!selectedBook" @filtered="setFilter"/>
      <button class="search-online-btn" @click="openModal">Search Online</button>
</div>
    <book-details></book-details>
    <book-list  v-if="!selectedBook" :books="booksToShow" @selected="selectBook"></book-list>
    <book-details :book="selectedBook" ></book-details>  
    <book-add v-show="toggleModal" class="modal" @close="closeModal" @added="renderBooks"></book-add>
</div>
    `,
  data() {
    return {
      toggleModal: false,

      books: null,
      filterBy: null,
      selectedBook: null,
    };
  },
  created() {
    this.renderBooks()
  },
  destroyed() {},
  methods: {
    selectBook(book) {
      this.selectedBook = book;
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    openModal() {
      this.toggleModal = true;
    },
    closeModal() {
      this.toggleModal = false;
    },
    renderBooks(){
      bookService.query().then((books) => {
        this.books = books;
      });
    }
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
