import bookPreviewCmp from "./book-preview.cmp.js";

export default {
  props: ["books"],
  components: {
    bookPreviewCmp,
  },
  template: `
    <div class="book-container">
      <div v-for="book in books">
      <router-link :to="'/books/'+book.id">
        <book-preview-cmp :book="book" @click.native="select(book)"> </book-preview-cmp>
      </router-link>
    </div>
</div>
`,
  methods: {
    select(book) {
      this.$emit("selected", book);
    },
  },
  created() {},
};
