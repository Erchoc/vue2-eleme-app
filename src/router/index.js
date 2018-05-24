import Vue from 'vue';
import Router from 'vue-router';
import Axios from 'axios';

import Goods from '@/components/goods/Goods';
import Ratings from '@/components/ratings/Ratings';
import Seller from '@/components/seller/Seller';

Vue.use(Router);
Vue.prototype.$ajax = Axios; // 通过原型链的方式使用

const routes = [
  {
    path: '/',
    component: Goods
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  }];

const router = new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'active'
});

export default router;
