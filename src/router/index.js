import Vue from 'vue';
import Router from 'vue-router';

import Goods from '@/components/goods/Goods';
import Ratings from '@/components/ratings/Ratings';
import Seller from '@/components/seller/Seller';

Vue.use(Router);

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
