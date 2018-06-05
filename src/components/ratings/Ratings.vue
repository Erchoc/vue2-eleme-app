<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title"> 综合评分 </div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title"> 服务态度 </span>
            <v-star :size="36" :score="seller.serviceScore"></v-star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title"> 商品评分 </span>
            <v-star :size="36" :score="seller.serviceScore"></v-star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title"> 送达时间 </span>
            <span class="delivery">{{ seller.deliveryTime }} 分钟</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="evaluation"></div>
    </div>
  </div>
</template>

<script>
import Star from '@/components/star/Star';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    'v-star': Star
  }
};
</script>

<style lang="stylus">

  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        padding: 6px 0
        flex: 0 0 137px
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 100px
          width: 100px
        .score
          line-height: 28px
          font-size: 24px
          margin-bottom: 6px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          font-weight: 400
          color: rgb(7, 17, 27)
        .rank
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding-left: 24px
        @media only screen and (max-width: 320px)
          padding-left: 12px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            margin-right: 8px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            vertical-align: top
            margin-right: 8px
            .star-item
              margin-right: 8px
              @media only screen and (max-width: 320px)
                margin-right: 4px
          .score
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            margin-right: 8px
            color: rgb(7, 17, 27)
          .delivery
            font-size: 12px
            color: rgb(147, 153, 159)
</style>
