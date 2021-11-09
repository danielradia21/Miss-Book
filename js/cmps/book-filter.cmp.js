export default {
  template: `
        <div class="book-filter">
            <form class="search-form">
              <div class="search-bar">
                <label for="text" >Search :</label>
                <input id="text" @input="filter" v-model="filterBy.byName" type="text" placeholder="Search...">
          </div>
          <div class="price-bar">  
            <label for="from-price" >From Price : </label>
            <input id="from-price" @input="filter" v-model.number="filterBy.fromPrice" min="0" type="number">
            <label for="to-price" >To Price : </label>
            <input id="to-price" @input="filter" v-model.number="filterBy.toPrice" min="0" type="number">
</div>  
            </form>
        </div>
    `,
  data() {
    return {
      filterBy: {
        byName: "",
        fromPrice: 0,
        toPrice: Infinity,
      },
    };
  },
  methods: {
    filter() {
      if (!this.filterBy) return;
      this.$emit("filtered", { ...this.filterBy });
    },
  },
};
