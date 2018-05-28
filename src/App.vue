<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/goods">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由出口:路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/Header';

const ERR_OK = 0;

export default {
  data () {
    return {
      seller: {}
    };
  },
  created () {
    this.$ajax.get('/api/seller').then(res => {
      if (res.data.errno === ERR_OK) {
        this.seller = res.data.data;
      }
    });
  },
  components: {
    'v-header': Header
  }
};
</script>

<style lang="stylus">
@import "./common/stylus/minin.styl";

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      // border-buttom: 1px solid rgba(7, 17, 27, 0.1)
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
