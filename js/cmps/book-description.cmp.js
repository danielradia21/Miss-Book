export default  {
  props: ["desc"],
  template: `
        <div>
          <button v-if="isLongText" @click="openText">{{btnName}}</button>
          <p>{{checkTextLength}}</p>
        </div>
      `,
  data() {
    return {
      isLongText: false,
      text: null,
      isBtnOpen: false,
      btnName: "Show More",
    };
  },
  methods: {
    toggleButton() {
      this.isLongText = !this.isLongText;
    },
    openText() {
      this.text = this.desc;
      this.isBtnOpen = !this.isBtnOpen;
      this.btnName = "Show More";
    },
  },

  computed: {
    checkTextLength() {
      if (this.isBtnOpen) {
        this.btnName = "Show Less";
        return this.text;
      }
      if (this.desc.length > 100) {
        this.isLongText = true;
      }
      return this.desc.slice(0, 100);
    },
  },
};
