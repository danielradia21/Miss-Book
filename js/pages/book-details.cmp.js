import { bookService } from "../services/book.service.js";
import bookDescription from "../cmps/book-description.cmp.js";
import addReview from "../cmps/add-review.cmp.js";

export default {
  components: {
    bookDescription,
    addReview,
  },
  template: `
      <div v-if="book" class="book-details">
        <div class="book-details-btns">
          <button class="back-btn">  <router-link to="/books">Go Back</router-link></button>
        
      </div>
      <div class="next-prev-btns">
        <button class="previous-btn"> <router-link :to="'/books/'+bookPrevId">Prev Book</router-link></button>
            <button class="next-btn">  <router-link :to="'/books/'+bookNextId">Next Book</router-link></button>
         </div>
          <h1>{{book.title}}</h1>
          <h2>{{book.subtitle}}</h2>
          <div class="details-img-container">
            <img :src="book.thumbnail">
          </div>
          <div><span :class="colorClass">Price: {{book.listPrice.amount}}  {{renderCurrency}}</span></div>
          <h4>{{renderSale}}</h4>
          <book-description :desc="book.description"></book-description>
          <div class="book-info">
            <div><strong>Authors : </strong> {{renderAuthors}}</div>
            <div> <strong>Categories : </strong> {{renderCategories}}</div>
            <div><strong>Language : </strong>{{book.language}}</div>
            <div><strong>Pages : </strong>{{book.pageCount}} {{renderCountPage}}</div>
            <div><strong>Published Date :</strong>{{book.publishedDate}} {{renderPublishDate}}</div>
          </div>
          <add-review @reviewAdded="reviewAdded" :book="book"></add-review>
      </div>
      `,
  data() {
    return {
      book: null,
      bookNextAndPrevIds: {
        bookNextId: null,
        bookPrevId: null,
      },
    };
  },
  created() {},
  watch: {
    "$route.params.bookId": {
      handler() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId).then((book) => (this.book = book));
        bookService.getNextBookId(bookId).then((booksIdx) => {
          this.bookNextId = booksIdx.next;
          this.bookPrevId = booksIdx.prev;
        });
        console.log(this.bookNextId);
      },
      immediate: true,
    },
  },
  methods: {
    reviewAdded(book) {
      this.book = book;
    },
  },
  computed: {
    renderCurrency() {
      switch (this.book.listPrice.currencyCode) {
        case "EUR":
          return "???";
        case "ILS":
          return "???";
        case "USD":
          return "$";
      }
    },
    renderCategories() {
      return [...this.book.categories].toString().split(",").join(", ");
    },
    renderAuthors() {
      return [...this.book.authors].toString().split(",").join(", ");
    },
    renderCountPage() {
      if (this.book.pageCount > 500) {
        return "Long Readeing";
      } else if (this.book.pageCount > 200) {
        return "Decent Readeing";
      } else {
        return "Light Reading";
      }
    },
    renderPublishDate() {
      if (new Date().getFullYear() - this.book.publishedDate > 10) {
        return "Veteran Book";
      } else if (new Date().getFullYear() - this.book.publishedDate < 1) {
        return "New !";
      }
    },
    colorClass() {
      if (this.book.listPrice.amount > 150) {
        return "red";
      } else if (this.book.listPrice.amount < 20) {
        return "green";
      }
    },
    renderSale() {
      if (this.book.listPrice.isOnSale) {
        return "On Sale !";
      }
    },
  },
};
