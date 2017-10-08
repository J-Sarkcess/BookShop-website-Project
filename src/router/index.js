import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage/HomePage'
import BookListPage from '@/components/BookListPage/BookListPage'
import PersonalCenter from '@/components/PersonalCenter/PersonalCenter'
import BookDetails from '@/components/BookDetails/BookDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/books',
      name: 'books',
      component: BookListPage
    },
    {
      path: '/myCenter',
      name: 'myCenter',
      component: PersonalCenter
    },
    {
      path: '/details',
      name: 'details',
      component: BookDetails
    }
  ]
})
