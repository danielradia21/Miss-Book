import { bookService } from "../services/book.service.js";

export default {
  template: `
    <section class="modal">
        <button @click="closeModal" class="close-modal-btn">X</button>
            <label for="search">
                <p>Search Online</p>
                <input v-model.lazy="title" id="search" type="text">
            </label>
                <ul class="new-books-list" v-for="book in newBooks">
                    <li>{{book.title}}</li>
                    <button @click="addBookToDb(book)">+</button>
                </ul>
               
    </section>
    `,
  data() {
    return {
      title: null,
      newBooks: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    addBookToDb(book) {
      bookService.saveToOurDb(book).then(()=>{
        this.$emit("added")
      });
    },
    getPrice() {
      let amount = Math.floor(Math.random() * 300) + 1;
      let currencyCode = amount < 100 ? "EUR" : amount < 200 ? "USD" : "ILS";
      let isOnSale = this.randomSale();
      return {
        amount,
        currencyCode,
        isOnSale,
      };
    },
    randomSale() {
      if (Math.random() < 0.5) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    title(newVal) {
      if (!newVal) {
        return (this.newBooks = []);
      }
      bookService.ask(newVal).then((books) => {
        this.newBooks = [];
        books.forEach((book) => {
          let id = book.id;
          let title = book.volumeInfo.title || "Unknown";
          let subtitle = book.volumeInfo.subtitle || "Unknown";
          let authors = book.volumeInfo.authors || ["D.Radia"];
          let publishedDate = book.volumeInfo.publishedDate;
          let description = book.volumeInfo.description || "Unknown";
          let pageCount = book.volumeInfo.pageCount || "Too Much";
          let categories = book.volumeInfo.categories || ["Bullshit"];
          let thumbnail = book.volumeInfo.imageLinks.thumbnail || "No Picture";
          let language = book.volumeInfo.language;
          let listPrice = this.getPrice();
          this.newBooks.push({
            id,
            title,
            subtitle,
            authors,
            publishedDate,
            description,
            pageCount,
            categories,
            thumbnail,
            language,
            listPrice,
          });
        });
      });
    },
  },
};
