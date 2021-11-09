import bookApp from "../js/pages/book-app.js";
import appHeader from "../js/cmps/app-header.cmp.js";
import appFooter from "./cmps/app-footer.cmp.js";
import {router} from "./routes.js";

const options = {
  el: "#app",
  router,
  template: `
  <section class="main">
    <!-- <user-msg/> -->
    <app-header/>
    <router-view class="content-main" />
    <app-footer></app-footer>
  </section>
  `,
  components: {
    bookApp,
    appHeader,
    appFooter,
  },
};

new Vue(options);
