import { bookService } from "../services/book.service.js";

export default {
  props: ["book"],
  template: `
    <div>
      <form @submit.prevent="save" class="review-form">
        <h2>Leave A Review</h2>
        <label for="reader">
          <span>Books Reader : </span>
          <input v-model="review.reader" type="text" id="reader" placeholder="Full Name" required>
        </label>          
        <label for="rate">
          <span>Your Rate ? </span>
          <select v-model.number="review.rate" id="rate" required>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </label>   
        <label for="when">
          <span>When did you read that book?</span>
          <input v-model="review.date" type="date" id="read-at" required>
        </label>
        <label>
          <p>What do you think about the book?</p>
          <textarea v-model="review.msg" name="message"  rows="5" cols="30"  required></textarea>       
        </label>
        <div>
          <button type="submit" >Send !</button>
        </div>
      </form>

      <div>-- Reviews --</div>
      <div class="reviews" v-for="reviewInBook in book.reviews">
        <button @click="remove" >X</button>
              <p>Name: {{reviewInBook.reader}}</p>
              <p>Rate : {{reviewInBook.rate}}/5</p>
              <p>Read At : {{reviewInBook.date}}</p>
              <p class="text-area-content">Review : {{reviewInBook.msg}}</p>
      </div>
  </div>
      `,

  data() {
    return {
      review: {
        id: null,
        reader: null,
        rate: 0,
        date: null,
        msg: null,
      },
    };
  },
  created() {
    this.review = {
      id: null,
      reader: null,
      rate: 0,
      date: null,
      msg: null,
    };
  },
  methods: {
    remove() {
      bookService.removeReview(this.book, this.review.id);
    },
    save() {
      bookService.saveReview(this.review, this.book).then((book) => {
        this.$emit("reviewAdded", book);
        this.review = {
          id: null,
          reader: null,
          rate: 0,
          date: null,
          msg: null,
        };
      });
    },
  },
};
