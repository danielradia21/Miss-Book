export default {
  props: ["book"],
  template: `
    <div class="book-card">
        <h3>{{book.title}}</h3>
        <div class="prev-img">
          <img :src="book.thumbnail">
        </div>
        <p>Price: {{book.listPrice.amount}} {{renderCurrency}}</p>
    </div>
      `,

  computed: {
    renderCurrency() {
      switch (this.book.listPrice.currencyCode) {
        case "EUR":
          return "€";
        case "ILS":
          return "₪";
        case "USD":
          return "$";
      }
    },
  },
};
