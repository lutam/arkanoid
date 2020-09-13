<template>
  <div
    @click="$store.dispatch('game/togglePause')"
    class="overlay"
  >
    <div
      id="pause"
    >
      <div />
      <div />
    </div>
  </div>
</template>

<style lang="scss" scoped>

 #pause {
    width: 4.2rem;
    display: flex;
    justify-content: space-between;
    opacity: 0.7;
    &:hover{
      opacity: 0.8;
    }
    > div {
      width: 1.6rem;
      height: 5rem;
      background: white;
    }
  }
</style>

<script type="text/javascript">

export default {
  name: 'PauseLayer',
};
</script>
