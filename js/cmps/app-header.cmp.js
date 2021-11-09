import { router } from "../routes.js";

export default {
  template: `
    <header>
      <!-- logo -->
  
      <nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/books">Books</router-link> |
                <router-link to="/about">About</router-link>
            </nav>
    <h2>The Book Shop</h2>
    </header>
    `,
  created() {
  },
};
