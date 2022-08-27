<template>
<div class="rewardSpace">
<!--  <div class="imgSpace"></div>-->
  <img src="../../images/reward-space-mockup-r.png" alt="Rewards space mockup image.">
  <Button text="Go to Reward Space" color="grey"/>
</div>
</template>

<script>
import Button from './Button'

export default {
  name: "RewardSpace",
  components: {
    Button
  }
}
</script>

<style scoped>
img {
  max-width: 550px;
  /*max-width:100%;*/
}
div.rewardSpace {
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  align-items: center;
}
/*div.imgSpace {*/
/*  min-width: 600px;*/
/*  min-height: 400px;*/
/*  width:100%;*/
/*  background-image: url('../../images/reward-space-mockup-r.png');*/
/*  background-repeat: no-repeat;*/
/*  background-size: contain;*/
/*}*/
</style>