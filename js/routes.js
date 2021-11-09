import bookApp from './pages/book-app.js';
import homePage from './pages/homePage.js';
import about from './pages/about.js';
import bookDetials from './pages/book-details.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: about
    },
    {
        path: '/books',
        component: bookApp
    },
    {
        path: '/books/:bookId?',
        component: bookDetials
    },
 
];

export const router = new VueRouter({ routes });
